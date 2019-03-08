import React, { Component } from 'react';
import './App.css';
import JokesContainer from './JokesContainer';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Joke List</h1>
        <JokesContainer />
      </div>
    )
  }
}

export default App;
