const Events = require('../helpers/Events');
const GameStates = require('../helpers/GameStates');
const Game = require('../models/game');
const User = require('../models/user');
const Info = require('./GetInfo');

function gameEnd(socket, io) {

  socket.on(Events.GAME_END, (gameID) => {

    User.find({ gameID: gameID }, (err, users) => {
      if (err) {
        socket.emit(Events.ERROR, err);
        return;
      }
      users.sort((a, b) => (a.currentScore > b.currentScore) ? -1 : 1);
      let winner = users[0].userName;
      let winnerWins = users[0].wins + 1;
    
      User.findOneAndUpdate({ gameID: gameID, userName: winner }, { wins: winnerWins }, (err, user) => {
        if (err) {
          socket.emit(Events.ERROR, err);
          return;
        }
        Game.findOneAndUpdate({ gameID: gameID }, { gameState: GameStates.FINAL_RESULTS, gameWinner: winner }, (err, game) => {
          if (err) {
            socket.emit(Events.ERROR, err);
            return;
          }
          Info.getGameInfo(gameID, (gameInfo) => {
            Info.getUserInfo(gameID, (userInfo) => {
                io.to(gameID).emit(Events.UPDATE, gameInfo, userInfo);
            });
          });
        });
      });
    });
  });
}


module.exports = gameEnd;

