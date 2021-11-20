import React from "react";
import "./Post.css"

import Score from "./Score";
import {AiFillCaretLeft} from "react-icons/ai"
import moment from "moment";

const AiFillCaretLeftStyle = {
    fontSize: "2.5em",
    position: "absolute",
    top: "50%",
    left: "25%",
    transform: "translate(-50%, -50%)",
}

function Post({post, editPostScore, user, setUser}) {
    const maxMessageLength = 150;
    const t = new Date(post.datetime)
    const date = moment(t).format("YYYY-MM-D")
    const time = moment(t).format("HH:mm:ss")

    return (
        <article className={"post-container"}>
            <p className={"date"}>{date}<br/><span style={{fontSize: "1.5rem"}}>{time}</span></p>
            <div className={"separator"}/>
            <AiFillCaretLeft style={AiFillCaretLeftStyle}/>
            <section className={"post"}>
                <div className={"title-score"}>
                    <h3 className={"title"}>{post.title}</h3>
                    <Score id={post.id}
                           upvote={post.upvote} downvote={post.downvote}
                           editPostScore={editPostScore}
                           user={user} setUser={setUser}/>
                </div>
                <h4 className={"username"}>{post.username}</h4>
                <p className={"content"}>
                    {post.content.length>maxMessageLength ?
                        post.content.substr(0, maxMessageLength) + "..." :
                        post.content
                    }
                </p>
            </section>
        </article>
    );
}

export default Post;