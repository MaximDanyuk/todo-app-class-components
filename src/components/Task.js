/* eslint-disable react/destructuring-assignment */
/* eslint-disable */
import PropTypes from 'prop-types';
import React from 'react';

export default class Task extends React.PureComponent {
  state = {
    newValue: '', /// setTasksData
    totalValue: this.props.taskText, /// setFiltered
    change: null, /// setIsSelected
    fullTime: this.props.totalTime,
  };

  changeTaskText = (_id, title) => {
    this.setState({
      newValue: title,
      change: _id,
    });
  };

  handleCardText = (evt) => {
    this.setState({
      newValue: evt.target.value,
    });
  };

  handleAddCardSubmit = (evt) => {
    const { newValue } = this.state;

    evt.preventDefault();

    this.setState({
      totalValue: newValue,
      change: null,
    });

    this.props.handleTaskEdit(this.props._id, newValue);
  };

  componentDidUpdate(prevProps, prevstate) {
    const { isPaused } = this.props;
    let timeOut = setTimeout(() => {
      if (!isPaused) {
        this.setState(({ fullTime }) => {
          return {
            fullTime: fullTime >= 1 ? fullTime - 1 : 0,
          };
        });
      }
    }, 1000);
    if (isPaused) {
      clearTimeout(timeOut);
    }
  }

  render() {
    const { newValue, totalValue, change, fullTime } = this.state;
    const {
      created,
      handleTaskDelete,
      _id,
      handleTaskDone,
      status,
      handleStart,
      handleStop,
    } = this.props;

    const timerMin = Math.floor(+fullTime / 60);
    const timerSec = Math.floor(+fullTime % 60);

    return (
      <li className={!status ? 'completed' : ''}>
        <div className="view">
          {change === _id ? (
            <form onSubmit={this.handleAddCardSubmit}>
              <input
                onChange={this.handleCardText}
                value={newValue}
              />
              <input type="submit" value="Сохранить" />
            </form>
          ) : (
            <>
              <input
                className="toggle"
                type="checkbox"
                defaultChecked={!status}
                onClick={() => handleTaskDone({ _id })}
              />
              <label>
                <span className="description">{totalValue}</span>
                <span className="timer__buttons">
                  <button
                    aria-label="button play"
                    className="icon icon-play"
                    type="button"
                    onClick={() => handleStart(_id)}
                  />
                  <button
                    aria-label="button pause"
                    className="icon icon-pause"
                    type="button"
                    onClick={() => handleStop(_id, fullTime)}
                  />
                </span>
                <span className="timer__text">
                  {timerMin >= 10 ? timerMin : '0' + timerMin}:
                  {timerSec >= 10 ? timerSec : '0' + timerSec}
                </span>

                <span className="created">created {created} ago</span>
              </label>
              <button
                aria-label="edit toDo"
                type="button"
                className="icon icon-edit"
                onClick={() => this.changeTaskText(_id, totalValue)}
              />
              <button
                type="button"
                aria-label="delete toDo"
                className="icon icon-destroy"
                onClick={() => handleTaskDelete({ _id })}
              />
            </>
          )}
        </div>
      </li>
    );
  }
}
Task.defaultProps = {
  taskText: '',
  created: '',
  handleTaskDelete: {},
  _id: '',
  handleTaskDone: {},
};

Task.propTypes = {
  taskText: PropTypes.string,
  created: PropTypes.string,
  handleTaskDelete: PropTypes.func,
  _id: PropTypes.string,
  handleTaskDone: PropTypes.func,
};
