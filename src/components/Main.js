import TaskList from './TaskList';
import PropTypes from 'prop-types';
import React from 'react';

export default class Main extends React.PureComponent {
  render() {
    const {
      tasksData,
      handleTaskDelete,
      handleTaskDone,
      handleTaskEdit,
    } = this.props;
    return (
      <main className="main">
        <TaskList
          tasksData={tasksData}
          handleTaskDelete={handleTaskDelete}
          handleTaskDone={handleTaskDone}
          handleTaskEdit={handleTaskEdit}
        />
      </main>
    );
  }
}

Main.defaultProps = {
  tasksData: [],
  handleTaskDone: {},
  handleTaskDelete: {},
};

Main.propTypes = {
  tasksData: PropTypes.arrayOf(PropTypes.shape),
  handleTaskDone: PropTypes.func,
  handleTaskDelete: PropTypes.func,
};
