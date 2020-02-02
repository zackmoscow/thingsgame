import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { submitMatch } from '../../../actions/actions';
import { UserContext } from '../../../utils/UserContext';
import { turnUserInfoIntoArray } from './helperFunctions';
import '../style.css';
const shuffle = require('lodash.shuffle');

export default function Match() {
    const gameInfo = useSelector(state => state.gameInfo);
    const userInfo = useSelector(state => state.userInfo);
    const dispatch = useDispatch();
    const { userName } = useContext(UserContext);

    function handleMatchSubmit(key, response) {
        let match = {
            name: key,
            response: response
        }
        dispatch(submitMatch(gameInfo.gameID, userName, match));
    }

    function onDragOver(ev) {
        ev.preventDefault();
        let el = ev.target.parentNode.children[0];
        el.classList.add('dragHover');
    };

    function onDragEnter(ev){
        console.log(ev.target.parentNode.children)
    };
    
    function onDragLeave(ev) {
        let el = ev.target.parentNode.children[0];
        el.classList.remove('dragHover');
    }
    function onDragStart(ev) {
        ev.dataTransfer.setData("id", ev.target.id);
        console.log(ev.target.id);
    };

    function onDrop(ev) {
        ev.preventDefault();
        let response = ev.dataTransfer.getData("id");
        let key = ev.target.parentNode.id;
        let el = ev.target.parentNode.children[0];
        el.classList.remove('class', 'dragHover');
        handleMatchSubmit(key, response);
    }

    function getUsers() {
        return turnUserInfoIntoArray().map(user)
    }
    
    function user(o) {
        let userClass = "player";
        let dragEvents = {
            onDragOver:  e => onDragOver(e),
            onDragEnter: e => onDragEnter(e),
            onDragLeave: e => onDragLeave(e),
            onDrop: e => onDrop(e)
        }
        if (o.state === 'eliminated') {
            userClass = "player eliminated";
            dragEvents = {};
        }
        if (o.state === 'wasPromptmaster') {
            userClass = "player eliminated";
            dragEvents = {};
        }
        return(
            <div className={userClass} key={o.userName} id={o.userName} {...dragEvents}>
                <img src={o.avatar} alt={`${o.userName}'s Avatar`} className="playerAvatar lvl1"/>
                <h3 className="playerName">{o.userName}</h3>
                <p className="playerScore lvl2">{o.currentScore}</p>
            </div>
        )
    }

    function getResponses() {
        let responseList = [];
        turnUserInfoIntoArray().map(user => 
            responseList.push(user.response)    
        );
        shuffle(responseList);
        return responseList.map(response => (
            <p className="response" key={response} id={response} draggable onDragStart={e=>onDragStart(e, response)}>{response}</p>
        ));
    }
    

    function view() {
        switch (userInfo[userName].state) {
            case 'matching':
                return (
                    <p>Your turn to match!</p>   
                )
            case 'inline':
                return (
                    <p>Paused: waiting for your turn to match...</p>
                )
            case 'eliminated':
                return (
                    <p>Sorry, you have been eliminated.</p>
                )
            case 'wasPromptmaster':
                return (
                    <p>You are the PromptMaster and can't match this round.</p>
                )
            default:
                return ((<p>Something bad happened with userInfo.state</p>))
        }
    }

    return (
        <div className='gameBoard'>
            <div className='headerArea'>
                <h1>Round: {gameInfo.round}</h1>
                <h2>PromptMaster: {gameInfo.promptMaster}</h2>
                <h2>Prompt: {gameInfo.prompt}</h2>
            </div>
            <div className='responseArea'>
                {view()}
                {getResponses()}
            </div>
            
            <div className='playerArea'>
                {getUsers()}
            </div>
        </div>
    );
}