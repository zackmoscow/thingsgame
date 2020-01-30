import React, {Component, createContext} from 'react';
import Axios from 'axios';

export const UserContext = createContext();

export default class UserProvider extends Component {
  constructor(props){
    super(props);
    this.state = {
      token: localStorage.getItem('thingsAuthToken') || null,
      isAuthenticated: (localStorage.getItem('thingsAuthToken') ? true : false),
      userId: localStorage.getItem('thingsUserId') || '',
      userName: 'Set Your Username!',
      userWins: 0,
      userAvatar: ''
    }
    this.changeUserName = this.changeUserName.bind(this);
    this.changeAvatar = this.changeAvatar.bind(this);
    this.changeWins = this.changeWins.bind(this);
    this.changeAuthenticated = this.changeAuthenticated.bind(this);
    this.changeUserId = this.changeUserId.bind(this);
    this.changeToken = this.changeToken.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }
  changeUserName(a){
    this.setState({...this.state, userName: a})
  }
  changeAvatar(a){
    this.setState({...this.state, userAvatar: a})
    this.updateUser({...this.state, userAvatar: a}, this.state.userId, this.state.token)
  }
  changeWins(a){
    this.setState({...this.state, userWins: (this.state.userWins + a)})
    this.updateUser({...this.state, wins: (this.state.userWins + a)}, this.state.userId, this.state.token)
  }
  changeAuthenticated(token,userId){
    if(this.state.isAuthenticated === true){
      localStorage.removeItem('thingsAuthToken')
      this.setState({
        ...this.state,
        userName: '',
        token: '',
        userId: '',
        userWins: 0,
        userAvatar: '',
        isAuthenticated: false
      });
    } else {
      localStorage.setItem('thingsAuthToken', token)
      // i'm setting the userId in it's own setter bc then I can save it in localStorage
      this.changeUserId(userId);
      this.setState({
        ...this.state,
        isAuthenticated: true,
        token
      });
      this.getUser(token, userId);
    }
  }
  changeToken(a){
    this.setState({...this.state, token: a})
    localStorage.setItem('thingsAuthToken', a)
  }
  changeUserId(a){
    this.setState({...this.state, userId: a})
    localStorage.setItem('thingsUserId', a)
  }

  //gets the user info from the db. This is called as soon as the user is authenticated.
  getUser(token, id){
    Axios.get(`/user/${id}`, {
      headers: {
        'Content-type': 'application/json',
        'x-auth-token': token
      }
    })
    .then(result => {
      const {wins, userName, avatar} = result.data;
      this.changeUserName(userName);
      this.changeWins(wins);
      this.changeAvatar(avatar);
    })
    .catch(err => console.log(err));
  };
  //updates the user in the db
  updateUser(obj, id, token){
    const inputData = {
      userName: obj.userName,
      wins: obj.userWins,
      avatar: obj.userAvatar
    }
    Axios.put(`/user/${id}`, inputData, {
      headers: {
        'Content-type': 'application/json',
        'x-auth-token': token
      }
    })
    .then(()=>{});
  }

  componentDidMount(){
    if(this.state.userId && this.state.token) this.getUser(this.state.token, this.state.userId); 
  }
  


  render(){
    return(
      <UserContext.Provider 
        value={{...this.state, 
        changeAuthenticated: this.changeAuthenticated, 
        changeToken: this.changeToken,
        changeUserId: this.changeUserId,
        changeAvatar: this.changeAvatar,
        getUser: this.getUser
      }}
      >

        {this.props.children}

      </UserContext.Provider>
    );
  }
}