import React from 'react';
import './App.css';
import Home from './components/Home';
import Images from './components/Images';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <h1>Dog Breeds</h1>
          <Route exact path="/" component={Home} />
          <Route path="/images/:breed" component={Images} />
        </div>
      </Router>
    </div>
  );
}

export default App;
