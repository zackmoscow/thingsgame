const Events = require('../helpers/Events');
const GameStates = require('../helpers/GameStates');
const UserStates = require('../helpers/UserStates');
const Game = require('../models/game');
const User = require('../models/user');
const Info = require('./GetInfo');
const shuffle = require('lodash.shuffle');

function submitResponse(socket, io) {
  console.log("SOCKET!!!");
  socket.on(Events.SUBMITTED_RESPONSE, (gameID, userName, response) => {
    console.log("CONNNECT!!!");
    response = response.trim();
    let length = 0;
    (async () => {
      console.log("RUNNING");
      // Update user who answered's state to "responded", pass in their answer
      await User.updateOne({ gameID, userName }, { state: UserStates.RESPONDED, response }, (err, res) => {
        console.log("AWAIT 1");
        if (err) {
          socket.emit(Events.ERROR, err);
          return;
        }
      });
      // Find users with "noResponse" states
      await User.find({ gameID: gameID, state: UserStates.NO_RESPONSE }, (err, users) => {
        console.log("AWAIT 2");
        if (err) {
          socket.emit(Events.ERROR, err);
          return;
        }
        length = users.length;
      });
      // If no users are 'noReponse', switch game state to matching, update all player states to "inline", then update one player state to "matching"
      if (length === 0) {
        let matchers = []; 
        await Game.findOneAndUpdate({ gameID: gameID }, { gameState: GameStates.MATCHING }, (err, game) => {
          console.log("AWAIT 3");
          if (err) {
            socket.emit(Events.ERROR, err);
            return;
          }
        });
        await User.updateMany({ gameID: gameID }, { state: UserStates.INLINE }, (err, res) => {
          console.log("AWAIT 4");
          if (err) {
            socket.emit(Events.ERROR, err);
            return;
          }
        });
        await User.findOneAndUpdate({ gameID: gameID, promptMaster: true}, { state: UserStates.WAS_PROMPTMASTER }, (err, res) => {
          if (err) {
            socket.emit(Events.ERROR, err);
            return;
          }
        });
        await User.find({ gameID: gameID, promptMaster: false }, (err, possibleMatchers) => {
          console.log("AWAIT 5");
          if (err) {
            socket.emit(Events.ERROR, err);
            return; 
          }
          console.log(possibleMatchers);
          matchers = shuffle(possibleMatchers);
          console.log('single', possibleMatchers[0])
        });
        await User.updateOne({ gameID: gameID, userName: matchers[0].userName }, { state: UserStates.MATCHING }, (err, res) => {
          console.log("AWAIT 6");
          if (err) {
            socket.emit(Events.ERROR, err);
            return;
          }
        });
        Info.getUserInfo(gameID, (userInfo) => {
          Info.getGameInfo(gameID, (gameInfo) => {
            io.to(gameID).emit(Events.UPDATE, gameInfo, userInfo);
          });
        });
      } else {
        Info.getUserInfo(gameID, (userInfo) => {
          Info.getGameInfo(gameID, (gameInfo) => {
            io.to(gameID).emit(Events.UPDATE, gameInfo, userInfo);
          });
        });
      }
    })();
  });
}

module.exports = submitResponse;
