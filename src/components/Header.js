import React, {useState} from "react";
import "./Header.css"

import Button from "./Button";

function Header({username, modal, filterSelect}) {
    const [iconDate, setIconDate] = useState("arrow-down")

    const filterHandler = (e) => {
        if(e.target.className.includes("date-desc")){
            setIconDate("arrow-up")
        }else if(e.target.className.includes("date-asc")){
            setIconDate("arrow-down")
        }
        console.log(iconDate)
        filterSelect(e)
    }

    return (
        <header>
            <h1>Welcome {username}</h1>
            <div className={"filter"}>
                <span style={{color: "white"}}>Ordered By: </span>
                <Button text={"Date"} className={"filter-option selected date-desc"} icon={iconDate}
                        type={"button"} onclick={filterHandler}/>

                <Button text={"Upvote"} className={"filter-option upvote"}
                        type={"button"} onclick={filterHandler}/>

                <Button text={"Downvote"} className={"filter-option downvote"}
                        type={"button"} onclick={filterHandler}/>
            </div>
            <Button text={"Post"} className={"post-button"} onclick={modal} icon={"post"}/>
        </header>
    );
}

export default Header;