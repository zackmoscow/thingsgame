import React from "react";
import "./style.css";

export default function GameHeader(props) {
    return (
        <div className="headerArea clearfix">
            <div className="leftHeader">
                <h2 className="round"><span>Round</span> {props.round}</h2>
                <h2 className="promptmaster"><span>promptmaster</span> {(props.promptmaster) ? props.promptmaster.name : "waiting"}</h2>
            </div>
            <div className="rightHeader">
                <h1 className="prompt"><span>Prompt</span> {(props.roundQuestion) ? props.roundQuestion : "waiting"}</h1>
                <h2 className="matching"><span>Matching</span> {(props.matcher) ? props.matcher.name : "waiting"}</h2>
            </div>
        </div>
    )
}