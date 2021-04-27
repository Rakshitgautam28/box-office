import React from "react";
import {  Switch, Route } from 'react-router-dom'
import Navs from "./Components/Navs";
import Home from './Pages/Home'
import Starred from './Pages/Starred'

function App() {
  return (
    <div>
      <Navs />
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route exact path="/starred"><Starred /></Route>
        <Route>This is 404 error page</Route>
      </Switch>
    </div>
  );
}

export default App;
