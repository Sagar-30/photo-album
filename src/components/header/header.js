import { useState } from "react";
import headerStyle from "./header.module.css"

export default function Header({handleGoToHome}){
    const [goToHomebtn, setGoToHomebtn] = useState(false);
    function handleGotoHome(){
        handleGoToHome(goToHomebtn);
        setGoToHomebtn(!goToHomebtn);
    }
    return(
        <div className={headerStyle.mainHeader}>
            <img src="https://mellow-seahorse-fc9268.netlify.app/assets/logo.png" alt="header" onClick={handleGotoHome}></img>
            <h2 onClick={handleGotoHome}>PhotoFolio</h2>
        </div>
    )
}