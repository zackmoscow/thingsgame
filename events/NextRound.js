const Events = require('../helpers/Events');
const GameStates = require('../helpers/GameStates');
const UserStates = require('../helpers/UserStates');
const Game = require('../models/game');
const User = require('../models/user');
const Info = require('./GetInfo');
const shuffle = require('lodash.shuffle');

function nextRound(socket, io) {

  // Get stored promptTurn data from game object

  socket.on(Events.NEXT_ROUND, (gameID) => {

    const promptTurn = {
      allUsers: [],
      hasWent: [],
    };

    function allowed() {
      return shuffle(promptTurn.allUsers.filter(o => o !== promptTurn.hasWent.includes(o)))
    }

    // Update gamestate to "prompt", all user states to "waiting" with blank response and promptMaster: false

    Game.findOneAndUpdate({ gameID: gameID }, { gameState: GameStates.PROMPT, prompt: '' }, (err, game) => {
      if (err) {
        socket.emit(Events.ERROR, err);
        return;
      }
      console.log(game);
      promptTurn.allUsers = game.allUsers;
      promptTurn.hasWent = game.hasWent;

      User.updateMany({ gameID: gameID }, { state: UserStates.WAITING, response: '', promptMaster: false }, (err, res) => {
        if (err) {
          socket.emit(Events.ERROR, err);
          return;
        }

      // Create next promptmaster

        const allowedArray = allowed();

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
              })

          })
        }

        if (allowedArray.length === 0) {

          promptTurn.hasWent = [];
          const newAllowedArray = allowed();
          console.log('allowed', allowed);

            User.findOneAndUpdate({ gameID: gameID, _id: newAllowedArray[0] }, { promptMaster: true, state: UserStates.PROMPT }, (err, user) => {
              if (err) {
                socket.emit(Events.ERROR, err);
                return;
              }
              // Game.findOneAndUpdate({ gameID: gameID }, { promptMaster: user.userName, hasWent: promptTurn.hasWent }, (err, res) => {
              //   if (err) {
              //     socket.emit(Events.ERROR, err);
              //     return;
              //   }
                Info.getUserInfo(gameID, (userInfo) => {
                  Info.getGameInfo(gameID, (gameInfo) => {
                    io.to(gameID).emit(Events.UPDATE, gameInfo, userInfo);
                  });
                });
              // })
            })
        }
      })
    });
  })
}

module.exports = nextRound;

