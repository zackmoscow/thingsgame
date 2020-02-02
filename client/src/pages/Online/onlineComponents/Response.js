import React, { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { submitResponse } from '../../../actions/actions';
import { UserContext } from '../../../utils/UserContext';
import { getUsers } from './helperFunctions';
import '../style.css';

export default function Response() {
    const gameInfo = useSelector(state => state.gameInfo);
    const userInfo = useSelector(state => state.userInfo);
    const dispatch = useDispatch();
    const { userName } = useContext(UserContext);
    
    const [responseInput, setResponseInput] = useState('');

    console.log(userInfo);

    function handleResponseSubmit(e) {
        e.preventDefault();
        dispatch(submitResponse(gameInfo.gameID, userName, responseInput));
        setResponseInput('');
    }

    function responseOnChange(e) {
        setResponseInput(e.target.value);
    }

    function view() {
        switch (userInfo[userName].state) {
            case 'noResponse':
                return (
                    <div className='responseArea'>
                        <p>Please enter your response!</p>
                        <form onSubmit={(e) => { handleResponseSubmit(e) }}>
                            <fieldset>
                                <input type='input' id='responseInput' value={responseInput} onChange={responseOnChange}/>
                                <label htmlFor='response'>Response</label>
                            </fieldset>
                            <button type='submit'>Submit Response</button>
                        </form>
                    </div>
                )
            case 'responded':
                return (
                    <div className='responseArea'>
                        <p>Paused: waiting for all players to submit responses...</p>
                    </div>   
                )
            default:
                return ((<p>Something bad happened with userInfo.state in response</p>))
        }
    }

    return (
        <div className='gameBoard'>
        <div className='headerArea'>
            <h1>Round: {gameInfo.round}</h1>
            <h2>PromptMaster: {gameInfo.promptMaster}</h2>
            <h2>Prompt: {gameInfo.prompt}</h2>
        </div>
        {view()}
        <div className='playerArea'>
            {getUsers()}
        </div>
    </div>
    );
}