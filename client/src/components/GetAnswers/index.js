import React from "react";

export default function GetAnswers(props) {
    // function scoreboard() {
    //     console.log('finished');
    //     // return <button onClick={()=>endRound()}>End Round</button>
    // }
    function onDragStart(ev, id) {
        console.log("dragstart: ", id);
        ev.dataTransfer.setData("id", id);
    };
    if (props.participants) {
        const { participants } = { ...props };
        const array = participants;
        const filteredUsers = array.filter(o => !o.isEliminated);
        if(filteredUsers[0]){
            let shuffledArray = [...filteredUsers];
            let len = filteredUsers.length;
            if (len > 2) {
                for(let i = 0; i < len; i += 1) {
                    let randomIndex = Math.floor(Math.random() * len);
                    [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
                }
                return shuffledArray.map(o=> (
                    <p className="response" key={o.id} draggable onDragStart={e=>onDragStart(e, o.name)}>{o.response}</p>
                ));
            } else {
                scoreboard();
            }
        }
    }
}