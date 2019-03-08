import React, { Component } from 'react';
import './App.css';
import JokeList from './JokeList';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allJokes: [],
    }
  }
  componentDidMount() {

    axios.get('/api/jokes/')
      .then(res => {
        console.log('res.status', res.status);
        if (res.status === 200) {
          console.log(res.data);
          this.setState({ allJokes: res.data });
        }
      })

  }
  render() {
    return (
      <div>
        <h1>Joke App</h1>
        <JokeList allJokes={this.state.allJokes} />
      </div>
    )
  }
}

export default App;
