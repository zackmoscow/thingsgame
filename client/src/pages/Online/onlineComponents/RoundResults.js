import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from './helperFunctions';
import { nextRound, gameEnd } from '../../../actions/actions';
import '../style.css';

export default function RoundResults() {
    const gameInfo = useSelector(state => state.gameInfo);
    const dispatch = useDispatch();

    function handleNextRoundSubmit(e) {
        e.preventDefault();
        dispatch(nextRound(gameInfo.gameID));
    }

    function handleGameEndSubmit(e) {
        e.preventDefault();
        dispatch(gameEnd(gameInfo.gameID));
    }

    return (
        <div className='gameBoard'>
        <div className='headerArea'>
            <h1>Round: {gameInfo.round}</h1>
            <h2>PromptMaster: {gameInfo.promptMaster}</h2>
            <h2>Prompt: {gameInfo.prompt}</h2>
        </div>
        <div className='responseArea'>
            <h2>Round has ended!</h2>
        </div>
        <div className='playerArea'>
            {getUsers()}
        </div>
        <div className='actions'>
            <button onClick={(e) => handleNextRoundSubmit(e)}>Next Round!</button>
            <button onClick={(e) => handleGameEndSubmit(e)}>End Game!</button>
        </div>   
      </div>
    );
}