import React, {useState, setState, useEffect} from "react";
import SelectedAvatar from '../../components/SelectedAvatar';
import {UserContext} from '../../utils/UserContext';
import "./style.css";

export default function Avatar() {
    // const {changeAvatar} = useContext(UserContext)
    const [avatar, setAvatar] = useState('Woman1');
    const [hairColor, setHair] = useState('#b55723');
    const [skinTone, setSkin] = useState('#ffcc8a');
    const [backgroundColor, setBackground] = useState('#a8d0e6');
    const [savedAvatar, setSavedAvatar] = useState({
        avatarTemplate: avatar,
        hairColor,
        skinTone,
        backgroundColor
    });

    const skinToneArr = ["#ffebc6","#ffcc8a","#8a5d3b" ];
    const hairColorArr = ["#dddddd","#ad874d", "#b55723", "#690004", "#2c1111", "#000000"];
    const backgroundColorArr = ["#f8e9a1", "#f76c6c", "#a8d0e6", "#008feb", "#374785"];

    const hair1 = {background: hairColorArr[0]};
    const hair2 = {background: hairColorArr[1]};
    const hair3 = {background: hairColorArr[2]};
    const hair4 = {background: hairColorArr[3]};
    const hair5 = {background: hairColorArr[4]};

    const skin1 = {background: skinToneArr[0]};
    const skin2 = {background: skinToneArr[1]};
    const skin3 = {background: skinToneArr[2]};

    const bg1 = {background: backgroundColorArr[0]};
    const bg2 = {background: backgroundColorArr[1]};
    const bg3 = {background: backgroundColorArr[2]};
    const bg4 = {background: backgroundColorArr[3]};
    const bg5 = {background: backgroundColorArr[4]};

    useEffect(()=>{
        setSavedAvatar({
            ...savedAvatar,
            avatarTemplate: avatar,
            hairColor,
            skinTone,
            backgroundColor
        })
    }, [avatar,
        hairColor,
        skinTone,
        backgroundColor]);
    return (
        <div className="avatarSelection wrapper">
            <h2>Select an avatar to edit</h2>
            <div className="choosePhoto">
                <img src="images/avatars/woman1.svg" alt="select avatar" onClick={()=>setAvatar("Woman1")}/>
                <img src="images/avatars/woman2.svg" alt="select avatar" onClick={()=>setAvatar("Woman2")}/>
                <img src="images/avatars/woman3.svg" alt="select avatar" onClick={()=>setAvatar("Woman3")}/>
                <img src="images/avatars/woman4.svg" alt="select avatar" onClick={()=>setAvatar("Woman4")}/>
                <img src="images/avatars/man1.svg" alt="select avatar" onClick={()=>setAvatar("Man1")}/>
                <img src="images/avatars/man2.svg" alt="select avatar" onClick={()=>setAvatar("Man2")}/>
                <img src="images/avatars/man3.svg" alt="select avatar" onClick={()=>setAvatar("Man3")}/>
                <img src="images/avatars/man4.svg" alt="select avatar" onClick={()=>setAvatar("Man4")}/>
            </div>
            <div className="selectedAvatar">
                <SelectedAvatar {...savedAvatar} />
                <div className="hairColor">
                    <h3>Choose a hair color</h3>
                    <button onClick={()=> {setHair(hairColorArr[0])}} style={hair1}></button>
                    <button onClick={()=> {setHair(hairColorArr[1])}} style={hair2}></button>
                    <button onClick={()=> {setHair(hairColorArr[2])}} style={hair3}></button>
                    <button onClick={()=> {setHair(hairColorArr[3])}} style={hair4}></button>
                    <button onClick={()=> {setHair(hairColorArr[4])}} style={hair5}></button>
                </div>
                <div className="skinTone">
                    <h3>Choose a skin tone</h3>
                    <button onClick={()=> {setSkin(skinToneArr[0])}} style={skin1}></button>
                    <button onClick={()=> {setSkin(skinToneArr[1])}} style={skin2}></button>
                    <button onClick={()=> {setSkin(skinToneArr[2])}} style={skin3}></button>
                </div>
                <div className="backgroundColor">
                    <h3>Choose a background color</h3>
                    <button onClick={()=> {setBackground(backgroundColorArr[0])}} style={bg1}></button>
                    <button onClick={()=> {setBackground(backgroundColorArr[1])}} style={bg2}></button>
                    <button onClick={()=> {setBackground(backgroundColorArr[2])}} style={bg3}></button>
                    <button onClick={()=> {setBackground(backgroundColorArr[3])}} style={bg4}></button>
                    <button onClick={()=> {setBackground(backgroundColorArr[4])}} style={bg5}></button>
                </div>
                <button onClick={()=> console.log(savedAvatar)} className="saveBtn">Save</button>
            </div>
        </div>
    )
}