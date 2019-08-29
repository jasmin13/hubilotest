import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Add from "./components/Add";
import Home from "./components/Home";

function App() {
  return (
      <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/posts/new" component={Add} />
          <Route path="/posts/:id" component={Add} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
