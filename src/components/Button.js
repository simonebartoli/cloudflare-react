import React from "react";
import PropTypes from 'prop-types';
import { FiSend } from "react-icons/fi"
import {ImCross} from "react-icons/im"
import "./Button.css"


Button.propTypes = {
    text: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired
};

function Button({text, className, icon, onclick, type}) {
    return (
        <button className={className} onClick={onclick} type={type}>
            {icon === "post" ? <FiSend/> : <ImCross/>}
            {text}
        </button>
    );
}

export default Button;