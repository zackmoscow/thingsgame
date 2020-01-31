import React from "react";
import "./style.css";

export default function Players() {
    function player(o) {
        let playerClass = "player";
        let dragEvents = {
            onDragOver:  e => onDragOver(e),
            onDragEnter: e => onDragEnter(e),
            onDragLeave: e => onDragLeave(e),
            onDrop: e=> onDrop(e)
        }
        if (o.isEliminated || o.promptmaster) {
            playerClass = "player eliminated";
            dragEvents = {};
        }
        return(
            <div className={playerClass} key={o.id} id={o.name} {...dragEvents}>
                <img src={o.avatar} alt={`${o.name}'s Avatar`} className="playerAvatar lvl1"/>
                <h3 className="playerName">{o.name}</h3>
                <p className="playerScore lvl2">{o.score}</p>
            </div>
        )
    }

    function getPlayers(props) {
        if (props.participants) {
            return props.participants.map(player);
        }
    }
}