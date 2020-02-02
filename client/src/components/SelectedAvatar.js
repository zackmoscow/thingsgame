import React from "react";
import Woman1 from "../assets/Woman1";
import Woman2 from "../assets/Woman2";
import Woman3 from "../assets/Woman3";
import Woman4 from "../assets/Woman4";
import Man1 from "../assets/Man1";
import Man2 from "../assets/Man2";
import Man3 from "../assets/Man3";
import Man4 from "../assets/Man4";

export default function SelectedAvatar(props) {
    switch(props.avatarTemplate){
        case "Woman1":
            return <Woman1 {...props}/>
        case "Woman2":
            return <Woman2 {...props}/>
        case "Woman3":
            return <Woman3 {...props}/>
        case "Woman4":
            return <Woman4 {...props}/>
        case "Man1":
            return <Man1 {...props}/>
        case "Man2":
            return <Man2 {...props}/>
        case "Man3":
            return <Man3 {...props}/>
        case "Man4":
            return <Man4 {...props}/>
        default:
            return <Woman1 {...props}/>
    }
}