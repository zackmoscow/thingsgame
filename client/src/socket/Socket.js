// NOTE: We will need to link setGameInfo and setPlayerInfo "actions"

export let socket = null;

export function connectToServer(dispatch) {
  socket = io('ThisIsWhereOurDeployedURLGoes', { reconnection: false });

  socket.on('connect', () => {
    console.log('Socket connected');
  });

  socket.on('connect_error', () => {
    socket = null;
    console.log('Failed to connect');
  });

  socket.on('update', (gameInfo, playerInfo) => {
    dispatch(setGameInfo(gameInfo));
    dispatch(setPlayerInfo(playerInfo));
  });

  socket.on('backendError', (err) => {
    console.log(err);
  });

}