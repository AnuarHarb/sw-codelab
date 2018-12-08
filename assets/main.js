// DOM Elements
const playerButton = document.querySelector('.player');
const computerButton = document.querySelector('.computer');
// Audios
const lightsaberSound = document.querySelector('.lightsaber-audio');
const helloSound = document.querySelector('.hello-audio');

// Event Listeners
playerButton.addEventListener('mouseover', playLightsaber);
playerButton.addEventListener('mouseleave', stopLightsaber);
computerButton.addEventListener('mouseover', playHello);
computerButton.addEventListener('mouseleave', stopHello);

// Sound Effects
function playLightsaber() {
  lightsaberSound.play();
}

function stopLightsaber() {
  lightsaberSound.pause();
  lightsaberSound.currentTime = 0;
}

function playHello() {
  helloSound.play();
}

function stopHello() {
  helloSound.pause();
  helloSound.currentTime = 0;
}
