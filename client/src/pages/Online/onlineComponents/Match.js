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

    function handleMatchSubmit(e, key, response) {
        let match = {
            name: key,
            response: response
        }
        e.preventDefault();
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
    function onDragStart(ev, id) {
        console.log("dragstart: ", id);
        ev.dataTransfer.setData("id", id);
    };

    function onDrop(e, ev) {
        let response = ev.dataTransfer.getData("id");
        let key = ev.target.parentNode.id;
        let el = ev.target.parentNode.children[0];
        el.classList.remove('class', 'dragHover');
        handleMatchSubmit(e, key, response);
    }

    function getUsers() {
        return turnUserInfoIntoArray.map(user)
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
        turnUserInfoIntoArray.map(user => 
            responseList.push(user.response)    
        );
        shuffle(responseList);
        return responseList.map(o=> (
            <p className="response" key={o} draggable onDragStart={e=>onDragStart(e, o)}>{o}</p>
        ));
    }
    

    function view() {
        switch (userInfo[userName].state) {
            case 'matching':
                return (
                    <div className='gameBoard'>
                    <div className='headerArea'>
                        <h1>Round: {gameInfo.round}</h1>
                        <h2>PromptMaster: {gameInfo.promptMaster}</h2>
                        <h2>Prompt: {gameInfo.prompt}</h2>
                    </div>
                    <div className='responseArea'>
                        <p>Your turn to match!</p>
                        {getResponses()}
                    </div>
                    <div className='playerArea'>
                        {getUsers()}
                    </div>
                </div>
                )
            case 'inline':
                return (
                    <div className='gameBoard'>
                        <div className='headerArea'>
                            <h1>Round: {gameInfo.round}</h1>
                            <h2>PromptMaster: {gameInfo.promptMaster}</h2>
                            <h2>Prompt: {gameInfo.prompt}</h2>
                        </div>
                        <div className='responseArea'>
                            <p>Waiting for your turn to match...</p>
                            {getResponses()}
                        </div>
                        <div className='playerArea'>
                            {getUsers()}
                        </div>
                    </div>
                )
                case 'eliminated':
                    return (
                        <div className='gameBoard'>
                            <div className='headerArea'>
                                <h1>Round: {gameInfo.round}</h1>
                                <h2>PromptMaster: {gameInfo.promptMaster}</h2>
                                <h2>Prompt: {gameInfo.prompt}</h2>
                            </div>
                            <div className='responseArea'>
                                <p>Sorry, you have been eliminated.</p>
                            </div>
                            <div className='playerArea'>
                                {getUsers()}
                            </div>
                        </div>
                    )
            default:
                return ((<p>Something bad happened with userInfo.state</p>))
        }
    }

    return (
        <div>
            {view()}
        </div>
    );
}