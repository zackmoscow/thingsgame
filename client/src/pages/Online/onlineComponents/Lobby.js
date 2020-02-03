import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startRound } from '../../../actions/actions';
import { UserContext } from '../../../utils/UserContext';
import { getUsers, turnUserInfoIntoArray } from './helperFunctions';
import '../style.css';

export default function Lobby() {
  const gameInfo = useSelector(state => state.gameInfo);
  const userInfo = useSelector(state => state.userInfo);
  const dispatch = useDispatch();
  const { userName } = useContext(UserContext);

  function handleStartRound(e) {
      e.preventDefault();
      console.log(gameInfo);
      dispatch(startRound(gameInfo.gameID));
  }
  
  // function view() {
  //   console.log(userInfo[userName]);
  //   switch (userInfo[userName].state) {
  //     case 'lobbyPrompt':
  //         return (
  //           <div>
  //             <p>You are the first PromptMaster!</p>
  //             <p>You may start the game when there are at least 4 players...</p>
  //             <button onClick={(e) => handleStartRound(e)}>Start Game!</button>
  //           </div>  
  //         )
  //     case 'lobby':
  //         return (
  //           <p>Waiting for the game creator to start the game!</p>
  //         )
  //     default:
  //         return ((<p>Something bad happened with userInfo.state</p>))
  //   }
  // }

  return (
    <div className='gameBoard'>
      <div className='headerArea'>
          <h1>Game Code: {gameInfo.gameID}</h1>
          <h2>Number of Players: {gameInfo.users}</h2>
      </div>
      <div className='responseArea'>
        <p>You may start the game when there are at least 4 players...</p>
        <button onClick={(e) => handleStartRound(e)}>Start Game!</button>
      </div>
      <div className='playerArea'>
        {getUsers()}
      </div>
      <div className='actions'>
      </div>   
    </div>
  );
}

