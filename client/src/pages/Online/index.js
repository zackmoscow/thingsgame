import React from 'react';
import { useSelector } from 'react-redux';
import Lobby from './onlineComponents/Lobby';
import Prompt from './onlineComponents/Prompt';
import Response from './onlineComponents/Response';
import Match from './onlineComponents/Match';
import RoundResults from './onlineComponents/RoundResults';
import FinalResults from './onlineComponents/FinalResults';
import "./style.css";

export default function OnlineGame() {
  const gameInfo = useSelector(state => state.gameInfo);

  function renderGame() {
    switch (gameInfo.gameState) {
      case 'lobby':
        return <Lobby/>
      case 'prompt':
        return <Prompt/>
      case 'responding':
        return <Response/>
      case 'matching':
        return <Match/>
      case 'roundResults':
        return <RoundResults/>
      case 'finalResults':
        return <FinalResults/>
      default:
        return <Lobby/>
    }
  }
  return (
    <div>
        {renderGame()}
    </div>
  );
}