const Game = require('../models/game');
const User = require('../models/user');

// findOne for Game, callback GameInfo

exports.getGameInfo = (gameID, cb) => {
  Game.findOne({ gameID: gameID }, (err, game) => {
    if (err) {
      console.log('Error: ' + err);
      return;
    }
    if (game == null) {
      console.log('Game not found.');
      return;
    }
    let gameInfo = {
      gameID: gameID,
      gameState: game.gameState,
      prompt: game.prompt,
      promptMaster: game.promptMaster,
      round: game.round
    };
    cb(gameInfo);
  });
};

// then findOne for Game, find all Users in each game, loop through all users and callback info for all

exports.getUserInfo = (gameID, cb) => {
  Game.findOne({ gameID: gameID }, (err, game) => {
    if (err) {
      console.log('Error: ' + err);
      return;
    }
    if (game == null) {
      console.log('Game does not exist');
      return;
    }
    const userInfo = {};
    User.find({ gameID: gameID }, (err, users) => {
      users.forEach((user) => {
        userInfo[user.userName] = {
          gameID: user.gameID,
          state: user.state,
          response: user.response,
          currentScore: user.currentScore,
          turn: user.turn,
          wins: user.wins,
          avatar: user.avatar,
          gameWinner: user.gameWinner
        };
      });
      cb(userInfo);
    });
  });
};
