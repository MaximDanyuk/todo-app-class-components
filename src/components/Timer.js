/* eslint-disable */
import React from 'react';

export default class Timer extends React.PureComponent {
  state = {
    fullTime: this.props.totalTime,
  };

  startTimer = () => {
    const { fullTime } = this.state;
    if (!this.timer && fullTime > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.timer = true;
  };

  countDown = () => {
    const { status, saveTimerTime, _id } = this.props;
    const { fullTime } = this.state;
    this.setState({
      fullTime: fullTime - 1,
    });

    if (!status) {
      clearInterval(this.timer);
      this.timer = false;
    }

    if (fullTime === 0) {
      clearInterval(this.timer);
      this.timer = false;
    }
    saveTimerTime(_id, fullTime);
  };

  render() {
    const { fullTime } = this.state;
    const timerMin = Math.floor(+fullTime / 60);
    const timerSec = Math.floor(+fullTime % 60);

    return (
      <>
        <span className="timer__buttons">
          <button
            aria-label="button play"
            className="icon icon-play"
            type="button"
            onClick={this.startTimer}
          />
          <button
            aria-label="button pause"
            className="icon icon-pause"
            type="button"
            onClick={this.stopTimer}
          />
        </span>
        <span className="timer__text">
          {timerMin >= 10 ? timerMin : '0' + timerMin}:
          {timerSec >= 10 ? timerSec : '0' + timerSec}
        </span>
      </>
    );
  }
}
