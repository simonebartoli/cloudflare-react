import React, {useLayoutEffect} from "react";
import Post from "./Post";
import "./ListPosts.css"

function ListPosts({posts}) {
    posts.sort((a, b) => (a.datetime < b.datetime) ? 1 : -1)
    return (
        <div className={"list-posts"}>
            {posts.length > 0 && <div className={"vertical-line"}/>}
            {posts.length > 0 ?
                posts.map(post => (
                    <Post key={post.id} post={post}/>
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