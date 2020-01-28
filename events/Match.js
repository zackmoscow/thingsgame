const Events = require('../helpers/Events');
const GameStates = require('../helpers/GameStates');
const UserStates = require('../helpers/UserStates');
const Game = require('../models/game');
const User = require('../models/user');
const Info = require('./GetInfo');
const shuffle = require('lodash.shuffle');

function match(socket, io) {

  const matchTurn = {
    allUsers: [],
    hasWent: [],
    allowed: function() {
      return shuffle(this.allUsers.filter(o => o !== hasWent.includes(o)))
    }
  };

  socket.on(Events.MATCHED, (gameID, userName, match) => {
    User.findOne({ gameID: gameID, userName: match.name, response: match.response }, (err, user) => {
      if (err) {
        socket.emit(Events.ERROR, err);
        return;
      }
      if (user == null) {
        User.findOneAndUpdate({ gameID: gameID, userName: userName }, { state: UserStates.INLINE }, (err, user) => {
          if (err) {
            socket.emit(Events.ERROR, err);
            return;
          }
          matchTurn.hasWent.push(user._id);

          User.find({ gameID: gameID, promptMaster: false }), (err, users) => {
            if (err) {
              socket.emit(Events.ERROR, err);
              return;
            }
            matchTurn.allUsers = users.map(o => o._id);

            const allowed = matchTurn.allowed();
            
            if (allowed.length > 0) {
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
              })
            }

            if (allowed.length == 0) {
              matchTurn.hasWent = [];
              const allowed = matchTurn.allowed();
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
              })
            }
          }
        })
      }
      else {
        User.updateOne({ gameID: gameID, userName: match.name }, { state: UserStates.ELIMINATED }, (err, res) => {
        if (err) {
          socket.emit(Events.ERROR, err);
          return;
        }
        User.updateOne({ gameID: gameID, userName: userName }, { $inc: { currentScore: 1 } }, (err, res) => {
          if (err) {
            socket.emit(Events.ERROR, err);
            return;
          }
          User.find({ gameID: gameID, state: { $ne: UserStates.ELIMINATED } }, (err, users) => {
            if (err) {
              socket.emit(Events.ERROR, err);
              return;
            }
            if (users.length < 2) {
              Game.updateOne({ gameID: gameID }, { gameState: GameStates.ROUND_RESULTS }, (err, res) => {
                if (err) {
                  socket.emit(Events.ERROR, err);
                  return;
                }
                User.updateOne({ gameID: gameID, userName: userName }, { $inc: { currentScore: 2 } }, (err, res) => {
                  if (err) {
                    socket.emit(Events.ERROR, err);
                    return;
                  }  
                  User.updateMany({ gameID: gameID }, { state: UserStates.RESULTS }, (err, res) => {
                    if (err) {
                      socket.emit(OutboundEvents.BACKEND_ERROR, err);
                      return;
                    }
                    matchTurn.allUsers = [];
                    matchTurn.hasWent = [];
                    Info.getUserInfo(gameID, (userInfo) => {
                      Info.getGameInfo(gameID, (gameInfo) => {
                        io.to(gameID).emit(Events.UPDATE, gameInfo, userInfo);
                      });
                    });
                  })
                })
              })
            }
            else {
              Info.getUserInfo(gameID, (userInfo) => {
                Info.getGameInfo(gameID, (gameInfo) => {
                    io.to(gameID).emit(Events.UPDATE, gameInfo, userInfo);
                });
              });
            }
          })
        })
        });
      }
    })
  });
}

module.exports = match;

// need a "next user" function to cycle through who's turn it is to match

// find user who's turn it currently is, taking in their match
// if match, augment score and repeat with remaining responses (removing matched response)
// also if match, set matched user to "eliminated"
// if no match, run next user fxn

// update user state to matching
// emit update


// when eliminated users.length is two less than total users.length, update game state to results, all user states to results, emit update