const Events = require('../helpers/Events');
const GameStates = require('../helpers/GameStates');
const UserStates = require('../helpers/UserStates');
const Game = require('../models/game');
const User = require('../models/user');
const Info = require('./GetInfo');

// Create Game with shareable ID using Game model and automatically add user who created game into the game

function createGame(socket, io) {

  function generateGameID() {
    const characters = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let gameID = '';
  
    for (let i = 0; i < 8; i++) {
      gameID += characters[Math.floor(Math.random() * characters.length)];
    }
  
    return gameID;
  }

  function addUserToGame(userName, gameID, promptMaster, userAvatar) {
    User.findOneAndUpdate({userName : userName}, {
      gameID: gameID, 
      state: UserStates.LOBBY, 
      promptMaster: promptMaster,
      currentScore: 0,
      gameWinner: false,
      response: '',
      avatar: userAvatar
    })
    .catch((err) => {
      socket.emit(Events.ERROR, err);
    })
    return;
  }

  socket.on(Events.NEW_GAME, (userName, userAvatar) => {

    let gameID = generateGameID();

    Game.findOne({ gameID: gameID }, (err, game) => {
      if (err) {
        socket.emit(Events.ERROR, err);
        return;
      }
      if (game == null) {
        let NewGame = new Game({
          gameID: gameID,
          gameState: GameStates.LOBBY,
          prompt: '',
          promptMaster: userName,
          round: 1,
          users: 1,
          currentTurn: 1
        });

        NewGame.save((err) => {
          if (err) {
            socket.emit(Events.ERROR, err);
            return;
          }

          addUserToGame(userName, gameID, true, userAvatar); 

            socket.join(gameID);

            Info.getGameInfo(gameID, (gameInfo) => {
              Info.getUserInfo(gameID, (userInfo) => {
                  socket.emit(Events.ADDED_TO_GAME, gameInfo, userInfo);
                  io.to(gameID).emit(Events.UPDATE, gameInfo, userInfo);
              });
            });
        });
      }
      else {
        socket.emit(Events.ERROR);
        return;
      }
    });
  });

// Add other users into the game
  socket.on(Events.JOIN_GAME, (gameID, userName, userAvatar) => {

    Game.findOne({ gameID: gameID }, (err, game) => {
      if (err) {
        socket.emit(Events.ERROR, err);
        return;
      }
      if (game == null) {
        socket.emit(Events.NO_GAME_FOUND, gameID);
        return;
      }
      if (game.gameState != GameStates.LOBBY) {
        socket.emit(Events.GAME_IN_PROGRESS, gameID);
        return;
      }

      let enrollment = game.users + 1;

      Game.findOneAndUpdate({ gameID: gameID }, { users: enrollment }, (err, game) => {
        if (err) {
          socket.emit(Events.ERROR, err);
          return;
        }

        addUserToGame(userName, gameID, false, userAvatar);
          
          socket.join(gameID);

          Info.getGameInfo(gameID, (gameInfo) => {
            Info.getUserInfo(gameID, (userInfo) => {
                socket.emit(Events.ADDED_TO_GAME, gameInfo, userInfo);
                io.to(gameID).emit(Events.UPDATE, gameInfo, userInfo);
            });
          });
      });
    });
  });
}

module.exports = createGame;

// Send game code to other potential users?

