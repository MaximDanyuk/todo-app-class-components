import nextId from 'react-id-generator';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PropTypes from 'prop-types';
import React from 'react';

export default class NewTaskForm extends React.PureComponent {
  state = { cardText: '' };

  handleCardText = (evt) => {
    this.setState({
      cardText: evt.target.value,
    });
    /// current input value setCardText
  };

  handleAddCardSubmit = (evt) => {
    const { handleAddCard } = this.props;
    const { cardText } = this.state;

    /// Sending data to the card creation function on submit
    evt.preventDefault();
    if (!cardText.trim().length) {
      return;
    }

    handleAddCard({
      taskText: cardText,
      _id: nextId(),
      created: `${formatDistanceToNow(new Date())}`,
      /// formatDistanceToNow when created
      status: true,
    });
    this.setState({
      cardText: '',
    });
  };

  render() {
    const { cardText } = this.state;
    return (
      <form onSubmit={this.handleAddCardSubmit}>
        <input
          placeholder="What needs to be done?"
          className="new-todo"
          onChange={this.handleCardText}
          value={cardText}
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
