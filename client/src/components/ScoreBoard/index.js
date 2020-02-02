import React from "react";

export default function ScoreBoard(props) {
    const updatedGameState = { ...props };
    const roundArray = updatedGameState.participants.sort((a,b) => (a.score > b.score) ? -1 : 1);
    return (
        <div>
            <p>The game is over,</p>
            <h2>and the winner is...</h2>
            <img src={roundArray[0].avatar} alt={`${roundArray[0].name}'s avatar`}/>
            <h1>{roundArray[0].name}</h1>
        </div>
    )
}