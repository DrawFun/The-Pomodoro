import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Pomodoro.css';
import { WORKING_TIME, BREAK_TIME, TOTAL_TASK_NUM } from './const';
import Push from 'push.js';

function TaskPanel(props) {
	return (
		<div className='taskpanel'>Today: {props.completed}/{TOTAL_TASK_NUM}</div>
	);
}

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
			completed: 0,
			enable: false,
			isWorkInteral: true,
			timeRemaining: this.getTimeRemaining(WORKING_TIME),
		};
		this.tick = this.tick.bind(this);
		this.completedCurrentTimer = this.completedCurrentTimer.bind(this);
		this.skipCurrentTimer = this.skipCurrentTimer.bind(this);
		this.getTimeRemaining = this.getTimeRemaining.bind(this);
		this.handleStartTimer = this.handleStartTimer.bind(this);
		this.handleSkipTimer = this.handleSkipTimer.bind(this);
		this.handlePushNotification = this.handlePushNotification.bind(this);
		setInterval(this.tick, 1000);
	}

	tick() {
		if (this.state.enable) {
			if (this.state.timeRemaining.total > 0) {
				let timeRemaining = this.getTimeRemaining(this.state.timeRemaining.total - 1);
				this.setState({timeRemaining: timeRemaining});
			} else {
				this.completedCurrentTimer();
				this.skipCurrentTimer(false);
			}
		}
	}

	completedCurrentTimer() {
		if (this.state.isWorkInteral) {
			const completed = this.state.completed + 1;
			this.setState({completed: completed});
		}
		this.handlePushNotification();
	}

	skipCurrentTimer(resetWorkState) {
		if (resetWorkState) {
			this.setState({
				enable: false,
				isWorkInteral: true,
				timeRemaining: this.getTimeRemaining(WORKING_TIME)
			});					
		} else {
			this.setState(prevState => ({
				enable: false,
				isWorkInteral: !prevState.isWorkInteral,
				timeRemaining: this.getTimeRemaining(!prevState.isWorkInteral ? WORKING_TIME : BREAK_TIME)
			}));		
		}

	}

	handleStartTimer() {
		this.setState({enable: true});
	}

	handleSkipTimer() {
		this.skipCurrentTimer(true);
	}

	handlePushNotification() {
		var text = "world";
		var x = false;
		const title = "Time to " + (!this.state.isWorkInteral ? "work!" : "rest!");
		Push.create(title, {
			icon: 'cat.png',
			timeout: 5000,
		});
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
				<TaskPanel completed={this.state.completed}/>
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