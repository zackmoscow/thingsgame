import React from 'react';
import { useSelector } from 'react-redux';

export function turnUserInfoIntoArray() {
    const userInfo = useSelector(state => state.userInfo);
    let users = [];
    for (let key in userInfo) {
        users.push({
            userName: key,
            ...userInfo[key]
        })
    }
    return users;
}

export function getUsers() {
    return turnUserInfoIntoArray.map(user)
}

function user(o) {
    let userClass = "player";
    
    return(
        <div className={userClass} key={o.userName} id={o.userName}>
            <img src={o.avatar} alt={`${o.userName}'s Avatar`} className="playerAvatar lvl1"/>
            <h3 className="playerName">{o.userName}</h3>
            <p className="playerScore lvl2">{o.currentScore}</p>
        </div>
    )
}

