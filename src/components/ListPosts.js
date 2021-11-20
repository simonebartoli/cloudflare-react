import React from "react";
import Post from "./Post";
import "./ListPosts.css"

function ListPosts({posts, editPostScore, user, setUser}) {
    return (
        <div className={"list-posts"}>
            {posts.length > 0 && <div className={"vertical-line"}/>}
            {posts.length > 0 ?
                posts.map(post => (
                    <Post key={post.id} post={post} editPostScore={editPostScore} user={user} setUser={setUser}/>
                )) :
                <div className={"no-post"}>
                    <p>
                        Still no Post... I feel alone. <br/>
                        Please feel free to add something
                    </p>
                </div>
            }
        </div>
    );
}

export default ListPosts;