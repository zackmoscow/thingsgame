import React, {Component, createContext} from 'react';
import cookie from "react-cookies";

export const UserContext = createContext();

export default class UserProvider extends Component {
  constructor(props){
    super(props);
    this.state = {userName: cookie.load('userName') || ''}
    this.changeUser = this.changeUser.bind(this);
  }
  changeUser(a){
    cookie.save('userName', a)
    this.setState({userName: a})
  }



  render(){
    return(
      <UserContext.Provider value={{...this.state, changeUser : this.changeUser}}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}