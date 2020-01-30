import React, {useState} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import OnlineGame from "./pages/Online";
import OfflineGame from "./pages/Offline";
import Title from "./pages/Title";
import UserProvider from "./utils/UserContext.js";
import Color from "./components/colorBox";


function App() {

  return (
    <UserProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Title} />
          <Route exact path="/onlinegame" component={OnlineGame} />
          <Route exact path="/offlinegame" component={OfflineGame} />
        </Switch>
      </Router>
      <Color />
    </UserProvider>
  );
}

export default App;