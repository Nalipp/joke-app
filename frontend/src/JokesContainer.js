import React, { Component } from 'react';
import './JokesContainer.css';
import JokeList from './JokeList';
import axios from 'axios';

class JokesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      masterJokesList: [],
      allJokes: [],
      bestJokes: [],
      worstJokes: [],
      randomJokes: [],
    }
  }
  componentDidMount() {
    axios.get('/api/jokes/')
      .then(res => {
        if (res.status === 200) {
          const allJokes = res.data;

          this.setState({ 
            masterJokesList: allJokes,
            allJokes: allJokes 
          });

          this.setState({ allJokes, }, () => {
            this.setState({ 
              bestJokes: allJokes.sort((a, b) => b.voteCount - a.voteCount).slice(0, 5),
              worstJokes: allJokes.sort((a, b) => a.voteCount - b.voteCount).slice(0, 5),
            }, () => this.getRandomJokes());
          })
        }
      })
      .catch(err => {
        console.log('there was an error accessing the jokes db...');
      })
  }
  getRandomJokes = () => {
    const randomJokes = [];
    const remainingJokes = this.state.allJokes.slice();

    for (let i = 0; i < 20; i += 1) {
      if (remainingJokes.length > 0) {
        let randomIdx = Math.floor(Math.random() * remainingJokes.length);
        randomJokes.push(remainingJokes.splice(randomIdx, 1)[0]) ;
      } 
    }

    this.setState({ 
      randomJokes, 
      allJokes: remainingJokes,
    });
  }
  updateVoteCount = (id, incrementAmt) => {
    const masterJokesListCopy = this.state.masterJokesList.slice(); 
    
    const updatedMasterJokesList = masterJokesListCopy.map(joke => {
      if (joke._id === id) {
        joke.voteCount += incrementAmt;
        return joke;
      } else {
        return joke;
      }
    });

    this.setState({masterJokesList: updatedMasterJokesList}, () => {
      this.setState({
        bestJokes: updatedMasterJokesList.sort((a, b) => b.voteCount - a.voteCount).slice(0, 5),
        worstJokes: updatedMasterJokesList.sort((a, b) => a.voteCount - b.voteCount).slice(0, 5),
      });
    });
  }
  render() {
    return (
      <div>
        <div className={'jokes-container'}>
          <h2>Best Jokes</h2>
          <JokeList jokes={this.state.bestJokes} />
        </div>

        <div className={'jokes-container'}>
          <h2>Worst Jokes</h2>
          <JokeList jokes={this.state.worstJokes} />
        </div>

        <div className={'jokes-container'}>
          <h2>Random Jokes</h2>
          <JokeList 
            votable={true}
            updateVoteCount={this.updateVoteCount}
            jokes={this.state.randomJokes} />
        </div>
        <div className={'more-jokes'}>
          <button onClick={this.getRandomJokes}>More Jokes</button>
        </div>
      </div>
    )
  }
}

export default JokesContainer;

