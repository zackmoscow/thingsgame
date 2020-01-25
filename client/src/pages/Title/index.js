import React, { useState } from "react";
import "./style.css";

export default function Title() {
    const [inputType, setInputType] = useState("password");
    function showPassword() {
        if (inputType === "password") {
            setInputType("text");
        } else {
            setInputType("password");
        }
      }
    return (
        <section className="titleScreen">
            <form>
                <fieldset>
                    <input type="name" id="username" />
                    <label htmlFor="username">Username</label>
                </fieldset>
                <fieldset>
                    <input type={inputType} id="password" />
                    <label htmlFor="password">Password</label>
                </fieldset>
                <label aria-hidden="true" className="pwToggle"><input type="checkbox" onClick={showPassword} /> Show Password</label>
                <button id="loginSubmit" type="submit">Log In</button>
            </form>
            <button id="signup">Sign Up</button>
            <a id="join" href="/game">Join Game</a>
        </section>
    )
}