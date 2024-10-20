import './index';
import Header from './components/header/header';
import Title from './components/title/title';
import FolderList from './components/folder-list/folder-list';
import { useEffect, useState } from 'react';
import { db } from './firebaseinit';
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";


function App() {
  const [albumList, setAlbumList] = useState("");
  const [ActiveImgPage, setActiveImgPage] = useState();
  const [goToHomebtn, setGoToHomebtn] = useState();

  function handleActiveImgPage(value) {
    setActiveImgPage(value);
  }

  useEffect(() => {
    onSnapshot(collection(db, "albums"), (snapshot) => {
      const allExpenses = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAlbumList(allExpenses)
    })
  }, [])

  function handleGoToHome(value){
    console.log("go home",value)
    setGoToHomebtn(value);
    //setActiveImgPage([]);
  }
  async function AlbumName(name) {
    const alovelaceDocumentRef = doc(db, "albums", "photos");

    const docRef = await addDoc(collection(db, "albums"), {
      folder: name,
    });
    console.log("Document written with ID: ", docRef.id);
  }

  async function addImages(id, values) {
    const docRef = doc(db, "albums", id);
    const imagesRef = collection(docRef, "images");
    addDoc(imagesRef, {
      title: values.title,
      url: values.url,
      createdAt: new Date(),
    })
  }

  return (
    <div className="App">
      <Header handleGoToHome={handleGoToHome}/>
      <div className='main-page'>
        <Title AlbumName={AlbumName} ActiveImgPage={ActiveImgPage} addImages={addImages} handleGoToHome={handleGoToHome} goToHomebtn={goToHomebtn}/>
        <FolderList albumList={albumList} handleActiveImgPage={handleActiveImgPage} goToHomebtn={goToHomebtn}/>
      </div>
    </div>
  );
}

export default App;
