import React, {useState} from "react";

import Blog from "./components/Blog";
import Login from "./components/Login";
import NotFound from "./components/NotFound";

import {Routes, Route, Navigate} from "react-router-dom";

function App() {

    const [errorMessage, setErrorMessage] = useState("")
    const [user, setUser] = useState({username: "", upvote: [], downvote: []})
    const [logged, setLogged] = useState(false)

    const loginFormSubmit = (username) => {
        createUserDB(username).then(async (response) => {
            const dataParsed = await response.json()
            if(!dataParsed.body.error){
                setErrorMessage("")
                setUser({username: username, upvote: [], downvote: []})
                setLogged(true)
            }else{
                setErrorMessage(dataParsed.body.message)
            }
            console.log(dataParsed)
        })
    }

    const createUserDB = async (username) => {
        return await fetch(`https://cloudflare-backend.bartolisimone.workers.dev/auth/${username}`,{
            method: 'GET',
            credentials: 'include'
        })
    }

    const setUserAfterVerify = (fetchUser) => {
        setUser(fetchUser)
    }

    return (
        <>
            <Routes>
                <Route path={"/"} element={
                    <ProtectedRoute logged={logged}>
                        <Blog user={user} setUser={setUser}/>
                    </ProtectedRoute>
                }/>
                <Route path={"/login"} element={<Login logged={logged} setLogged={setLogged}
                                                       setUserAfterVerify={setUserAfterVerify}
                                                       loginFormSubmit={loginFormSubmit} errorMessage={errorMessage} />}
                />
                <Route path={"*"} element={<NotFound/>}/>
            </Routes>
        </>
    );
}

function ProtectedRoute({children, logged}) {
    if(logged){
        return children
    }else{
        return <Navigate to="/login" replace/>;
    }
}

export default App;