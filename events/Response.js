const Events = require('../helpers/Events');
const GameStates = require('../helpers/GameStates');
const UserStates = require('../helpers/UserStates');
const Game = require('../models/game');
const User = require('../models/user');
const Info = require('./GetInfo');
const shuffle = require('lodash.shuffle');

function submitResponse(socket, io) {

  socket.on(Events.SUBMITTED_RESPONSE, (gameID, userName, response) => {
    response = response.trim();

    // Update user who answered's state to "responded", pass in their answer

    User.findOneAndUpdate({ gameID: gameID, userName: userName }, { state: UserStates.RESPONDED, response: response }, (err, res) => {
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

        // If no users are 'noResponse', switch game state to matching, update all player states to "inline", update one non-Promptmaster state to "matching", update Promptmaster state to "wasPromptmaster"

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
              User.find({ gameID: gameID, promptMaster: false }, (err, possibleMatchers) => {
                if (err) {
                  socket.emit(Events.ERROR, err);
                  return;
                }
                let matchers = shuffle(possibleMatchers);
                let firstMatcher = matchers[0];

                User.findOneAndUpdate({ gameID: gameID, userName: firstMatcher.userName }, { state: UserStates.MATCHING }, (err, res) => {
                  if (err) {
                    socket.emit(Events.ERROR, err);
                    return;
                  }

                  User.findOneAndUpdate({ gameID: gameID, promptMaster: true }, { state: UserStates.WAS_PROMPTMASTER }, (err, res) => {
                    if (err) {
                      socket.emit(Events.ERROR, err);
                      return;
                    }
                    
                    // Emit update

                    Info.getUserInfo(gameID, (userInfo) => {
                      Info.getGameInfo(gameID, (gameInfo) => {
                        console.log(userInfo);
                        io.to(gameID).emit(Events.UPDATE, gameInfo, userInfo);
                      });
                    });
                  });
                });
              });
            });
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
