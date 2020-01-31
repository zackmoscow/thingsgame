import React, {useState} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import OnlineGame from "./pages/Online";
import OfflineGame from "./pages/Offline";
import Title from "./pages/Title";
import Avatar from "./pages/Avatar";
import UserProvider from "./utils/UserContext.js";
import Color from "./components/colorBox";


function App() {

  return (
    <UserProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Title} />
          {localStorage.getItem('thingsAuthToken') && <Route exact path="/onlineGame" component={OnlineGame} />}
          <Route exact path="/offlinegame" component={OfflineGame} />
          <Route exact path="/avatar" component={Avatar} />
        </Switch>
      </Router>
      {/* <Color /> */}
    </UserProvider>
  );
}

export default App;