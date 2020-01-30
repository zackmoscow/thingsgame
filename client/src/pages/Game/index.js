import React, { useState, useEffect } from "react";
import "./style.css";
//import OpenSocket from "socket.io-client";

export default function Game() {
    const [gameState, setGameState] = useState({});
    const [roundState, setRoundState] = useState({
        round: 0,
        promptmaster: {},
        players: [],
        roundQuestion: "",
        responses: [
        ]
    });
    useEffect(()=> {
        setGameState({
            "gameId": 5564,
            "participants": [
                {
                    id: 1,
                    name: "Cathy", 
                    score: 0, 
                    avatar: "images/avatars/woman1.svg",
                    position: 0,
                    response:"",
                    isEliminated: false,
                },
                {
                    id: 2,
                    name: "Mark", 
                    score: 0, 
                    avatar: "images/avatars/man1.svg",
                    position: 1,
                    response:"",
                    isEliminated: false
                },
                {
                    id: 3,
                    name: "Karen", 
                    score: 0, 
                    avatar: "images/avatars/woman2.svg",
                    position: 2,
                    response:"",
                    isEliminated: false
                },
                {
                    id: 4,
                    name: "Scottie", 
                    score: 0,
                    avatar: "images/avatars/man2.svg",
                    position: 3, 
                    response:"",
                    isEliminated: false
                },
                {
                    id: 5,
                    name: "Margaret", 
                    score: 0, 
                    avatar: "images/avatars/woman3.svg",
                    position: 4, 
                    response:"",
                    isEliminated: false
                },
                {
                    id: 6,
                    name: "Dave", 
                    score: 0, 
                    avatar: "images/avatars/man3.svg",
                    position: 5, 
                    response:"",
                    isEliminated: false
                }
            ]
        });
    },[]);
    function startRound() {
        if(gameState.participants) {
            const updatedGameState = { ...gameState };
            const roundArray = updatedGameState.participants.sort((a,b) => (a.position > b.position) ? 1 : -1);
            // const roundArrayResponses = roundArray.map(r => r.response);
            const roundQuestion = prompt(`${JSON.stringify(roundArray[0].name)}, what is the category`);
            const copiedArray = [];

            for(let i=0; i< updatedGameState.participants.length; i++ ) {
                let playerResponse = prompt(`${JSON.stringify(roundArray[i].name)}, the category is ${(roundQuestion) ? roundQuestion.toUpperCase() : null }. Please enter your response`);
                copiedArray.push({ "id": roundArray[i].name,"response": playerResponse });
            }

            setRoundState({
                ...roundState,
                round: (roundState.round + 1),
                promptmaster: roundArray[0],
                players: roundArray,
                roundQuestion: roundQuestion,
                responses: copiedArray
            });
        }
        else { console.log('start failed')}
    };

    function onDragOver(ev) {
        ev.preventDefault();
        let el = ev.target.parentNode.children[0];
        el.classList.add('dragHover');
    };
    function onDragEnter(ev){
        console.log(ev.target.parentNode.children)
        
        // getDocumentById()
    };
    function onDragLeave(ev) {
        let el = ev.target.parentNode.children[0];
        el.classList.remove('dragHover');
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
            const { participants } = { ...gameState };
            const matchedParticpant = participants.indexOf(participants.find(o => o.name === pId));
            console.log(matchedParticpant);
            // const index = gameState.participants.indexOf(matched);
            const updatedParticipants = [... participants];
            updatedParticipants[matchedParticpant].isEliminated = true;
            setGameState({
                ...gameState,
                participants: updatedParticipants,
            })
            //let elminated = matched.map(o => o.isEliminated = true);
            console.log("gs",gameState.participants);
        }else {
            console.log('not a match')
        }
    }

    function player(o) {
        let playerClass = "player";
        let dragEvents = {
            onDragOver:  e => onDragOver(e),
            onDragEnter: e => onDragEnter(e),
            onDragLeave: e => onDragLeave(e),
            onDrop: e=> onDrop(e)
        }
        
        if (o.isEliminated) {
            playerClass = "player eliminated";
            dragEvents = {};
        }

        return(
            <div className={playerClass} key={o.id} id={o.name} {...dragEvents}>
                <img src={o.avatar} alt={`${o.name}'s Avatar`} className="playerAvatar lvl1"/>
                <h3 className="playerName">{o.name}</h3>
                <p className="playerScore lvl2">{o.score}</p>
            </div>
        )
    }

    function getPlayers() {
        if (gameState.participants) {
            return gameState.participants.map(player);
        }
    }

    function getAnswers() {
        if (roundState && roundState.responses) {
            const array = roundState.responses;
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
    }
        return (
            <div className="gameBoard">
                <div className="headerArea">
                    <h1>Round {roundState.round}</h1>
                    <h2>promptmaster {(roundState.promptmaster) ? roundState.promptmaster.name : null}</h2>
                    <h2>Question: {(roundState.roundQuestion) ? roundState.roundQuestion : null}</h2>
                </div>
                <div className="responseArea">
                    {getAnswers()}
                </div>
                <div className="playerArea">
                    {getPlayers()}
                </div>
                <div className="actions">
                    <button onClick={()=>startRound()}>Start Round</button>
                </div>
                
            </div>
        )
}