/* eslint-disable */

import nextId from 'react-id-generator';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PropTypes from 'prop-types';
import React from 'react';

export default class NewTaskForm extends React.PureComponent {
  state = { cardText: '', timeSec: '', timeMin: '' };

  handleCardText = (evt) => {
    this.setState({
      cardText: evt.target.value,
    });
    /// current input value setCardText
  };

  handleCardSec = (evt) => {
    this.setState({
      timeSec: +evt.target.value,
    });
  };

  handleCardMin = (evt) => {
    this.setState({
      timeMin: +evt.target.value,
    });
  };

  handleAddCardSubmit = (evt) => {
    const { handleAddCard } = this.props;
    const { cardText, timeSec, timeMin } = this.state;
    evt.preventDefault();
    if (!cardText.trim().length || +timeSec === 0 || +timeMin === 0) {
      return;
    }

    handleAddCard({
      taskText: cardText,
      _id: nextId(),
      created: `${formatDistanceToNow(new Date())}`,
      /// formatDistanceToNow when created
      status: true,
      totalTime: timeMin * 60 + timeSec,
      isPaused: true,
    });
    this.setState({
      cardText: '',
      timeSec: '',
      timeMin: '',
    });
  };

  render() {
    const { cardText, timeSec, timeMin } = this.state;
    return (
      <form
        onSubmit={this.handleAddCardSubmit}
        className="new-todo-form"
      >
        <input type="submit" hidden />
        <input
          placeholder="What needs to be done?"
          className="new-todo"
          onChange={this.handleCardText}
          value={cardText}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={this.handleCardMin}
          value={timeMin}
          type="number"
          max={60}
          min={0}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={this.handleCardSec}
          value={timeSec}
          max={60}
          min={0}
          type="number"
        />
      </form>
    );
  }
}

NewTaskForm.defaultProps = {
  handleAddCard: {},
};

NewTaskForm.propTypes = {
  handleAddCard: PropTypes.func,
};
