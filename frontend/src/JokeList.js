import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './JokeList.css';

class JokeList extends Component {
  render() {
    return (
      <ul className={'joke-list'}>
        {this.props.allJokes.map(joke => {
          return <li key={joke._id}>{joke.text}</li>
        })}
      </ul>
    )
  }
}

JokeList.propTypes = {
  allJokes: PropTypes.array,
};

export default JokeList;
