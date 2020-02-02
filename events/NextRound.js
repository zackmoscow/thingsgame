const Events = require('../helpers/Events');
const GameStates = require('../helpers/GameStates');
const UserStates = require('../helpers/UserStates');
const Game = require('../models/game');
const User = require('../models/user');
const Info = require('./GetInfo');
const shuffle = require('lodash.shuffle');

function nextRound(socket, io) {

  socket.on(Events.NEXT_ROUND, (gameID) => {

    // set up local promptTurn object and allowed function
    const promptTurn = {
      allUsers: [],
      hasWent: [],
    };

    function allowed() {
      return shuffle(promptTurn.allUsers.filter(o => !promptTurn.hasWent.includes(o)))
    }

    // Update gamestate to "prompt", pass in game allUsers/hasWent data, all user states to "waiting" with blank response and promptMaster: false
    Game.findOneAndUpdate({ gameID: gameID }, { gameState: GameStates.PROMPT, prompt: '' }, (err, game) => {
      if (err) {
        socket.emit(Events.ERROR, err);
        return;
      }
      
      promptTurn.allUsers = game.allUsers;
      promptTurn.hasWent = game.hasWent;

      User.updateMany({ gameID: gameID }, { state: UserStates.WAITING, response: '', promptMaster: false }, (err, res) => {
        if (err) {
          socket.emit(Events.ERROR, err);
          return;
        }

      // Create next promptmaster and update game to reflect that new promptmaster "hasWent"
        const allowedArray = allowed();
        console.log('allowedArray', allowedArray);

        if (allowedArray.length > 0) {

          User.findOneAndUpdate({ gameID: gameID, _id: allowedArray[0] }, { promptMaster: true, state: UserStates.PROMPT }, (err, user) => {
            if (err) {
              socket.emit(Events.ERROR, err);
              return;
            }

            promptTurn.hasWent.push(user._id);

            Game.findOneAndUpdate({ gameID: gameID }, { promptMaster: user.userName, hasWent: promptTurn.hasWent }, (err, res) => {
              if (err) {
                socket.emit(Events.ERROR, err);
                return;
              }

              Info.getUserInfo(gameID, (userInfo) => {
                Info.getGameInfo(gameID, (gameInfo) => {
                  io.to(gameID).emit(Events.UPDATE, gameInfo, userInfo);
                });
              });
            });
          });
        }

        // if all users have been the promptmaster, empty "hasWent", select new promptmaster, push to hasWent
        if (allowedArray.length === 0) {

          promptTurn.hasWent = [];
          const newAllowedArray = allowed();
          console.log('newAllowedArray', newAllowedArray);

          User.findOneAndUpdate({ gameID: gameID, _id: newAllowedArray[0] }, { promptMaster: true, state: UserStates.PROMPT }, (err, user) => {
            if (err) {
              socket.emit(Events.ERROR, err);
              return;
            }

            promptTurn.hasWent.push(user._id);

            Game.findOneAndUpdate({ gameID: gameID }, { promptMaster: user.userName, hasWent: promptTurn.hasWent }, (err, res) => {
              if (err) {
                socket.emit(Events.ERROR, err);
                return;
              }

              Info.getUserInfo(gameID, (userInfo) => {
                Info.getGameInfo(gameID, (gameInfo) => {
                  io.to(gameID).emit(Events.UPDATE, gameInfo, userInfo);
                });
              });
            });
          });
        }
      });
    });
  });
}

module.exports = nextRound;

