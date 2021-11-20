import React from "react";
import PropTypes from 'prop-types';
import { FiSend } from "react-icons/fi"
import {ImCross} from "react-icons/im"
import {AiOutlineArrowUp, AiOutlineArrowDown} from "react-icons/ai"

import "./Button.css"


Button.propTypes = {
    text: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
};
Button.defaultProps = {
    type: "button",
    id: ""
}


function Button({text, className, idName, icon, onclick, type}) {
    return (
        <button className={className} onClick={onclick} type={type}>
            {icon === "post" ? <FiSend/> : icon=== "delete" ? <ImCross/> :
            icon === "arrow-up" ? <AiOutlineArrowUp/> :
            icon === "arrow-down" && <AiOutlineArrowDown/>}
            {text}
        </button>
    );
}

export default Button;