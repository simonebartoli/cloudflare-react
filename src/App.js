import "./App.css";
import "./components/Modal.css"

import Header from "./components/Header";
import ListPosts from "./components/ListPosts";
import PostForm from "./components/PostForm";
import Data from "./Data";
//import {data, user} from "./devData"; //ONLY FOR FRONT-END PURPOSES

import Modal from "react-modal";
import moment from "moment";

import {useEffect, useRef, useState} from "react";

function App() {
    //`random-user-${Math.floor(Math.random() * 100000) + 100000}`
    const notInitialRender = useRef(false)

    const [user, setUser] = useState({username: "simo2001", upvote: [], downvote: []})
    const [idChanged, setIdChanged] = useState(-1)
    const [posts, setPosts] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        retrieveUser(user).then(response => {setUser(response.body)})
        getData().then((data) => {setPosts((data.body).sort((a, b) => a.datetime<=b.datetime ? 1 : -1))})
    }, [])


    //WHEN POST CHANGES AFTER AN UPVOTE/DOWNVOTE CHANGE SERVER
    useEffect(() => {
        if(notInitialRender.current){
            if(idChanged !== -1){
                const editedPost = posts.filter((post) => post.id === idChanged)
                modifyPost({post: editedPost[0], user: user})
                    .then(message => console.log(message))
                    .catch(err => console.log(err))
                setIdChanged(-1)
            }
        }else{
            notInitialRender.current = true
        }
    }, [posts])



    const getData = async () => {
        return await Data.getPosts()
    }
    const retrieveUser = async (user) => {
        return await Data.setUsername(user, "https://cloudflare-backend.bartolisimone.workers.dev/auth")
    }
    const modifyPost = async (post) => {
        return await Data.modifyPost(post)
    };
    const addPost = async (newPost) => {
        const completePost = {
            ...newPost,
            id: Math.max.apply(posts.map(post => post.id)) + 1,
            datetime: moment().valueOf(),
            username: user.username,
            upvote: 0,
            downvote: 0
        }
        const response = await Data.sendPost(completePost)
        console.log(response)
        setPosts([...posts, completePost])

        //WAIT TIME TO BE SURE THAT KV IS UPDATED
        setTimeout(() => {
            getData().then((data) => {
                console.log(data)
                setPosts(data.body)
            })
        }, 30000)
    }


    const toggleModal = (force) => {
        if(isOpen){
            if(force){
                setIsOpen(!isOpen);
            }else{
                if(window.confirm("Are you sure to delete the post?")){
                    setIsOpen(!isOpen);
                }
            }
        }else{
            setIsOpen(!isOpen);
        }
    };

    const editPostScore = (id, upvote, downvote) => {
        setPosts(
            posts.map((post) => {
                if(post.id === id){
                    setIdChanged(id)
                    post.upvote = upvote
                    post.downvote = downvote
                }
                return post
            })
        )
    }

    const filterSelect = (e) => {
        const className = e.target.className
        const sortedArray = [...posts];

        if(className.includes("date-desc")){
            e.target.className = className.replace("date-desc", "date-asc")
            sortedArray.sort((a,b ) => a.datetime>=b.datetime ? 1 : -1)
        }else if(className.includes("date-asc")){
            e.target.className = className.replace("date-asc", "date-desc")
            sortedArray.sort((a,b ) => a.datetime<=b.datetime ? 1 : -1)
        }else if(className.includes("upvote")){
            sortedArray.sort((a,b ) => a.upvote<=b.upvote ? 1 : -1)
        }else{ //downvote
            sortedArray.sort((a,b ) => a.downvote<=b.downvote ? 1 : -1)
        }

        const prevState = e.target.parentElement.getElementsByClassName("selected");
        for (let item in prevState){
            if(prevState[item].classList !== undefined){
                prevState[item].classList.remove("selected")
            }
        }

        if(!e.target.className.includes("selected")){
            e.target.className = e.target.className + " selected"
        }
        setPosts(sortedArray)

    }


    return (
        <div className="App" style={{filter: isOpen && "blur(3px)"}}>
            <Header username={user.username} modal={toggleModal} filterSelect={filterSelect}/>
            <Modal isOpen={isOpen}
                   onRequestClose={() => toggleModal(false)}
                   contentLabel={"Post Form"}
                   closeTimeoutMS={500}
                   className={"post-modal"}
                   overlayClassName={"post-overlay"}
                   ariaHideApp={false}
            >
                <PostForm toggleModal={toggleModal} addPost={addPost}/>
            </Modal>
            <ListPosts posts={posts} editPostScore={editPostScore} user={user} setUser={setUser}/>
        </div>
    );
}

export default App;
