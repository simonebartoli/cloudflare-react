import React from "react";
import "./Header.css"

import Button from "./Button";

function Header({username, modal}) {
    return (
        <header>
            <h1>Welcome {username}</h1>
            <Button text={"Post"} className={"post-button"} onclick={modal} icon={"post"}/>
        </header>
    );
}

export default Header;