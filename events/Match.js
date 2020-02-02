const Events = require('../helpers/Events');
const GameStates = require('../helpers/GameStates');
const UserStates = require('../helpers/UserStates');
const Game = require('../models/game');
const User = require('../models/user');
const Info = require('./GetInfo');
const shuffle = require('lodash.shuffle');

function match(socket, io) {

  // need "next user" functionality to cycle through who's turn it is to match
  const matchTurn = {
    allUsers: [],
    hasWent: [],
  };

  function allowed() {
    return shuffle(matchTurn.allUsers.filter(o => !matchTurn.hasWent.includes(o)))
  }

  socket.on(Events.MATCHED, (gameID, userName, match) => {
    User.findOne({ gameID: gameID, userName: match.name, response: match.response }, (err, user) => {
      if (err) {
        socket.emit(Events.ERROR, err);
        return;
      }

      // if unsuccessful match, put matcher back in line, select new matcher
      if (user == null) {
        User.findOneAndUpdate({ gameID: gameID, userName: userName }, { state: UserStates.INLINE }, (err, u) => {
          if (err) {
            socket.emit(Events.ERROR, err);
            return;
          }

          matchTurn.hasWent.push(u._id);

          User.find({ gameID: gameID, promptMaster: false }, (err, users) => {
            if (err) {
              socket.emit(Events.ERROR, err);
              return;
            }
            matchTurn.allUsers = users.map(o => o._id);

            const allowedArray = allowed();
            
            if (allowedArray.length > 0) {
              User.findOneAndUpdate({ gameID: gameID, _id: allowedArray[0] }, { state: UserStates.MATCHING }, (err, user) => {
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
            }

            if (allowedArray.length == 0) {
              matchTurn.hasWent = [];
              const allowed = shuffle(matchTurn.allUsers);
              User.findOneAndUpdate({ gameID: gameID, _id: allowed[0] }, { state: UserStates.MATCHING }, (err, user) => {
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
            }
          });
        });
      }

      // if successful match, augment score and repeat with remaining responses (eliminating matched user)
      else {
        User.findOneAndUpdate({ gameID: gameID, userName: match.name }, { state: UserStates.ELIMINATED }, (err, res) => {
        if (err) {
          socket.emit(Events.ERROR, err);
          return;
        }
          User.findOneAndUpdate({ gameID: gameID, userName: userName }, { $inc: { currentScore: 1 } }, (err, res) => {
            if (err) {
              socket.emit(Events.ERROR, err);
              return;
            }
            User.find({ gameID: gameID, state: { $ne: UserStates.ELIMINATED } }, (err, users) => {
              if (err) {
                socket.emit(Events.ERROR, err);
                return;
              }

              // when eliminated users.length is one remaining matcher plus promptmaster, increment score for round winner, update game state to results, all user states to results, emit update
              if (users.length < 3) {
                Game.findOneAndUpdate({ gameID: gameID }, { gameState: GameStates.ROUND_RESULTS }, (err, res) => {
                  if (err) {
                    socket.emit(Events.ERROR, err);
                    return;
                  }
                  User.findOneAndUpdate({ gameID: gameID, userName: userName }, { $inc: { currentScore: 2 } }, (err, res) => {
                    if (err) {
                      socket.emit(Events.ERROR, err);
                      return;
                    }  
                    User.updateMany({ gameID: gameID }, { state: UserStates.RESULTS }, (err, res) => {
                      if (err) {
                        socket.emit(OutboundEvents.ERROR, err);
                        return;
                      }
                      matchTurn.allUsers = [];
                      matchTurn.hasWent = [];
                      Info.getUserInfo(gameID, (userInfo) => {
                        Info.getGameInfo(gameID, (gameInfo) => {
                          io.to(gameID).emit(Events.UPDATE, gameInfo, userInfo);
                        });
                      });
                    });
                  });
                });
              }
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
    });
  });
}

module.exports = match;
