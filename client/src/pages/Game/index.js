import React, { useState, useEffect } from "react";
import "./style.css";

export default function Game() {
    const [gameState, setGameState] = useState([]);
    const [roundState, setRoundState] = useState([]);
    const [dragState, setDragState] = useState([]);
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
                    id: 6,
                    response: "the misters"
                }
            ]
        });
        setDragState({});
    },[]);
    function onDragOver(ev) {
        ev.preventDefault();
        let el = ev.target.parentNode.children[0];
        el.classList.add('class', 'dragHover');
    };
    function onDragEnter(ev){
        console.log(ev.target.parentNode.children)
        
        // getDocumentById()
    };
    function onDragLeave(ev) {
        let el = ev.target.parentNode.children[0];
        el.classList.remove('class', 'dragHover');
    }
    function onDragStart(ev, id) {
        console.log("dragstart: ", id);
        ev.dataTransfer.setData("id", id);
    };
    function onDrop(ev) {
        let id = ev.dataTransfer.getData("id");
        let pId = ev.target.parentNode.id;
        let el = ev.target.parentNode.children[0];
        el.classList.remove('class', 'dragHover');
        if (id === pId) {
            console.log('match!');
            let matched = gameState.participants.find(o => {
                return parseInt(o.id) === parseInt(pId);
            })
            matched.isEliminated = true;
            //let elminated = matched.map(o => o.isEliminated = true);
            console.log("gs",gameState.participants);
        }else {
            console.log('not a match')
        }
    }
    function getPlayers() {
        if (gameState.participants) {
            const { participants } = gameState;
            return participants.map(o=> (
                <div className="player" key={o.id} id={o.id} onDragOver={e=>onDragOver(e)} onDragEnter={e=>onDragEnter(e)} onDragLeave={e=>onDragLeave(e)} onDrop={ e=> onDrop(e)}>
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
                <p className="response" key={o.id} draggable onDragStart={e=>onDragStart(e, o.id)}>{o.response}</p>
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