import React, { Component } from 'react';
import { WORKING_TIME, BREAK_TIME, TEST_INTERVAL_TIME } from './const';

function Timer(props) {
	return (
		<div className="timer">{props.time.minutes}:{props.time.seconds}</div>
	);
}

function Controller(props) {
	return (
		<div className="controller">
			<button onClick={props.handleOnClickStart}>Start</button>
			<button onClick={props.handleOnClickSkip}>Skip</button>
		</div>
	);
}

class Pomodoro extends Component {
	constructor(props) {
		super(props);

		this.state = {
			enable: false,
			isWorkInteral: true,
			timeRemaining: this.getTimeRemaining(WORKING_TIME),
		};
		this.tick = this.tick.bind(this);
		this.getTimeRemaining = this.getTimeRemaining.bind(this);
		this.handleStartTimer = this.handleStartTimer.bind(this);
		this.handleSkipTimer = this.handleSkipTimer.bind(this);
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

	handleStartTimer() {
		this.setState(prevState => ({enable: !prevState.enable}));
	}

	handleSkipTimer() {
		this.setState(prevState => ({
			enable: false,
			isWorkInteral: !prevState.isWorkInteral,
			timeRemaining: this.getTimeRemaining(!prevState.isWorkInteral ? WORKING_TIME : BREAK_TIME)
		}));
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
				<Controller
					handleOnClickStart={this.handleStartTimer}
					handleOnClickSkip={this.handleSkipTimer}
				/>
			</div>
		);
	}
}

export default Pomodoro;