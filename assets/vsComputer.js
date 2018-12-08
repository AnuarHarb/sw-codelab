'use strict';
// DOM Selectors
const selection = document.querySelector('.obiWan__select');
const showDown = document.querySelector('.obiWan__match');
// Sounds
const cloneSound = document.querySelector('.clone-sound');
const lightsaberSound = document.querySelector('.lightsaber-audio');
const forceSound = document.querySelector('.force-audio');

const cloneCard = document.querySelector('.card__clone');
const lightsaberCard = document.querySelector('.card__lightsaber');
const forceCard = document.querySelector('.card__force');

const playerIcon = document.querySelector('.player1-icon');
const playerWeapon = document.querySelector('.player1-weapon');
const obiWanIcon = document.querySelector('.obiWan-icon');
const obiWanWeapon = document.querySelector('.obiWan-weapon');
const winnerText = document.querySelector('.winner-text');
const resultImage = document.querySelector('.result-image');

// Sound event listeners
cloneCard.addEventListener('mouseover', playClone);
cloneCard.addEventListener('mouseleave', stopClone);
lightsaberCard.addEventListener('mouseover', playLightsaber);
lightsaberCard.addEventListener('mouseleave', stopLightsaber);
forceCard.addEventListener('mouseover', playForce);
forceCard.addEventListener('mouseleave', stopForce);

function playClone() {
  cloneSound.play();
}

function stopClone() {
  cloneSound.pause();
  cloneSound.currentTime = 0;
}

function playLightsaber() {
  lightsaberSound.play();
}

function stopLightsaber() {
  lightsaberSound.pause();
  lightsaberSound.currentTime = 0;
}

function playForce() {
  forceSound.play();
}

function stopForce() {
  forceSound.pause();
  forceSound.currentTime = 0;
}


// Game Logic
function vsComputer(form) {
  const player1 = form.jugador.value;
  const obiWan = ObiWanPlay();

  match(player1, obiWan);
  showWinContainer();
}

function ObiWanPlay() {
  let obiWan = Math.ceil(Math.random()*3);
  if(obiWan == 1) {
    obiWan = 'lightsaber';
  } else if(obiWan == 2 ){
    obiWan = 'clones';
  } else {
    obiWan = 'force';
  }
  return obiWan;
}

function setWeapons(character, text, weapon) {
  character.src = `../assets/img/vs-computer/${weapon}-icon.png`;
  text.innerHTML = `${weapon}`;
}

function match(player1, obiWan) {
  setWeapons(playerIcon, playerWeapon, player1);
  setWeapons(obiWanIcon, obiWanWeapon, obiWan);
  switch(player1){
    case 'lightsaber':
      if(obiWan == 'lightsaber') {
        winnerText.innerHTML = 'is a tie!';
        resultImage.src = '../assets/img/vs-computer/lightsaber-tie.jpg';
      } else if(obiWan == 'force') {
        winnerText.innerHTML = 'obi-wan Wins!';
        resultImage.src = '../assets/img/vs-computer/lightsaber-lost.gif';
      } else {
        winnerText.innerHTML = 'You win!';
        resultImage.src = '../assets/img/vs-computer/lightsaber-win.gif';
      }
      break;
    case 'force':
      if(obiWan == 'lightsaber') {
        winnerText.innerHTML = 'You win!';
        resultImage.src = '../assets/img/vs-computer/force-win.gif';
      } else if(obiWan == 'force') {
        winnerText.innerHTML = 'is a tie!';
        resultImage.src = '../assets/img/vs-computer/force-tie.gif';
      } else {
        winnerText.innerHTML = 'obi-wan Wins!';
        resultImage.src = '../assets/img/vs-computer/force-lost.gif'
      }
      break;
    default:
      if(obiWan == 'lightsaber') {
        winnerText.innerHTML = 'obi-wan Wins!';
        resultImage.src = '../assets/img/vs-computer/clone-lost.gif';
      } else if(obiWan == 'force') {
        winnerText.innerHTML = 'You win!';
        resultImage.src = '../assets/img/vs-computer/clones-win.gif';
      } else {
        winnerText.innerHTML = 'is a tie!';
        resultImage.src = '../assets/img/vs-computer/clones-tie.jpg';
      }
    break;
  };
}

function showWinContainer() {
  selection.classList.remove('active');
  showDown.classList.add('active');
}
