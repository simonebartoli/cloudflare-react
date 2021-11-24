import React, {useEffect, useState} from "react";
import "./Login.css"
import {useNavigate} from "react-router-dom";

function Login({logged, setLogged, setUserAfterVerify, loginFormSubmit, errorMessage}) {
    const [userCounter, setUserCounter] = useState(0)
    const [userName, setUsername] = useState("")
    const maxUserCounter = 15
    const minUserCounter = 5
    const navigate = useNavigate()

    useEffect(() => {
        verifySession().then(async (response) => {
            const data = await response.json()
            console.log(data)
            if(!data.body.error){
                setLogged(true)
                const userObj = data.body.data
                setUserAfterVerify(userObj)
            }
        })

    }, [])

    useEffect(() => {
        if(logged){
            navigate("/")
        }
    }, [logged])

    useEffect(() => {
        setUserCounter(userName.length)
    }, [userName])

    const keyDown = (e) => {
        const notAllowedKeys = /[!@#$%^&*()+=[\]{};':"\\|,.<>/?]+/
        if(notAllowedKeys.test(e.key) || e.key === " "){
            e.preventDefault()
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        loginFormSubmit(userName)
    }

    const verifySession = async () => {
        return await fetch("https://cloudflare-backend.bartolisimone.workers.dev/verify",{
            method: 'GET',
            credentials: 'include'
        })
    }


    return (
        <form id={"login"} onSubmit={onSubmit}>
            <h1>Welcome User</h1>
            <p>Please Insert Your UNIQUE Username</p>
            <div className={"username-box"}>
                <input type="text" placeholder={"Insert Here Your Username"}
                       value={userName} onChange={(e) => setUsername(e.target.value)}
                       maxLength={maxUserCounter} minLength={minUserCounter}
                       onKeyDown={keyDown}
                       style={{borderColor: userName.length>=minUserCounter ? "green" : "orangered"}}
                />
                <span className={"user-counter"}>{userCounter}/{maxUserCounter}</span>
            </div>
            <p className={"error"}>{errorMessage}</p>
        </form>
    );
}

export default Login;