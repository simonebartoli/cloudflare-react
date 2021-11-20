import React, {useEffect, useRef, useState} from "react";
import "./Score.css"
import {BiDownvote, BiUpvote} from "react-icons/bi";

Score.defaultProps = {
    upvote: 0,
    downvote: 0
}

function Score({id, upvote, downvote, editPostScore, user, setUser}) {
    const notInitialRender = useRef(false)

    const [selectedUp, setSelectedUp] = useState(user.upvote.includes(id))
    const [selectedDown, setSelectedDown] = useState(user.downvote.includes(id))

    const [upCounter, setUpCounter] = useState(upvote)
    const [downCounter, setDownCounter] = useState(downvote)

    useEffect(() => {
        const up_counter = document.getElementById(`score_${id}`).getElementsByClassName("up-counter")[0]
        const down_counter = document.getElementById(`score_${id}`).getElementsByClassName("down-counter")[0]

        if(selectedUp && !selectedDown){
            up_counter.className = "up-counter selected"
            down_counter.className = "down-counter"
        }else if(!selectedUp && selectedDown){
            up_counter.className = "up-counter"
            down_counter.className = "down-counter selected"
        }else{
            up_counter.className = "up-counter"
            down_counter.className = "down-counter"
        }
    }, [selectedUp, selectedDown])


    useEffect(() => {
        if(notInitialRender.current){
            if(selectedUp){
                const index = user.downvote.indexOf(id)
                if (index > -1) { user.downvote.splice(index, 1) }
                setUser({
                    username: user.username,
                    upvote:   [...user.upvote, id],
                    downvote: user.downvote
                })
            }else if(selectedDown){
                const index = user.upvote.indexOf(id)
                if (index > -1) { user.upvote.splice(index, 1) }
                setUser({
                    username: user.username,
                    upvote:   user.upvote,
                    downvote: [...user.downvote, id]
                })
            }else{
                const index = user.downvote.indexOf(id)
                if (index > -1) { user.downvote.splice(index, 1) }

                const index_2 = user.upvote.indexOf(id)
                if (index_2 > -1) { user.upvote.splice(index_2, 1) }

                setUser({
                    username: user.username,
                    upvote:   user.upvote,
                    downvote: user.downvote
                })
            }
            editPostScore(id, upCounter, downCounter)
        }else{
            notInitialRender.current = true
        }
    }, [upCounter, downCounter])

    const onClick = (e) => {
        const selected = e.currentTarget.parentNode.className
        if(selected.includes("up-counter")){
            if(selectedUp){
                setSelectedUp(false)
                setUpCounter(upCounter-1)
            }else{
                if(selectedDown){
                    setSelectedDown(false)
                    setDownCounter(downCounter-1)
                    setSelectedUp(true)
                    setUpCounter(upCounter+1)
                }else{
                    setSelectedUp(true)
                    setUpCounter(upCounter+1)
                }
            }
        }else{
            if(selectedDown){
                setSelectedDown(false)
                setDownCounter(downCounter-1)
            }else{
                if(selectedUp){
                    setSelectedUp(false)
                    setUpCounter(upCounter-1)

                    setSelectedDown(true)
                    setDownCounter(downCounter+1)
                }else{
                    setSelectedDown(true)
                    setDownCounter(downCounter+1)
                }
            }
        }
    }

    return (
        <div className={"score"} id={`score_${id}`}>
            <span className={"up-counter"}>{upCounter}<BiUpvote className={"vote"} onClick={onClick} /></span>
            <span className={"down-counter"}>{downCounter}<BiDownvote className={"vote"} onClick={onClick}/></span>
        </div>
    );
}

export default Score;