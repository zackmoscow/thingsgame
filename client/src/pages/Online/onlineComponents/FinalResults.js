import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from "react-router-dom";
import { getUsers } from './helperFunctions';
import { returnToTitle } from '../../../actions/actions';
import '../style.css';

export default function RoundResults() {
    const gameInfo = useSelector(state => state.gameInfo);
    const dispatch = useDispatch();
    const [redirect, setRedirect] = useState(false);

    function handleReturnToTitleSubmit(e) {
        e.preventDefault();
        dispatch(returnToTitle(gameInfo.gameID));
        setRedirect(true);
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
            <p>Congratulations to our winner, {gameInfo.gameWinner}!</p>
        </div>
        <div className='playerArea'>
            {getUsers()}
        </div>
        <div className='actions'>
            <button onClick={(e) => handleReturnToTitleSubmit(e)}>Return To Home Page!</button>
        </div>  
        {redirect && <Redirect to="/" />} 
      </div>
    );
}