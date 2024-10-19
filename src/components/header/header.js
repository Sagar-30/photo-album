import headerStyle from "./header.module.css"

export default function Header(){
    return(
        <div className={headerStyle.mainHeader}>
            <img src="https://mellow-seahorse-fc9268.netlify.app/assets/logo.png" alt="header"></img>
            <h2>PhotoFolio</h2>
        </div>
    )
}