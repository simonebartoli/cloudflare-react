import "./App.css";
import "./components/Modal.css"

import Header from "./components/Header";
import ListPosts from "./components/ListPosts";
import PostForm from "./components/PostForm";
import Data from "./data";

import Modal from "react-modal";
import moment from "moment";

import {useEffect, useLayoutEffect, useState} from "react";


function App() {
    const [username, setUserName] = useState(`random-user-${Math.floor(Math.random() * 100000) + 100000}`)
    const [posts, setPosts] = useState([])
    const [isOpen, setIsOpen] = useState(false)

   useLayoutEffect(() => {
        getData().then((data) => {setPosts(data.body)})
    }, [])

    const getData = async () => {
        return await Data.getPosts()
    }

    const addPost = async (newPost) => {
        const completePost = {
            ...newPost,
            id: Math.max.apply(posts.map(post => post.id)) + 1,
            datetime: moment().valueOf(),
            username: username
        }
        const response = await Data.sendPost(completePost)
        console.log(response)
        setPosts([...posts, completePost])
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

    return (
        <div className="App" style={{filter: isOpen && "blur(3px)"}}>
            <Header username={username} modal={toggleModal}/>
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
            <ListPosts posts={posts}/>
        </div>
    );
}

export default App;
