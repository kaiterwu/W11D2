import React from 'react';
import { useState,useEffect } from 'react';

export const ClockToggle = ({toggleClock})=>{
  // render () {
    return (
      <button 
        type="button"
        className="clock-toggle" 
        onClick={toggleClock}
      >
        Toggle Clock
      </button>
    )
  }
// } 

const Clock = ()=> {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     time: new Date(),
  //   };
  // }
  const [currentTime,setCurrentTime] = useState(new Date())
  // componentDidMount() {
  //   this.interval = setInterval(this.tick, 1000);
  // }

  useEffect(()=>{
    const timeRequest = setInterval(tick,1000)
    return ()=>{
      clearInterval(timeRequest)
    }
  },[])
  
  // componentWillUnmount() {
  //   console.log("Clearing Clock interval!")
  //   clearInterval(this.interval);
  // }
  
  
  const tick = () => {
    setCurrentTime(new Date());
  }

  // render() {
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();
    hours = (hours < 10) ? `0${hours}` : hours;
    minutes = (minutes < 10) ? `0${minutes}` : minutes;
    seconds = (seconds < 10) ? `0${seconds}` : seconds;

    const timezone = currentTime
      .toTimeString() // Form: "14:39:07 GMT-0600 (PDT)"
      .replace(/[^A-Z]/g, "") // Strip out all but capitals
      .slice(3); // Eliminate initial GMT

    return (
      <section className="clock-section">
        <h1>Clock</h1>
        <div className='clock'>
          <p className="time">
            <span>
              Time:
            </span>
            <span>
              {`${hours}:${minutes}:${seconds} ${timezone}`}
            </span>
          </p>
          <p className="date">
            <span>
              Date: 
            </span>
            <span>
              {currentTime.toDateString()}
            </span>
          </p>
        </div>
      </section>
    );
  }
// }

export default Clock;