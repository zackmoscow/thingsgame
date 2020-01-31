import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from './helperFunctions';
import { returnToLobby } from '../../../actions/actions';
import '../style.css';

export default function RoundResults() {
    const gameInfo = useSelector(state => state.gameInfo);
    // const userInfo = useSelector(state => state.userInfo);
    const dispatch = useDispatch();

    function handleReturnToLobbySubmit(e) {
        e.preventDefault();
        dispatch(returnToLobby(gameInfo.gameID));
    }

    return (
        <div className='gameBoard'>
        <div className='headerArea'>
            <h1>Round: {gameInfo.round}</h1>
            <h2>PromptMaster: {gameInfo.promptMaster}</h2>
            <h2>Prompt: {gameInfo.prompt}</h2>
        </div>
        <div className='responseArea'>
            <p>Game over!</p>
            <p>Congratulations to the user who won!</p>
        </div>
        <div className='playerArea'>
            {getUsers()}
        </div>
        <div className='actions'>
            <button onClick={(e) => handleReturnToLobbySubmit(e)}>Return To Lobby!</button>
        </div>   
      </div>
    );
}