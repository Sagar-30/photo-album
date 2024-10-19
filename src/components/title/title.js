import React,{ useRef, useState } from "react";
import titleStyle from "./title.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Title({AlbumName}) {
    const [addAlbumPopup, setAddAlbumPopup] = useState(false);
    const [albumName, setAlbumName] = useState("")
    const inputRef = useRef(null);
    const AddNotification = () => toast("Album Added !");

    function handleAdd() {
        setAddAlbumPopup(!addAlbumPopup);
    };
    function handleSubmitAlbum(e) {
        if(inputRef.current.value){
            e.preventDefault();
            setAlbumName(inputRef.current.value);
            AlbumName(inputRef.current.value);
            AddNotification();
            inputRef.current.value = "";
        }
    }
    return (
        <>
        <ToastContainer />
            {addAlbumPopup ?
                <div className={titleStyle.albumForm}>
                    <h3>Create an album</h3>
                    <form>
                        <input type="text" ref={inputRef} placeholder="Album Name" required></input>
                        <button onClick={() => inputRef.current.value = ""}>Clear</button>
                        <button onClick={(e)=>handleSubmitAlbum(e)}>Create</button>
                    </form>
                </div>
                : ""}
            <div className={titleStyle.maintitle}>
                <h2>Your albums</h2>
                <button className={addAlbumPopup?titleStyle.cancel:titleStyle.add} onClick={handleAdd}>{addAlbumPopup?"Cancel":"Add Album"}</button>
            </div>
        </>
    )
}