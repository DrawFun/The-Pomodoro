import React, { Component } from 'react';
import { WORKING_TIME, BREAK_TIME, TEST_INTERVAL_TIME } from './const';

function Timer(props) {
	return (
		<div className="timer">{props.time.minutes}:{props.time.seconds}</div>
	);
}

function Control(props) {
	return (
		<div className="controls">
		</div>
	);
}

class Pomodoro extends Component {
	constructor(props) {
		super(props);

		this.state = {
			enable: true,
			timeRemaining: this.getTimeRemaining(WORKING_TIME),
		};
		this.tick = this.tick.bind(this);
		this.getTimeRemaining = this.getTimeRemaining.bind(this);
		setInterval(this.tick, 1000);
	}

	tick() {
		if (this.state.enable) {
			if (this.state.timeRemaining.total > 0) {
				let timeRemaining = this.getTimeRemaining(this.state.timeRemaining.total - 1);
				this.setState({timeRemaining: timeRemaining});
			}
		}

	}

	getTimeRemaining(timeInSecs) {
		const minutes = Math.floor(timeInSecs / 60) < 10
				? '0' + Math.floor(timeInSecs / 60)
				: Math.floor(timeInSecs / 60);
		const seconds = Math.floor(timeInSecs % 60) < 10 
				? '0' + Math.floor(timeInSecs % 60)
				: Math.floor(timeInSecs % 60);
		return { total: timeInSecs, minutes, seconds };
	}  

	render() {
		return (
			<div>
				<h1>Hello!</h1>
				<Timer time={this.state.timeRemaining}/>
			</div>
		);
	}
}

export default Pomodoro;