import React, { useState, useRef, useEffect, useContext } from "react";
import "./style.css";
import Axios from "axios";
import {UserContext} from '../../utils/UserContext';
import SelectAvatar from '../../components/SelectAvatar';

export default function Title() {
    const {userEmail, userWins, userAvatar, changeEmail, changeAvatar} = useContext(UserContext);
    const [inputType, setInputType] = useState("password");
    const pwInput = useRef(null);
    const emailInput = useRef(null);
  
    function setUser(val){
        const userInfo = {
            email: emailInput.current.value,
            userName: emailInput.current.value, 
            password: pwInput.current.value
        };
        if(val === 'register'){
            console.log('you clicked register')
            Axios.post('/user/register', userInfo)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        } else if (val === 'login'){
            console.log('you clicked login')
            Axios.get(`/user/login/${userInfo.email}/${userInfo.password}`)
            .then(function (response) {
                if(response.status === 200){
                    changeEmail(userInfo.email);
                } else {
                    console.log('you blew it')
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

    function showAvatars(){
        const aviOptions = ['man1', 'woman1','man2', 'woman2','man3', 'woman3','man4', 'woman4',]
        return aviOptions.map((item, index) => {
            return <SelectAvatar key={index} onClick={changeAvatar} imgPath={`images/avatars/${item}.svg`} />      
        })
    }

    function isLoggedIn(){
        if(userEmail !== ''){
            return(
                <div>
                    <h1>Welcome, {userEmail}!</h1>
                    <p>You've won {userWins} games.</p>
                    <img className="userAvatar" src={userAvatar} />
                    <div>
                    {showAvatars()}
                    </div>
                    <button id="signout" onClick={() => changeEmail('')}>Not You? Switch Users</button>
                    <a id="join" href="/game">Join Game</a>
                </div>
                )
        }
    }

    function showForm(){
        if(userEmail === ''){
            return (
            <div>
                <form>
                    <fieldset>
                        <input type="name" id="username" ref={emailInput} required/>
                        <label htmlFor="username">Email</label>
                    </fieldset>
                    <fieldset>
                        <input type={inputType} id="password" ref={pwInput} required/>
                        <label htmlFor="password">Password</label>
                    </fieldset>
                    <label aria-hidden="true" className="pwToggle"><input type="checkbox" onClick={showPassword} /> Show Password</label>
                </form>
                <div id="msgArea"></div>
                <button id="loginSubmit" onClick={()=>setUser('login')}>Log In</button>
                <button id="signup" onClick={()=>setUser('register')}>Sign Up</button>
            </div>
            )
        }
    }

    function showPassword() {
        if (inputType === "password") {
            setInputType("text");
        } else {
            setInputType("password");
        }
      }

    return (
        <section className="titleScreen">
            {isLoggedIn()}
            {showForm()}
        </section>
    )
}