import React, { useEffect, useRef, useState } from "react";
import titleStyle from "./title.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from "../../firebaseinit";
import { doc, getDoc } from "firebase/firestore";

export default function Title({ AlbumName, ActiveImgPage, addImages, handleGoToHome, goToHomebtn }) {
    // console.log("from title", ActiveImgPage);
    const [addAlbumPopup, setAddAlbumPopup] = useState(false);
    const [folderName, setFolderName] = useState();
    const [albumName, setAlbumName] = useState("");
    const [GoToHomeButton, setGoToHomeButton] = useState(0);
    const inputRef = useRef(null);
    const TitleinputRef = useRef(null);
    const UrlinputRef = useRef(null);
    const AddNotification = () => toast("Album Added !");
    const AddImageNotification = () => toast("Image Added !");
    const [activeImgPageTitle, setActiveImgPageTitle] = useState(false)

    function handleAdd() {
        setAddAlbumPopup(!addAlbumPopup);
    };

    useEffect(() => {
        // console.log("Page", ActiveImgPage)

        async function folderData() {
            if (ActiveImgPage !== undefined) {
                const docRef = doc(db, "albums", ActiveImgPage.id);
                const docSnap = await getDoc(docRef);
                setFolderName(docSnap.data().folder);
            }
        }
        folderData();
        setActiveImgPageTitle(true);
    }, [ActiveImgPage])

    function handleSubmitAlbum(e) {
        if (inputRef.current.value) {
            e.preventDefault();
            setAlbumName(inputRef.current.value);
            AlbumName(inputRef.current.value);
            AddNotification();
            inputRef.current.value = "";
        }
    }

    function handleSubmitImages(e) {
        if (TitleinputRef.current.value) {
            e.preventDefault();
            AddImageNotification();
            const imageFormData = { title: TitleinputRef.current.value, url: UrlinputRef.current.value }
            // console.log(imageFormData);
            addImages(ActiveImgPage.id, imageFormData)
            TitleinputRef.current.value = "";
            UrlinputRef.current.value = "";
        }
    }
    function clearInput() {
        TitleinputRef.current.value = "";
        UrlinputRef.current.value = "";
    }

    function handleGoBack() {
        handleGoToHome(GoToHomeButton);
        setGoToHomeButton(GoToHomeButton + 1);
        setActiveImgPageTitle(false);
        // console.log(GoToHomeButton);
    }
    useEffect(() => {
        setActiveImgPageTitle(false);
    }, [goToHomebtn]);



    return (
        <>
            {ActiveImgPage && activeImgPageTitle ?
                <>
                    <ToastContainer />
                    {addAlbumPopup ?
                        <div className={titleStyle.imageForm}>
                            <h3>Add image to {folderName}</h3>
                            <form>
                                <input type="text" ref={TitleinputRef} placeholder="Title" required></input>
                                <input type="text" ref={UrlinputRef} placeholder="Img URL" required></input>
                                <div className={titleStyle.buttonGroup}>
                                    <button onClick={clearInput}>Clear</button>
                                    <button onClick={(e) => handleSubmitImages(e)}>Create</button>
                                </div>
                            </form>
                        </div>
                        : ""}
                    <div className={titleStyle.maintitle}>
                        <img className={titleStyle.goBackImg} src="https://cdn-icons-png.flaticon.com/128/709/709624.png" alt="go-back" onClick={handleGoBack}></img>
                        <h2>Images in {folderName}</h2>
                        <button className={addAlbumPopup ? titleStyle.cancel : titleStyle.add} onClick={handleAdd}>{addAlbumPopup ? "Cancel" : "Add Image"}</button>
                    </div>
                </>

                :
                <>
                    <ToastContainer />
                    {addAlbumPopup ?
                        <div className={titleStyle.albumForm}>
                            <h3>Create an album</h3>
                            <form>
                                <input type="text" ref={inputRef} placeholder="Album Name" required></input>
                                <button onClick={() => inputRef.current.value = ""}>Clear</button>
                                <button onClick={(e) => handleSubmitAlbum(e)}>Create</button>
                            </form>
                        </div>
                        : ""}
                    <div className={titleStyle.maintitle}>
                        <h2>Your albums</h2>
                        <button className={addAlbumPopup ? titleStyle.cancel : titleStyle.add} onClick={handleAdd}>{addAlbumPopup ? "Cancel" : "Add Album"}</button>
                    </div>
                </>
            }
        </>
    )
}