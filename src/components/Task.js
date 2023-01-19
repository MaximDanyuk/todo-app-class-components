/* eslint-disable react/destructuring-assignment */
import PropTypes from 'prop-types';
import React from 'react';

export default class Task extends React.PureComponent {
  state = {
    newValue: '', /// setTasksData
    totalValue: this.props.taskText, /// setFiltered
    change: null, /// setIsSelected
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
  /// First of all, the user sees the totalValue, which takes the value passed from the form
  /// When editing, the user sees newValue, which becomes equal to totalValue
  /// When editing or simply closing, the user sees the totalValue
  render() {
    const { newValue, totalValue, change } = this.state;
    const { created, handleTaskDelete, _id, handleTaskDone, status } =
      this.props;
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
