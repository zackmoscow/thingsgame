import React, {useState} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Game from "./pages/Game";
import Title from "./pages/Title";
import UserProvider from './utils/UserContext.js';


function App() {

  return (
    <UserProvider>
    <Router>
      <Switch>
        <Route exact path="/" component={Title} />
        <Route exact path="/game" component={Game} />
      </Switch>
    </Router>
    </UserProvider>
  );
}

export default App;