const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const sliders = player.querySelectorAll('.player__slider');
const fullscreenbtn = document.getElementById('fullscreen__button');

//toggle play-pause
function togglePlay() {
  video[video.paused ? 'play' : 'pause']();
}
//event listener for togglePlay
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

//update button in the player
function updateButton() {
  toggle.textContent = this.paused ? '►' : '❚ ❚';
}

//event listener for play/pause btn
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

//skip back and forth
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

//event listener for skip button
skipButtons.forEach((button) => button.addEventListener('click', skip));

//handle slides
function handleRangeUpdate() {
  video[this.name] = this.value;
}

//range update event listener
sliders.forEach((slider) =>
  slider.addEventListener('change', handleRangeUpdate)
);

// handle progress
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

//progress slider event listener
video.addEventListener('progress', handleProgress);

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

//scrub event listener
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));

//full screen
fullscreenbtn.addEventListener('click', toggleFullScreen, false);
/* When the openFullscreen() function is executed, open the video in fullscreen.
Note that we must include prefixes for different browsers, as they don't support the requestFullscreen method yet */
function toggleFullScreen() {
  if (video.requestFullScreen) {
    video.requestFullScreen();
  } else if (video.webkitRequestFullScreen) {
    video.webkitRequestFullScreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen();
  }
}
