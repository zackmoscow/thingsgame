export function setGameInfo(gameInfo) {
  return { type: 'SET_GAME_INFO', payload: gameInfo }
}

export function setPlayerInfo(playerInfo) {
  return { type: 'SET_PLAYER_INFO', payload: playerInfo }
}

export function setError(error) {
  return { type: 'SET_ERROR', payload: error} 
}

export function newGame(userName) {

}

export function joinGame(userName, gameID) {

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
    socket.emit('matched', gameID, userName, match)
  }
}

export function returnToLobby(gameID) {
  return (dispatch) => {
    socket.emit()
  }
}