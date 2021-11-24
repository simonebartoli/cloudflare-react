import React, {useState} from "react";
import "./Header.css"

import Button from "./Button";

function Header({username, modal, filterSelect}) {
    const [selected, setSelected] = useState([true, false, false])
    const [dateSelected, setDateSelected] = useState("date-desc")

    const filterHandler = (e) => {
        filterSelect(e, setSelected, setDateSelected)
    }

    return (
        <header>
            <h1>Welcome {username}</h1>
            <div className={"filter"}>
                <span style={{color: "white"}}>Ordered By: </span>
                <Button text={"Date"} className={`filter-option ${dateSelected} ${selected[0] === true ? 'selected' : ''}`}
                        icon={dateSelected === 'date-asc' ? 'arrow-up' : 'arrow-down'}
                        type={"button"} onclick={filterHandler}/>

                <Button text={"Upvote"} className={`filter-option upvote ${selected[1] === true ? 'selected' : ''}`}
                        type={"button"} onclick={filterHandler}/>

                <Button text={"Downvote"} className={`filter-option downvote ${selected[2] === true ? 'selected' : ''}`}
                        type={"button"} onclick={filterHandler}/>
            </div>
            <Button text={"Post"} className={"post-button"} onclick={modal} icon={"post"}/>
        </header>
    );
}

export default Header;