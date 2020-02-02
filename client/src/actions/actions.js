import { socket, connectToServer } from '../socket/Socket';

export function setGameInfo(gameInfo) {
  return { type: 'gameInfo', payload: gameInfo }
}

export function setUserInfo(userInfo) {
  return { type: 'userInfo', payload: userInfo }
}

export function setError(error) {
  return { type: 'error', payload: error }
}

export function newGame(userName, userAvatar) {
  return (dispatch) => {
     
    connectToServer(dispatch);
    
      socket.emit('newGame', userName, userAvatar);

      socket.on('addedToGame', (gameInfo, userInfo) => {
        console.log(gameInfo);
        dispatch(setGameInfo(gameInfo));
        dispatch(setUserInfo(userInfo));
        dispatch(setError(''));
        console.log("creating game");
      });

      socket.on('backendError', data => {
        dispatch(setError('Error with gameID'));
      });
    
  }
}

export function joinGame(gameID, userName, userAvatar) {
  return (dispatch) => {

    connectToServer(dispatch);
    
      socket.emit('joinGame', gameID, userName, userAvatar);

      socket.on('addedToGame', (gameInfo, userInfo) => {
        dispatch(setGameInfo(gameInfo));
        dispatch(setUserInfo(userInfo));
        dispatch(setError(''));
        console.log('added to game');
        console.log(gameInfo, userInfo);
      });

      socket.on('noGameFound', data => {
        dispatch(setError('Could not find the game'));
      });

      socket.on('gameInProgress', data => {
        dispatch(setError('Game is already in progress'));
      });
    
  }
}

export function startRound(gameID) {
  return (dispatch) => {
    socket.emit('startRound', gameID);

    socket.on('notEnoughUsers', data => {
      dispatch(setError('Insufficient Players'));
    })
  }
}

export function submitPrompt(gameID, prompt) {
  return (dispatch) => {
    console.log('front end submit prompt', gameID, prompt);
    socket.emit('submittedPrompt', gameID, prompt);
  }
}

export function submitResponse(gameID, userName, response) {
  return (dispatch) => {
    socket.emit('submittedResponse', gameID, userName, response);
  }
}

export function submitMatch(gameID, userName, match) {
  return (dispatch) => {
    socket.emit('matched', gameID, userName, match);
  }
}

export function nextRound (gameID) {
  return (dispatch) => {
    socket.emit('nextRound', gameID);
  }
}

export function gameEnd(gameID) {
  return (dispatch) => {
    socket.emit('gameEnd', gameID);
  }
}

export function returnToTitle(gameID) {
  return (dispatch) => {
    socket.emit('returnToTitle', gameID)
  }
}