import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './JokeItem.css';

class JokeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      didVote: false,
      voteCount: 0,
    }
  }
  componentDidMount() {
    this.setState({ voteCount: this.props.joke.voteCount })
  }
  handleUpvote = () => {
    this.setState({ 
      didVote: true,
      voteCount: this.state.voteCount + 1,
    })

    this.props.updateVoteCount(this.props.joke._id, 1)

    axios.post('/api/jokes/upvote', {id: this.props.joke._id})
      .then(res => {
        console.log('upvote successful...');
      })
      .catch(err => {
        console.log('unable to upvote...');
      })
  }
  handleDownvote = () => {
    this.setState({ 
      didVote: true,
      voteCount: this.state.voteCount - 1,
    })

    this.props.updateVoteCount(this.props.joke._id, -1)

    axios.post('/api/jokes/downvote', {id: this.props.joke._id})
      .then(res => {
        console.log('downvote successful...');
      })
      .catch(err => {
        console.log('unable to downvote...');
      })
  }
  render() {
    return (
      <div style={{'display': 'flex'}}>
        {this.props.votable &&
          <div>
            <div className={this.state.didVote ? 'finished-vote' : 'unfinished-vote'}>
              <span onClick={this.handleUpvote}>+</span>
            </div>
            <div className={this.state.didVote ? 'finished-vote' : 'unfinished-vote'}>
              <span onClick={this.handleDownvote}>-</span>
            </div>
          </div>
        }
        <div>
          <span className={'vote-count'}>{this.state.voteCount}</span>
        </div>
        <div className={'joke-container'}>
          <span>{this.props.joke.text}</span>
        </div>
      </div>
    )
  }
}

JokeItem.propTypes = {
  joke: PropTypes.object,
  updateVoteCount: PropTypes.func,
  votable: PropTypes.bool,
};

export default JokeItem;

