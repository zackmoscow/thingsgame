import io from 'socket.io-client';
import { setGameInfo, setUserInfo } from '../actions/actions'

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

  socket.on('update', (gameInfo, userInfo) => {
    dispatch(setGameInfo(gameInfo));
    dispatch(setUserInfo(userInfo));
  });

  socket.on('backendError', (err) => {
    console.log(err);
  });

}