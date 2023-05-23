// Guided Meditations Section
const meditationAudios = document.querySelectorAll('#guided-meditations audio');

// Pause all other meditation audios when a new one is played
meditationAudios.forEach(audio => {
  audio.addEventListener('play', (event) => {
    meditationAudios.forEach(otherAudio => {
      if (otherAudio !== event.target) {
        otherAudio.pause();
      }
    });
  });
});

// Meditation Timer Section
const timerInput = document.getElementById('timer-input');
const timerStartButton = document.getElementById('timer-start');
const timerDisplay = document.getElementById('timer-display');
const breathingPattern = document.getElementById('breathing-pattern');
const breathingLabel = document.getElementById('breathing-label');
const ambientSound = document.getElementById('ambient-sound');
const breathingCircle = document.querySelector('.breathing-circle');

let timerInterval;
let isTimerRunning = false;
let isSoundPlaying = false;

// Start the timer and breathing animation
timerStartButton.addEventListener('click', () => {
  const timeInMinutes = parseInt(timerInput.value);

  if (!isNaN(timeInMinutes) && !isTimerRunning) {
    const totalTimeInSeconds = timeInMinutes * 60;
    startTimer(totalTimeInSeconds);
    toggleBreathingAnimation();
    toggleSound();
  }
});

// Start or pause the timer and toggle sound when the breathing circle is clicked
breathingCircle.addEventListener('click', () => {
  if (isTimerRunning) {
    pauseTimer();
    toggleSound();
  } else {
    resumeTimer();
    toggleSound();
  }
});

// Start the countdown timer
function startTimer(totalTimeInSeconds) {
  let remainingTime = totalTimeInSeconds;
  updateTimerDisplay(totalTimeInSeconds);

  timerInterval = setInterval(() => {
    remainingTime--;

    if (remainingTime < 0) {
      stopTimer();
      return;
    }

    updateTimerDisplay(remainingTime);
  }, 1000);

  isTimerRunning = true;
}

// Pause the timer
function pauseTimer() {
  clearInterval(timerInterval);
  isTimerRunning = false;
}

// Resume the timer
function resumeTimer() {
  const timeInMinutes = parseInt(timerDisplay.textContent.split(':')[0]);
  const timeInSeconds = parseInt(timerDisplay.textContent.split(':')[1]);
  const totalTimeInSeconds = timeInMinutes * 60 + timeInSeconds;

  startTimer(totalTimeInSeconds);
}

// Stop the timer and breathing animation
function stopTimer() {
  clearInterval(timerInterval);
  timerDisplay.textContent = '00:00';
  toggleBreathingAnimation();
  isTimerRunning = false;
}

// Update the timer display
function updateTimerDisplay(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  timerDisplay.textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
}

// Format time with leading zero if needed
function formatTime(time) {
  return time < 10 ? '0' + time : time;
}

// Toggle the breathing animation class and update breathing label
function toggleBreathingAnimation() {
  breathingPattern.classList.toggle('breathing');
  breathingLabel.textContent = breathingPattern.classList.contains('breathing') ? 'Breathe Out' : 'Breathe In';
}

// Toggle the ambient sound playback
function toggleSound() {
  if (isSoundPlaying) {
    ambientSound.pause();
  } else {
    ambientSound.play();
  }
  isSoundPlaying = !isSoundPlaying;
}

// Daily Quote Section
const quoteDisplay = document.getElementById('quote-display');
const quoteButton = document.getElementById('quote-button');

// Fetch a random quote from Zen Quotes API
function fetchQuote() {
  fetch('https://api.quotable.io/random')
    .then(response => response.json())
    .then(data => {
      const quote = data.content + ' - ' + data.author;
      quoteDisplay.textContent = quote;
    })
    .catch(error => {
      console.log('Error fetching quote:', error);
      quoteDisplay.textContent = 'Failed to fetch the quote. Please try again later.';
    });
}

// Display a random quote when the page loads
document.addEventListener('DOMContentLoaded', fetchQuote);

// Display a new random quote when the button is clicked
quoteButton.addEventListener('click', fetchQuote);
