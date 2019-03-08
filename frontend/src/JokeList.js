import React, { Component } from 'react';
import JokeItem from './JokeItem';
import PropTypes from 'prop-types';
import './JokeList.css';

class JokeList extends Component {
  render() {
    return (
      <ul className={'joke-list'}>
        {this.props.jokes.map(joke => {
          return (
            <li key={joke._id}>
              <JokeItem 
                votable={this.props.votable}
                updateVoteCount={this.props.updateVoteCount}
                joke={joke} />
            </li>
          )
        })}
      </ul>
    )
  }
}

JokeList.propTypes = {
  jokes: PropTypes.array,
  updateVoteCount: PropTypes.func,
  votable: PropTypes.bool,
};

export default JokeList;
