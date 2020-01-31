const Events = require('../helpers/Events');
const GameStates = require('../helpers/GameStates');
const UserStates = require('../helpers/UserStates');
const Game = require('../models/game');
const User = require('../models/user');
const Info = require('./GetInfo');

function nextRound(socket, io) {

  // Get stored promptTurn data from game object

  const promptTurn = {
    allUsers: [],
    hasWent: [],
    allowed: function () {
      return shuffle(this.allUsers.filter(o => o !== hasWent.includes(o)))
    }
  };

  Game.find({ gameID: gameID }), (err, game) => {
    if (err) {
      socket.emit(Events.ERROR, err);
      return;
    }
    promptTurn.allUsers = game.allUsers;
    promptTurn.hasWent = game.hasWent;
  }

  socket.on(Events.NEXT_ROUND, (gameID) => {

    // Update gamestate to "prompt", all user states to "waiting" with blank response and promptMaster: false

    Game.findOneAndUpdate({ gameID: gameID }, { gameState: GameStates.PROMPT, prompt: '' }, (err, game) => {
      if (err) {
        socket.emit(Events.ERROR, err);
        return;
      }

      User.updateMany({ gameID: gameID }, { state: UserStates.WAITING, response: '', promptMaster: false }, (err, res) => {
        if (err) {
          socket.emit(Events.ERROR, err);
          return;
        }

      // Create next promptmaster

        const allowed = promptTurn.allowed();

        if (allowed.length > 0) {

          User.findOneAndUpdate({ gameID: gameID, _id: allowed[0] }, { promptMaster: true, state: UserStates.PROMPT }, (err, user) => {
            if (err) {
              socket.emit(Events.ERROR, err);
              return;
            }

            promptTurn.hasWent.push(promptMaster._id);

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

        if (allowed.length == 0) {

          promptTurn.hasWent = [];
          const allowed = matchTurn.allowed();

            User.findOneAndUpdate({ gameID: gameID, _id: allowed[0] }, { promptMaster: true, state: UserStates.PROMPT }, (err, user) => {
              if (err) {
                socket.emit(Events.ERROR, err);
                return;
              }
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
      });
    });
  })
}

module.exports = nextRound;

