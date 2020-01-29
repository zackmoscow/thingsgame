import React, {Component, createContext} from 'react';
import cookie from "react-cookies";
import Axios from 'axios';

export const UserContext = createContext();

function updateUser(obj){
  console.log(obj)
  const inputData = {
    email: obj.userEmail,
    wins: obj.userWins,
    avatar: obj.userAvatar
  }
  Axios.put('/user', inputData)
    .then(()=>{})
}

export default class UserProvider extends Component {
  constructor(props){
    super(props);
    this.state = {
      userEmail: cookie.load('userName') || '',
      userWins: 0,
      userAvatar: ''
    }
    this.changeEmail = this.changeEmail.bind(this);
    this.changeAvatar = this.changeAvatar.bind(this);
    this.changeWins = this.changeWins.bind(this);
  }
  changeEmail(a){
    cookie.save('userEmail', a)
    this.setState({...this.state, userEmail: a})
  }
  changeAvatar(a){
    this.setState({...this.state, userAvatar: a})
    updateUser({...this.state, userAvatar: a})
  }
  changeWins(){
    this.setState({...this.state, wins: (this.state.wins + 1)})
    updateUser({...this.state, wins: (this.state.wins + 1)})
  }

  render(){
    return(
      <UserContext.Provider value={{...this.state, changeEmail : this.changeEmail, changeAvatar: this.changeAvatar}}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}