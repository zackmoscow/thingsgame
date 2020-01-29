import React, {useState} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Game from "./pages/Game";
import Title from "./pages/Title";
import UserProvider from "./utils/UserContext.js";
import Color from "./components/colorBox";


function App() {

  return (
    <UserProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Title} />
          <Route exact path="/game" component={Game} />
        </Switch>
      </Router>
      <Color />
    </UserProvider>
  );
}

export default App;