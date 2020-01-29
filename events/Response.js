const Events = require('../helpers/Events');
const GameStates = require('../helpers/GameStates');
const UserStates = require('../helpers/UserStates');
const Game = require('../models/game');
const User = require('../models/user');
const Info = require('./GetInfo');

function submitResponse(socket, io) {
   
  socket.on(Events.SUBMITTED_RESPONSE, (gameID, userName, response) => {
    response = response.trim();

      // Update user who answered's state to "responded", pass in their answer

      User.updateOne({ gameID: gameID, userName: userName }, { state: UserStates.RESPONDED, response: response }, (err, res) => {
        if (err) {
          socket.emit(Events.ERROR, err);
          return;
        }

        // Find users with "noResponse" states

        User.find({ gameID: gameID, state: UserStates.NO_RESPONSE }, (err, users) => {
          if (err) {
            socket.emit(Events.ERROR, err);
            return;
          }

          // If no users are 'noReponse', switch game state to matching, update all player states to "inline", then update one player state to "matching"

          if (users.length == 0) {
            Game.findOneAndUpdate({ gameID: gameID }, { gameState: GameStates.MATCHING }, (err, game) => {
              if (err) {
                socket.emit(Events.ERROR, err);
                return;
              }
              User.updateMany({ gameID: gameID }, { state: UserStates.INLINE }, (err, res) => {
                if (err) {
                  socket.emit(Events.ERROR, err);
                  return;
                }
                User.find({ gameID: gameID, promptMaster: false}), (err, possibleMatchers) => {
                  const firstMatcher = possibleMatchers[Math.floor(Math.random() * possibleMatchers.length)]
                
                User.updateOne({ gameID: gameID, userName: firstMatcher.userName }, { state: UserStates.MATCHING }, (err, res) => {

                  // Emit update

                  Info.getUserInfo(gameID, (userInfo) => {
                    Info.getGameInfo(gameID, (gameInfo) => {
                      io.to(gameID).emit(Events.UPDATE, gameInfo, userInfo);
                    });
                   });
                })
              }
              })
            });
          }

          // If at least one user is still "noResponse", send update and wait for more responses

          else {
            Info.getUserInfo(gameID, (userInfo) => {
              Info.getGameInfo(gameID, (gameInfo) => {
                io.to(gameID).emit(Events.UPDATE, gameInfo, userInfo);
              });
            });
          }
        });
      });
  });
}

module.exports = submitResponse;





