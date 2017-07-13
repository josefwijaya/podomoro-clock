import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import { setTimerLength } from "../actions/timer.action"

@connect((store) => {
  return {
    timer: store.timer
  };
})
export default class Timer extends Component {
  constructor () {
    super();
    this.timer = {
      break: false,
      countBreak: 0,
      periodTitle: {
        session: ['“It’s hard to beat a person who never gives up.”', '“Hard work helps. It has never killed anyone.”', "No Pain, No gain!"],
        break: ["Now chill and relax", "Take a rest for a while"],
      }
    };
  }
  setLength(input, newValue) {
    // update presentation layer
    document.getElementById(input).value = newValue;
    
    // update state
    this.props.dispatch(setTimerLength({ key: input, value: newValue }));
  }

  startTimer (timer) {
    const countdown = this.timer;

    if(this.timer.timeInterval){
      return;
    }

    const getRandNumber = (max) => {
      return Math.floor(Math.random() * (max - 0));
    }

    countdown.minutes = countdown.minutes ? countdown.minutes : timer.sessionLength;
    countdown.seconds = countdown.seconds || 0;

    const updateTimer = () => {
      
      if(countdown.seconds <= 0) {
        countdown.seconds = 60;
        countdown.minutes -= 1;
      }

      countdown.seconds -= 1;
      
      if(countdown.minutes <= 0 && countdown.seconds <= 0) {
        countdown.break = !countdown.break;
        if (countdown.break) {
          countdown.countBreak += 1;
          console.log(countdown.countBreak, (countdown.countBreak % 5) === 0);
          countdown.minutes = (countdown.countBreak % 5) === 0 ? timer.longBreakLength : timer.breakLength;
          this.props.dispatch(setTimerLength({ key: 'period', value: countdown.periodTitle.break[getRandNumber(countdown.periodTitle.break.length)] }));          
        } else {
          countdown.minutes = timer.sessionLength;
          this.props.dispatch(setTimerLength({ key: 'period', value: countdown.periodTitle.session[getRandNumber(countdown.periodTitle.session.length)] }));          
        }
      }
      
      this.props.dispatch(setTimerLength({ key: 'seconds', value: countdown.seconds }));
      this.props.dispatch(setTimerLength({ key: 'minutes', value: countdown.minutes }));
    }

    updateTimer();
    this.props.dispatch(setTimerLength({ key: 'period', value: countdown.periodTitle.session[getRandNumber(countdown.periodTitle.session.length)] }));
    this.timer.timeInterval = setInterval(updateTimer, 1000);
  }

  stopTimer () {
    clearInterval(this.timer.timeInterval);
    delete this.timer.timeInterval;
  }

  clearTimer () {
    clearInterval(this.timer.timeInterval);
    delete this.timer.minutes;
    delete this.timer.seconds;
    delete this.timer.timeInterval;
    this.props.dispatch(setTimerLength({ key: 'seconds', value: 0 }));
    this.props.dispatch(setTimerLength({ key: 'minutes', value: 0 }));
  }

  render () {
    const { timer } = this.props;
    
    return <div class="timer">
      <section class="section">
        <div class="row p-b-70" style={{margin: 0}}>
          <div class="col-sm-4 text-center timer-slider">
            <p>Session length</p>
            <input type="range" min="5" max="60" defaultValue={timer.sessionLength} onChange={(e) => { this.setLength("sessionLength", e.target.value); }} />
            <span id="sessionLength">{timer.sessionLength}</span><span> minutes</span>
          </div>
          <div class="col-sm-4 text-center timer-slider">
            <p>Break length</p>
            <input type="range" min="2" max="15" defaultValue={timer.breakLength} onChange={(e) => { this.setLength("breakLength", e.target.value); }} />
            <span id="breakLength">{timer.breakLength}</span><span> minutes</span>
          </div>
          <div class="col-sm-4 text-center timer-slider">
            <p>Longer Break length</p>
            <input type="range" min="5" max="30" defaultValue={timer.longBreakLength} onChange={(e) => { this.setLength("longBreakLength", e.target.value); }} />
            <span id="longBreakLength">{timer.longBreakLength}</span><span> minutes</span>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="period text-center">
          <p>{timer.period || "Hello There and Let's start :)"}</p>
        </div>
      </section>
      <section class="section time text-center">
        <div class="row p-b-70" style={{margin: 0}}>
          <span id="minuteSpan">{('0' + timer.minutes).slice(-2)}</span><span>:</span><span id="secondSpan">{('0' + timer.seconds).slice(-2)}</span>
        </div>
        <a class="btn" onClick={() => { this.startTimer(timer); }}>Start</a>
        <a class="btn" onClick={() => { this.stopTimer(); }}>Stop</a>
        <a class="btn" onClick={() => { this.clearTimer(); }}>Clear</a>
      </section>
    </div>
  }
}

function mapStateToProps (state) {
  return {
    timer: state.timer
  };
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators({ setTimerLength: setTimerLength }, dispatch);
}

// export default connect(mapStateToProps, matchDispatchToProps)(Timer);