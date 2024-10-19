import './index';
import Header from './components/header/header';
import Title from './components/title/title';
import { useState } from 'react';
import { db } from './firebaseinit';
import { doc } from "firebase/firestore"; 


function App() {
  const [albumName , setAlbumName] = useState("");

  function AlbumName(name){
    setAlbumName(name)
    console.log(name)
    const alovelaceDocumentRef = doc(db, 'albums/photos');
  }
  return (
    <div className="App">
      <Header/>
      <div className='main-page'>
      <Title AlbumName={AlbumName}/>
      </div>
    </div>
  );
}

export default App;
