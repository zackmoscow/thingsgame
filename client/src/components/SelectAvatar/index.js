import React, {useContext} from 'react';
import './style.css'

function SelectAvatar(props){
  return(
    <img 
      className="SelectAvatar-avatarOption" 
      onClick={()=>props.onClick(props.imgPath)} 
      src={props.imgPath}
    />
  )
};

export default SelectAvatar;
