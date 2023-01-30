/* eslint-disable react/destructuring-assignment */
/* eslint-disable */
import PropTypes from 'prop-types';
import React from 'react';
import Timer from './Timer';

export default class Task extends React.PureComponent {
  state = {
    totalValue: this.props.taskText, /// setFiltered
    change: null, /// setIsSelected
  };

  handleAddCardSubmit = (evt) => {
    const { totalValue } = this.state;
    const { handleTaskEdit, _id } = this.props;

    evt.preventDefault();

    handleTaskEdit(_id, totalValue);
    this.setState({
      change: null,
    });
  };

  handleOpenEdit = (_id) => {
    this.setState({
      change: _id,
    });
  };

  handleNewValue = (evt) => {
    this.setState({
      totalValue: evt.target.value,
    });
  };

  render() {
    const { totalValue, change } = this.state;
    const {
      created,
      handleTaskDelete,
      _id,
      handleTaskDone,
      status,
      totalTime,
      saveTimerTime,
    } = this.props;
    return (
      <li className={!status ? 'completed' : ''}>
        <div className="view">
          {change === _id ? (
            <form onSubmit={this.handleAddCardSubmit}>
              <input
                onChange={this.handleNewValue}
                value={totalValue}
              />
              <input type="submit" value="Сохранить" />
            </form>
          ) : (
            <>
              <input
                className="toggle"
                type="checkbox"
                defaultChecked={!status}
                onClick={() => handleTaskDone({ _id, totalTime })}
              />
              <label>
                <span className="description">{totalValue}</span>
                <Timer
                  totalTime={totalTime}
                  _id={_id}
                  status={status}
                  saveTimerTime={saveTimerTime}
                />
                <span className="created">created {created} ago</span>
              </label>
              <button
                aria-label="edit toDo"
                type="button"
                className="icon icon-edit"
                onClick={() => {
                  this.handleOpenEdit(_id);
                  saveTimerTime(_id, totalTime);
                }}
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
