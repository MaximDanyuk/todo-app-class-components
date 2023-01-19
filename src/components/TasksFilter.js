import PropTypes from 'prop-types';
import React from 'react';

export default class TasksFilter extends React.PureComponent {
  /// Call the necessary functions on the necessary buttons

  render() {
    const { toDoFilter, clearCompletedToDo, isSelected } = this.props;
    /// в массив условия и стрелочная функци
    return (
      <>
        <ul className="filters">
          <li>
            <button
              type="button"
              className={isSelected === 'all' ? 'selected' : null}
              onClick={() => toDoFilter('all')}
            >
              All
            </button>
          </li>
          <li>
            <button
              className={
                isSelected && isSelected !== 'all' ? 'selected' : null
              }
              type="button"
              onClick={() => toDoFilter(true)}
            >
              Active
            </button>
          </li>
          <li>
            <button
              className={isSelected ? null : 'selected'}
              type="button"
              onClick={() => toDoFilter(false)}
            >
              Completed
            </button>
          </li>
        </ul>
        <button
          type="button"
          onClick={() => clearCompletedToDo()}
          className="clear-completed"
        >
          Clear completed
        </button>
      </>
    );
  }
}

TasksFilter.defaultProps = {
  toDoFilter: {},
  clearCompletedToDo: {},
};

TasksFilter.propTypes = {
  toDoFilter: PropTypes.func,
  clearCompletedToDo: PropTypes.func,
};
