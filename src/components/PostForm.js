import React, {useEffect, useState} from "react";
import Button from "./Button";
import "./PostForm.css"

function PostForm({toggleModal, addPost}) {
    const [submitButtonClass, setSubmitButtonClass] = useState("submit-form disabled")

    const minTitleLength = 15
    const minContentLength = 50
    const maxTitleLength = 30
    const maxContentLength = 400

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const [titleCounter, setTitleCounter] = useState(0)
    const [contentCounter, setContentCounter] = useState(0)

    useEffect(() => {
        setTitleCounter(title.trim().length)
        setContentCounter(content.trim().length)
        if(titleCounter >= minTitleLength && contentCounter >= minContentLength){
            setSubmitButtonClass("submit-form")
        }else{
            setSubmitButtonClass("submit-form disabled")
        }
    }, [title, content, titleCounter, contentCounter])

    const onSubmit = (e) => {
        e.preventDefault()
        if(titleCounter>=minTitleLength && contentCounter>=minContentLength){
            const newPost = {
                title: title,
                content: content,
            }
            addPost(newPost)
            toggleModal(true)
        }else{
            alert("Do Not Modify the Code || Respect the length rules")
        }
    }


    return (
        <form action="?" onSubmit={onSubmit}>
            <div className={"form-section"}>
                <label htmlFor={"postForm-title"}>Title</label>
                <div className={"input-container"}>
                    <input type="text"
                           id={"postForm-title"}
                           placeholder={"Insert your Post Title"}
                           value={title}
                           maxLength={maxTitleLength}
                           onChange={(e) => setTitle(e.target.value)}
                    />
                    <p className={"char-counter"} style={{bottom: "50%"}}>
                        <span style={{color: (titleCounter<minTitleLength) ? "red" : "black"}}>{titleCounter}</span>/{maxTitleLength}
                    </p>
                </div>
            </div>
            <div className={"form-section"}>
                <label htmlFor={"postForm-message"}>Message</label>
                <div className={"input-container"}>
                    <textarea id="postForm-message"
                              cols="30" rows="8"
                              placeholder={"Insert your message"}
                              value={content}
                              maxLength={maxContentLength}
                              onChange={(e) => setContent(e.target.value)}
                    />
                    <p className={"char-counter"} style={{bottom: "10%"}}>
                        <span style={{color: (contentCounter<minContentLength) ? "red" : "black"}}>{contentCounter}</span>/{maxContentLength}
                    </p>
                </div>
            </div>
            <div className={"form-action"}>
                <Button text={"Delete Message"} className={"delete-form"} icon={"delete"} onclick={() => toggleModal(false)} type={"button"}/>
                <Button text={"Submit"} className={submitButtonClass}
                        icon={"post"} type={submitButtonClass.includes("disabled") ? "button" : "submit"}/>
            </div>
        </form>
    );
}

export default PostForm;