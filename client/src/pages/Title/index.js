import React, { useState, useRef, useEffect, useContext } from "react";
import "./style.css";
import Axios from "axios";
import {UserContext} from '../../utils/UserContext';

export default function Title() {
    const {userName, changeUser} = useContext(UserContext);
    const [inputType, setInputType] = useState("password");
    const pwInput = useRef(null);
    const emailInput = useRef(null);
  
    function setUser(val){
        const userInfo = {email: emailInput.current.value, password: pwInput.current.value};
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
                    changeUser(userInfo.email);
                } else {
                    console.log('you blew it')
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

    function logOutBtn(){
        if(userName !== ''){
            return(
                <div>
                    <button 
                        onClick={()=> changeUser('')}>
                            Log Out
                    </button>
                    <a id="join" href="/game">Join Game</a>
                </div>
                )
        }
    }

    function showForm(){
        if(userName === ''){
            return (
            <div>
                <form>
                <fieldset>
                    <input type="name" id="username" ref={emailInput}/>
                    <label htmlFor="username">Email</label>
                </fieldset>
                <fieldset>
                    <input type={inputType} id="password" ref={pwInput}/>
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
            {logOutBtn()}
            {showForm()}
        </section>
    )
}