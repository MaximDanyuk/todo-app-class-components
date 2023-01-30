/* eslint-disable react/jsx-props-no-spreading */
import Task from './Task';
import PropTypes from 'prop-types';
import React from 'react';

export default class TaskList extends React.PureComponent {
  /// draw the toDos array in the list container
  render() {
    const {
      tasksData,
      handleTaskDelete,
      handleTaskDone,
      handleTaskEdit,
      saveTimerTime,
    } = this.props;
    return (
      <ul className="todo-list">
        {tasksData.map((task) => (
          <Task
            key={task._id}
            {...task}
            handleTaskDelete={handleTaskDelete}
            handleTaskDone={handleTaskDone}
            handleTaskEdit={handleTaskEdit}
            saveTimerTime={saveTimerTime}
          />
        ))}
      </ul>
    );
  }
}

TaskList.defaultProps = {
  tasksData: [],
  handleTaskDelete: {},
  handleTaskDone: {},
};

TaskList.propTypes = {
  tasksData: PropTypes.arrayOf(PropTypes.shape),
  handleTaskDelete: PropTypes.func,
  handleTaskDone: PropTypes.func,
};
