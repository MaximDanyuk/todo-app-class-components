import NewTaskForm from './NewTaskForm';
import PropTypes from 'prop-types';
import React from 'react';

export default class Header extends React.PureComponent {
  render() {
    const { handleAddCard } = this.props;

    return (
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm handleAddCard={handleAddCard} />
      </header>
    );
  }
}

Header.defaultProps = {
  handleAddCard: {},
};

Header.propTypes = {
  handleAddCard: PropTypes.func,
};
