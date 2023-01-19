import TasksFilter from './TasksFilter';
import PropTypes from 'prop-types';
import React from 'react';

export default class Footer extends React.PureComponent {
  render() {
    const { toDoFilter, clearCompletedToDo, tasksData, isSelected } =
      this.props;

    return (
      <footer className="footer">
        <span className="todo-count">
          {tasksData.length} items left
        </span>
        <TasksFilter
          toDoFilter={toDoFilter}
          clearCompletedToDo={clearCompletedToDo}
          isSelected={isSelected}
        />
      </footer>
    );
  }
}
Footer.defaultProps = {
  toDoFilter: {},
  clearCompletedToDo: {},
};

Footer.propTypes = {
  toDoFilter: PropTypes.func,
  clearCompletedToDo: PropTypes.func,
};
