import { useEffect, useState } from "react";
import imgStyle from "./imgList.module.css"
import { getFirestore, collection, doc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "../../firebaseinit";

export default function ImgList({ activeAlbumItem }) {
    // console.log("Inside image", activeAlbumItem);
    const [allReceivedImg, setReceivedImg] = useState();


    useEffect(() => {
        const docRef = doc(db, "albums", activeAlbumItem.id);
        const imagesRef = collection(docRef, "images");
        onSnapshot(imagesRef, (snapshot) => {
            const images = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setReceivedImg(images)
        })

    }, [])
    return (
        <div className={imgStyle.mainDiv}>
            {allReceivedImg && allReceivedImg.map((image) => (
                <section key={image.id} className={imgStyle.imgCard}>
                    <img src={image.url} alt={image.title} className={imgStyle.img} />
                    <p className={imgStyle.title}>{image.title}</p>
                </section>
            ))}
        </div>

    )
}