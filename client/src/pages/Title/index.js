import React, { useState, useRef, useEffect, useContext } from "react";
import {Link, Redirect} from "react-router-dom";
import "./style.css";
import Axios from "axios";
import {UserContext} from '../../utils/UserContext';
import SelectAvatar from '../../components/SelectAvatar';
import { useDispatch, useSelector } from 'react-redux';
import { newGame, joinGame, setError } from '../../actions/actions';
import Logo from "../../components/Logo";

export default function Title() {
    const {userName, userWins, userAvatar, changeAvatar, isAuthenticated, changeAuthenticated, getUser} = useContext(UserContext);
    const [loginModal, setLoginModal] = useState({ 
        isOpen: false,
        playerClass: "loginModal closed"
    });


    const [inputType, setInputType] = useState("password");
    const [loginError, setLoginError] = useState(null);
    const [signupError, setSignupError] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const pwInput = useRef(null);
    const emailInput = useRef(null);
    const [gameIDInput, setGameIDInput] = useState('');
    const dispatch = useDispatch();
    const gameInfo = useSelector(state => state.gameInfo);
    const userInfo = useSelector(state => state.userInfo);

    console.log('gameInfo', gameInfo)
  
    function setUser(val){
        const userInfo = {
            email: emailInput.current.value,
            userName: emailInput.current.value.substring(0, emailInput.current.value.indexOf('@')), 
            password: pwInput.current.value
        };
        if(val === 'register'){
            console.log('you clicked register')
            Axios.post('/user/signup', userInfo)
            .then(function (response){
                console.log('success!')
                setSignupError('Success! You can now click "Log In" with those credentials.')
            })
            .catch(function (error) {
                setSignupError('User already exists with that email.')
            });
        } else if (val === 'login'){
            Axios.post('/user/login', userInfo)
            .then(function (response) {
                // changeToken(response.data.token);
                // changeUserId(response.data.user._id);
                changeAuthenticated(response.data.token, response.data.user._id);
            })
            .catch(function (error) {
                console.log(error);
                setLoginError('We found no user with those credentials.')
            });
        }
    }

    function showAvatars(){
        const aviOptions = ['man1', 'woman1','man2', 'woman2','man3', 'woman3','man4', 'woman4',]
        return aviOptions.map((item, index) => {
            return <SelectAvatar key={index} onClick={changeAvatar} imgPath={`images/avatars/${item}.svg`} />      
        })
    }

    function copyGameID(){
        var copyText = document.querySelector('#gameID');
        copyText.select();
        copyText.setSelectionRange(0, 99999)
        document.execCommand('copy');
        alert(`Copied game id ${copyText.value} to your clipboard. Invite your friends!`)
    }

    function copyBtn(){
        if(gameInfo.gameID){
            return (
            <div>
                <input id="gameID" value={gameInfo.gameID} readOnly></input>
                <button onClick={()=>copyGameID()}>Copy to clipboard</button>
            </div>
            )
        }
    }

    function enterBtn(){
        if(gameInfo.gameID){
            return <Link to="/onlineGame"><button>Enter Game</button></Link>
        }
    }

    function isLoggedIn(){
        if(isAuthenticated){
            
            return(
                <div className="loginFormDiv">
                    <h1>Welcome, {userName}!</h1>
                    <button id="signout" onClick={() => changeAuthenticated('', '')}>Not You?</button>
                    <p>Current game:</p>
                    {copyBtn()}

                    <img className="userAvatar" src={userAvatar} />
                    <div>
                    {showAvatars()}
                    </div>

                    
                    {/* <a id="createOnlineGame" href="/onlinegame">Create Game</a>
                    <a id="joinOnlineGame" href="/onlinegame">Join Game</a> */}
                    <button id="createOnlineGame" onClick={(e)=>newOnlineGame(e)}>Create New Game</button>
                    <form>
                      <fieldset>
                        <input type='input' value={gameIDInput} onChange={gameIDChange}/>
                        <label htmlFor="joinGameID">GameID</label>
                      </fieldset>
                    </form>
                    <button id="joinOnlineGame" onClick={(e)=>joinOnlineGame(e)}>Join Existing Game</button>
                    {enterBtn()}
                </div>
                )
        }
    }

    function showForm(){
        if(!isAuthenticated){
            return (
            <div className="loginFormDiv">
                <div id="errors">
                {loginError || signupError}
                </div>
                <form>
                    <fieldset>
                        <input type="name" 
                        onChange={()=>{
                            setLoginError(null) 
                            setSignupError(null)
                            }} 
                        id="username" 
                        ref={emailInput} 
                        required/>
                        <label htmlFor="username">Email</label>
                    </fieldset>
                    <fieldset>
                        <input type={inputType} 
                        onChange={()=>{
                            setLoginError(null) 
                            setSignupError(null)
                            }}
                        id="password" 
                        ref={pwInput} 
                        required/>
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

    function newOnlineGame(e) {
        e.preventDefault();
        console.log(userName);
        dispatch(newGame(userName, userAvatar));
        window.location.assign('localhost:3000/onlinegame')
    }

    function joinOnlineGame(e) {
        e.preventDefault();
        console.log(gameIDInput);
        if (gameIDInput !== '') {
            dispatch(joinGame(gameIDInput, userName, userAvatar));
            // window.location.assign('localhost:3000/onlineGame')
            setRedirect(true);
        }
        else {
            dispatch(setError('Game code can not be blank'));
        }
    }

    function gameIDChange(e) {
        setGameIDInput(e.target.value);
    }
    function showLoginModal(){
        if(loginModal.isOpen) {
            setLoginModal({
                ...loginModal,
                isOpen: false,
                playerClass: "loginModal closed"
            });
        } else {
            setLoginModal({
                ...loginModal,
                isOpen: true,
                playerClass: "loginModal open"
            })
        }
    }
    return (
        <section className="titleScreen wrapper">
            <Logo />
            <div className={loginModal.playerClass}>
                {isLoggedIn()}
                {showForm()}
                <button onClick={()=> showLoginModal()} className="closeBtn">X</button>
            </div>

            <div className="localGameBtn">
                <button id="onlineLoginModal" onClick={()=>showLoginModal()}>Play Online</button>
                <span className="submitOr">or</span>
                <a id="offlineGameInit" href="/offlinegame">Play Offline</a>
                <a id="avatarCustomization" href="/avatar">Customize Avatar</a>
            </div>
            {redirect && <Redirect to="/onlineGame" />}
        </section>
    )
}