import { useEffect, useState } from "react";
import folderDesign from "./folders.module.css";
import ImgList from "../img-list/img-list";

export default function FolderList({ albumList, handleActiveImgPage, goToHomebtn }) {
    const [imgPage, setImgPage] = useState(false)
    const [activeAlbumItem, setActiveAlbumItem] = useState();

    function handleFolderClick(id) {
        const item = { id, status: true };
        // console.log(item);
        setImgPage(true);
        handleActiveImgPage(item);
        setActiveAlbumItem(item);
    }
    useEffect(()=>{
        setImgPage(false);
    },[goToHomebtn])

    return (
        <>
            {imgPage ? <ImgList activeAlbumItem={activeAlbumItem} /> :
                <div className={folderDesign.mainDiv}>

                    {albumList && albumList.map((album) => (
                        <section key={album.id} className={folderDesign.albumSection} onClick={(e) => handleFolderClick(album.id)}>
                            <div className={folderDesign.imgDiv}>
                                <img src="https://mellow-seahorse-fc9268.netlify.app/assets/photos.png" alt="folder" />
                            </div>
                            <div className={folderDesign.textDiv}>
                                <p>{album.folder}</p>
                            </div>
                        </section>
                    ))}

                </div>
            }
        </>

    )
}