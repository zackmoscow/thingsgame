import React, { useState, useEffect } from "react";
import "./style.css";

export default function Game() {
    const [gameState, setGameState] = useState([]);
    const [roundState, setRoundState] = useState([]);
    useEffect(()=> {
        setGameState({
            "gameId": 5564,
            "participants": [
                // upadate each position after each round - subtract 1 from position - if < 0 then make .length - 1 
                {
                    id: 1,
                    name: "Cathy", 
                    score: 0, 
                    avatar: "images/avatars/woman1.svg",
                    position: 0, 
                    isEliminated: false
                },
                {
                    id: 2,
                    name: "Mark", 
                    score: 0, 
                    avatar: "images/avatars/man1.svg",
                    position: 1, 
                    isEliminated: false
                },
                {
                    id: 3,
                    name: "Karen", 
                    score: 0, 
                    avatar: "images/avatars/woman2.svg",
                    position: 2, 
                    isEliminated: false
                },
                {
                    id: 4,
                    name: "Scottie", 
                    score: 0, 
                    avatar: "images/avatars/man2.svg",
                    position: 3, 
                    isEliminated: false
                },
                {
                    id: 5,
                    name: "Margaret", 
                    score: 0, 
                    avatar: "images/avatars/woman3.svg",
                    position: 4, 
                    isEliminated: false
                },
                {
                    id: 6,
                    name: "Dave", 
                    score: 0, 
                    avatar: "images/avatars/man3.svg",
                    position: 5, 
                    isEliminated: false
                }
            ]
        });
        // functionality to determin how many rounds based on number of people // new game button?
        setRoundState({
            "round": 1,
            //prompt question master for category
            "question": "Terms for testicles",
            //then prompt all users for category
            "responses": [
                {
                    id: 1,
                    response: "hanging brain"
                },
                {
                    id: 2,
                    response: "nads"
                },
                {
                    id: 3,
                    response: "nuts"
                },
                {
                    id: 4,
                    response: "dong pillow"
                },
                {
                    id: 5,
                    response: "thing 1 and thing 2"
                },
                {
                    id: 5,
                    response: "the misters"
                }
            ]
        });
    },[]);
    function onDragOver(ev) {
        ev.preventDefault();
        console.log(ev)
    }
    function getPlayers() {
        if (gameState.participants) {
            const { participants } = gameState;
            return participants.map(o=> (
                <div className="player" onDragOver={e=>this.onDragOver(e)}>
                    <img src={o.avatar} alt={`${o.name}'s Avatar`} className="playerAvatar lvl1"/>
                    <h3 className="playerName">{o.name}</h3>
                    <p className="playerScore lvl2">{o.score}</p>
                </div>
            ));
        }
    }
    function getAnswers(array) {
        if(array){
            let shuffledArray = [...array];
            let len = array.length;
            for(let i = 0; i < len; i += 1) {
                let randomIndex = Math.floor(Math.random() * len);
                [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
            }
            return shuffledArray.map(o=> (
                <p className="response" draggable>{o.response}</p>
            ));
        }
    }
    return (
        <div className="gameBoard">
            <div className="responseArea">
                <h1>Round {roundState.round}</h1>
                <h2>Question: {roundState.question}</h2>
                {getAnswers(roundState.responses)}
            </div>
            <div className="playerArea">
                {getPlayers()}
            </div>
            
        </div>
    )
}