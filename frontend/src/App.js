import React, { Component } from 'react';
import './App.css';
import JokesContainer from './JokesContainer';

class App extends Component {
  render() {
    return (
      <div className={'app'}>
        <div className={'heading'}>
          <h1>Joke<span className={'sub-heading'}>List</span></h1>
          <p>Vote on the best and worst jokes</p>
        </div>
        <JokesContainer />
      </div>
    )
  }
}

export default App;
