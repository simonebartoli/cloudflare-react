import React from "react";
import "./NotFound.css"

import {Link} from "react-router-dom"

function NotFound() {
    return (
        <div className={"not-found"}>
            <h1>THIS PAGE DOES NOT EXIST</h1>
            <Link to="/" className={"go-back"}>Go Back</Link>
        </div>
    );
}

export default NotFound;