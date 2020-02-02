const Events = require('../helpers/Events');
const GameStates = require('../helpers/GameStates');
const UserStates = require('../helpers/UserStates');
const Game = require('../models/game');
const User = require('../models/user');
const Info = require('./GetInfo');

function returnToTitle(socket, io) {

  socket.on(Events.RETURN_TO_TITLE, (gameID) => {

      Game.updateOne({ gameID: gameID }, { gameState: GameStates.LOBBY, prompt: '' }, (err, res) => {
        if (err) {
          socket.emit(Events.ERROR, err);
          return;
        }
        User.updateMany({ gameID: gameID }, { state: UserStates.LOBBY, gameID: '', response: '' }, (err, res) => {
          if (err) {
            socket.emit(Events.ERROR, err);
            return;
          }
          Info.getUserInfo(gameID, (playerInfo) => {
            Info.getGameInfo(gameID, (gameInfo) => {
              io.to(gameID).emit(Events.UPDATE, gameInfo, playerInfo);
            });
          });
        })
      });
    })
}

module.exports = returnToTitle;