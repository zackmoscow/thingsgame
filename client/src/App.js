import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Game from "./pages/Game";
import Title from "./pages/Title";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Title} />
        <Route exact path="/game" component={Game} />
      </Switch>
    </Router>
  );
}

export default App;