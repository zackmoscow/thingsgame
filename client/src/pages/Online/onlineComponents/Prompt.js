import React, { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { submitPrompt } from '../../../actions/actions';
import { UserContext } from '../../../utils/UserContext';
import { getUsers } from './helperFunctions';
import '../style.css';

export default function Prompt() {
    const gameInfo = useSelector(state => state.gameInfo);
    const userInfo = useSelector(state => state.userInfo);
    const dispatch = useDispatch();
    const { userName } = useContext(UserContext);

    const [promptInput, setPromptInput] = useState('');

    function handlePromptSubmit(e) {
        e.preventDefault();
        dispatch(submitPrompt(gameInfo.gameID, promptInput));
        // setPromptInput('');
    }

    function promptOnChange(e) {
        setPromptInput(e.target.value);
    }


    function view() {
        switch (userInfo[userName].state) {
            case 'prompt':
                return (
                    <div className='responseArea'>
                        <p>You are the PromptMaster! Please submit your prompt.</p>
                        <form onSubmit={(e) => { handlePromptSubmit(e) }}>
                            <fieldset>
                                <input type='input' id='promptInput' value={promptInput} onChange={promptOnChange}/>
                                <label htmlFor='prompt'>Prompt</label>
                            </fieldset>
                            <button type='submit'>Submit Prompt</button>
                        </form>
                    </div>
                )
            case 'waiting':
                return (
                    <div className='responseArea'>
                        <p>Paused: waiting for PromptMaster to submit prompt...</p>
                    </div>
                )
            default:
                return (<p>Something bad happened with userInfo.state in prompt</p>)
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
