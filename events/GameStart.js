const Events = require('../helpers/Events');
const GameStates = require('../helpers/GameStates');
const UserStates = require('../helpers/UserStates');
const Game = require('../models/game');
const User = require('../models/user');
const Info = require('./GetInfo');

function startGame(socket, io) {

  console.log('RUNNING START GAME!');

  const promptTurn = {
    allUsers: [],
    hasWent: [],
  };

  socket.on(Events.START_ROUND, (gameID) => {
    User.find({ gameID: gameID }, (err, users) => {
      if (err) {
        socket.emit(Events.ERROR, err);
        return;
      }

      // Validate we have enough users

      if (users.length > 2) {

        // Update promptTurn object

        promptTurn.allUsers = users.map(o => o._id);

        // Update game state to prompt

        Game.findOneAndUpdate({ gameID: gameID }, { gameState: GameStates.PROMPT, prompt: '', $push: { allUsers: promptTurn.allUsers } }, (err, game) => {
          if (err) {
            socket.emit(Events.ERROR, err);
            return;
          }

          // Find promptmaster

          User.findOne({ gameID: gameID, promptMaster: true }, (err, promptMaster) => {
            if (err) {
              socket.emit(Events.ERROR, err);
              return;
            }

            promptTurn.hasWent.push(promptMaster._id);
            console.log('promptTurn', promptTurn);

            // Assign all users state of "waiting"

            User.updateMany({ gameID: gameID }, { state: UserStates.WAITING, response: ''}, (err, res) => {
              if (err) {
                socket.emit(Events.ERROR, err);
                return;
              }

              // update promptmaster state to prompt

              User.updateOne({ gameID: gameID, userName: promptMaster.userName }, { state: UserStates.PROMPT }, (err, res) => {
                if (err) {
                  socket.emit(Events.ERROR, err);
                  return;
                }

                Game.findOneAndUpdate({ gameID: gameID}, { $push: { hasWent: promptTurn.hasWent } }, (err, res) => {
                  if (err) {
                    socket.emit(Events.ERROR, err);
                    return;
                  }

                // emit update 

                  Info.getUserInfo(gameID, (userInfo) => {
                    Info.getGameInfo(gameID, (gameInfo) => {
                      io.to(gameID).emit(Events.UPDATE, gameInfo, userInfo);
                    });
                  });
                })
              })
            })
          })
        });
      }
      else {socket.emit(Events.NOT_ENOUGH_USERS, users.length)};
    });
  });
};

module.exports = startGame;