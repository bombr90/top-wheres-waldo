import { timeToString } from './../util';

const Timer = ({timeSec, startFlag}) => {
  return (
    <div id="timer">
      <h2>Search Time: {startFlag ? '00:00:00' : timeToString(timeSec)}</h2>
    </div>
  )
}

export default Timer