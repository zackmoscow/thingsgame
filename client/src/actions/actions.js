import { socket, connectToServer } from '../../socket/GameSocket';

export function setGameInfo(gameInfo) {
  return { type: 'gameInfo', payload: gameInfo }
}

export function setUserInfo(userInfo) {
  return { type: 'userInfo', payload: userInfo }
}

export function setError(error) {
  return { type: 'error', payload: error }
}

export function newGame(userName) {
  return (dispatch) => {
    if (socket == null) {
      connectToServer(dispatch);
    }

    if (socket != null) {
      socket.emit('newGame', userName);

      socket.on('addedToGame', (gameInfo, userInfo) => {
        dispatch(setGameInfo(gameInfo));
        dispatch(setUserInfo(userInfo));
        dispatch(setError(''));
      });

      socket.on('backendError', data => {
        dispatch(setError('Error with gameID'));
      });
    }
  }
}

export function joinGame(gameID, userName) {
  return (dispatch) => {
    if (socket == null) {
      connectToServer(dispatch);
    }

    if (socket != null) {
      socket.emit('joinGame', gameID, userName);

      socket.on('addedToGame', (gameInfo, userInfo) => {
        dispatch(setGameInfo(gameInfo));
        dispatch(setUserInfo(userInfo));
        dispatch(setError(''));
      });

      socket.on('noGameFound', data => {
        dispatch(setError('Could not find the game'));
      });

      socket.on('gameInProgress', data => {
        dispatch(setError('Game is already in progress'));
      });
    }
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