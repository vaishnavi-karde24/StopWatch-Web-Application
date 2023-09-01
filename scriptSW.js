let timerInterval;
let startTime;
let lapTimes = [];

function formatTime(milliseconds) {
  const date = new Date(milliseconds);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  const millisecondsFormatted = (date.getUTCMilliseconds() / 10).toFixed(0).toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}.${millisecondsFormatted}`;
}

function updateDisplay() {
  const currentTime = Date.now() - startTime;
  document.getElementById('display').innerText = formatTime(currentTime);
}

function startStop() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    document.getElementById('startStopButton').innerText = 'Start';
  } else {
    startTime = Date.now() - (lapTimes.length > 0 ? lapTimes.reduce((acc, lap) => acc + lap, 0) : 0);
    timerInterval = setInterval(updateDisplay, 10);
    document.getElementById('startStopButton').innerText = 'Stop';
  }
}

function lap() {
  if (timerInterval) {
    const currentTime = Date.now();
    const lapTime = currentTime - startTime;
    lapTimes.push(lapTime);
    const lapTimeFormatted = formatTime(lapTime);
    const lapTimesList = document.getElementById('lapTimes');
    const li = document.createElement('li');
    li.innerText = `Lap ${lapTimes.length}: ${lapTimeFormatted}`;
    lapTimesList.appendChild(li);
  }
}

function reset() {
  clearInterval(timerInterval);
  timerInterval = null;
  startTime = 0;
  lapTimes = [];
  document.getElementById('display').innerText = '00:00:00.00';
  document.getElementById('startStopButton').innerText = 'Start';
  const lapTimesList = document.getElementById('lapTimes');
  lapTimesList.innerHTML = '';
}

document.getElementById('startStopButton').addEventListener('click', startStop);
document.getElementById('lapButton').addEventListener('click', lap);
document.getElementById('resetButton').addEventListener('click', reset);
