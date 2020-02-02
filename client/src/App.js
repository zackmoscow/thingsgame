import React, {useState} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import OnlineGame from "./pages/Online";
import OfflineGame from "./pages/Offline";
import Title from "./pages/Title";
import Avatar from "./pages/Avatar";
import UserProvider from "./utils/UserContext.js";
import Color from "./components/colorBox";
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/root';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));


function App() {
  return (
    <Provider store={store}>
    <UserProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Title} />
          <Route exact path="/onlineGame" component={OnlineGame} />
          <Route exact path="/offlinegame" component={OfflineGame} />
          <Route exact path="/avatar" component={Avatar} />
        </Switch>
      </Router>
      {/* <Color /> */}
    </UserProvider>
    </Provider>
  );
}

export default App;