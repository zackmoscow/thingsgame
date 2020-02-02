import React, { useEffect, useState, createContext } from 'react';
import Axios from 'axios';

export const UserContext = createContext();

export default function UserProvider(props) {
  const [token, setToken] = useState(localStorage.getItem('thingsAuthToken') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('thingsAuthToken') ? true : false);
  const [userId, setUserId] = useState(localStorage.getItem('thingsUserId') || '');
  const [userName, setUserName] = useState('Set Your Username!');
  const [userWins, setUserWins] = useState(0);
  const [userAvatar, setUserAvatar] = useState('');

  const changeAvatar = (avatar) => {
    setUserAvatar(avatar);
  };

  const changeAuthenticated = (token, userId) => {
    if(isAuthenticated === true){
      localStorage.removeItem('thingsAuthToken');
      setToken('');
      setUserName('');
      setUserId('');
      setUserId(0);
      setUserAvatar('');
      setIsAuthenticated(false);
    } else {
      localStorage.setItem('thingsAuthToken', token);
      // i'm setting the userId in it's own setter bc then I can save it in localStorage
      changeUserId(userId);
      setIsAuthenticated(true);
      setToken(token);
      getUser(token, userId);
    }
  };

  const changeToken = (token) => {
    setToken(token);
    localStorage.setItem('thingsAuthToken', token);
  };

  const changeUserId = (id) => {
    setUserId(id);
    localStorage.setItem('thingsUserId', id);
  };

  //gets the user info from the db. This is called as soon as the user is authenticated.
  const getUser = (token, id) => {
    Axios.get(`/user/${id}`, {
      headers: {
        'Content-type': 'application/json',
        'x-auth-token': token
      }
    })
    .then(result => {
      const {wins, userName, avatar} = result.data;
      setUserName(userName);
      setUserWins(wins);
      setUserAvatar(avatar);
    })
    .catch(err => console.log(err));
  };

  useEffect(() => {
    if(userId && token) getUser(token, userId); 
  },[]);

  useEffect(() => {
    //updates the user in the db
    const inputData = {
      userName,
      wins: userWins,
      avatar: userAvatar
    }
    Axios.put(`/user/${userId}`, inputData, {
      headers: {
        'Content-type': 'application/json',
        'x-auth-token': token
      }
    })
    .then(() => {});
  },[userWins, userAvatar]);

  return(
    <UserContext.Provider 
      value={{ 
      changeAuthenticated, 
      changeToken,
      changeUserId,
      changeAvatar,
      getUser,
      userName,
      userAvatar,
      isAuthenticated
    }}
    >
      {props.children}
    </UserContext.Provider>
  );
}