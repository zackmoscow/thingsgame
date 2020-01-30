import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startRound } from '../../../actions/actions';
import { turnUserInfoIntoArray } from './helperFunctions';
import '../style.css';

export default function Lobby() {
    const gameInfo = useSelector(state => state.gameInfo);
    const userInfo = useSelector(state => state.userInfo);
    const dispatch = useDispatch();

    function handleStartRound(e) {
        e.preventDefault();
        dispatch(startRound(gameInfo.gameID));
    }

    return (
      <div className="gameBoard">
        <div className="headerArea">
            <h1>Game Code: {gameInfo.gameID}</h1>
            <h2>Number of Players: {gameInfo.users}</h2>
        </div>
        <div className="responseArea">
        </div>
        <div className="playerArea">
          <ul>
            {turnUserInfoIntoArray.map(user =>
              <li key={user.userName}>{user.userName}</li>
            )}
          </ul>
        </div>
        <div className="actions">
          <button onClick={(e) => handleStartRound(e)}>Start Game!</button>
        </div>   
      </div>
    );
}

