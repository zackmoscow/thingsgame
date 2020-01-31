export default function gameInfoReducer(gameInfo = {}, action) {
  switch (action.type) {
    case 'gameInfo':
      return gameInfo = action.payload;
    default:
      return gameInfo;
  }
} 