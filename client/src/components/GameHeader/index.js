import React from "react";
import "./style.css";

export default function GameHeader(props) {
    return (
        <div className="headerArea">
            <h1>Round {props.round}</h1>
            <h2>promptmaster {(props.promptmaster) ? props.promptmaster.name : null}</h2>
            <h2>Question: {(props.roundQuestion) ? props.roundQuestion : null}</h2>
            <h2>Matcher: {(props.matcher) ? props.matcher.name : null}</h2>
        </div>
    )
}