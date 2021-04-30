// Selecting
const player0BtnEl = document.querySelector('.player--0btn');
const player1BtnEl = document.querySelector('.player--1btn');
const picture0El = document.querySelector('.picture0');
const picture1El = document.querySelector('.picture1');
const scoreP0El = document.querySelector('.scoreP0');
const scoreP1El = document.querySelector('.scoreP1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const resetBtnEl = document.querySelector('.resetBtn');
const winTextEl = document.querySelector('.wintext');
const settingsBtnEl = document.querySelector('.settingsBtn');
const overlayEl = document.querySelector('.overlay');
const settingsEl = document.querySelector('.settings');
const needToWinEl = document.querySelector('#needtowin');
const player0NameInputEl = document.querySelector('#player0name');
const player1NameInputEl = document.querySelector('#player1name');
const settingsModalBtnEl = document.querySelector('.settingsmodalbtn');
const player0NameDisplay = document.querySelector('.player0namedisplay');
const player1NameDisplay = document.querySelector('.player1namedisplay');
const closeEl = document.querySelector('.close');
//Storing
const items = ['stone', 'scissors', 'paper'];
let scores, playerItem;
let needToWin = 5;
let player0Name = 'Player 1';
let player1Name = 'Player 2';
const playerWin = function (player) {
  scores[`${player}`] += 1;
  winTextEl.textContent =
    player === 0 ? `${player0Name} nyerte a kört` : `${player1Name} nyerte a kört`;
  if (player === 0) {
    scoreP0El.textContent = scores[`${player}`];
  } else if (player === 1) {
    scoreP1El.textContent = scores[`${player}`];
  }
  //Finish the game
  if (scores[0] === needToWin || scores[1] === needToWin) {
    if (scores[0] === needToWin) {
      player0El.classList.add('winner');
    } else if (scores[1] === needToWin) {
      player1El.classList.add('winner');
    }
    player0BtnEl.disabled = true;
    player1BtnEl.disabled = true;
    winTextEl.textContent =
      scores[0] === needToWin
        ? `${player0Name} nyerte a mérkőzést`
        : `${player1Name} nyerte a mérkőzést`;
  }
};
const closeSettings = function () {
  overlayEl.classList.add('hidden');
  settingsEl.classList.add('displaynone');
};
const init = function () {
  player0BtnEl.disabled = false;
  player1BtnEl.disabled = true;
  scoreP0El.textContent = 0;
  scoreP1El.textContent = 0;
  picture0El.classList.add('hidden');
  picture1El.classList.add('hidden');
  player0El.classList.remove('winner');
  player1El.classList.remove('winner');
  player0El.classList.add('player-active');
  player1El.classList.remove('player-active');
  winTextEl.textContent = '';
  scores = [0, 0];
  playerItem = [];
};
init();
const generate = function (player) {
  //Generate random item
  playerItem[`${player}`] = items[Math.trunc(Math.random() * items.length)];
  //Display random item
  if (player === 0) {
    picture0El.src = `${playerItem[`${player}`]}.png`;
    picture0El.classList.remove('hidden');
    player0BtnEl.disabled = true;
    player1BtnEl.disabled = false;
  } else if (player === 1) {
    picture1El.src = `${playerItem[`${player}`]}.png`;
    picture1El.classList.remove('hidden');
    player1BtnEl.disabled = true;
    player0BtnEl.disabled = false;
  }
  //Switch player
  player0El.classList.toggle('player-active');
  player1El.classList.toggle('player-active');
};
//Player1
player0BtnEl.addEventListener('click', function () {
  generate(0);
});
//Player2
player1BtnEl.addEventListener('click', function () {
  generate(1);
  //Handle button

  //Game logic
  //Draw
  if (playerItem[0] === playerItem[1]) {
    scores[0] += 0;
    scores[1] += 0;
    scoreP0El.textContent = scores[0];
    scoreP1El.textContent = scores[1];
    winTextEl.textContent = 'Döntetlen';
    //Player0 Win
  } else if (playerItem[0] === 'stone' && playerItem[1] === 'scissors') {
    playerWin(0);
  } else if (playerItem[0] === 'paper' && playerItem[1] === 'stone') {
    playerWin(0);
  } else if (playerItem[0] === 'scissors' && playerItem[1] === 'paper') {
    playerWin(0);
    //Player1 Win
  } else if (playerItem[0] === 'scissors' && playerItem[1] === 'stone') {
    playerWin(1);
  } else if (playerItem[0] === 'stone' && playerItem[1] === 'paper') {
    playerWin(1);
  } else if (playerItem[0] === 'paper' && playerItem[1] === 'scissors') {
    playerWin(1);
  }
});
resetBtnEl.addEventListener('click', init);
settingsBtnEl.addEventListener('click', function () {
  //Show settings modal
  overlayEl.classList.remove('hidden');
  settingsEl.classList.remove('displaynone');
});
settingsModalBtnEl.addEventListener('click', function () {
  // Set need to win
  needToWin = Number(needToWinEl.value);
  if (!needToWin) {
    needToWin = 5;
  }
  //Set Player 0 name
  player0Name = player0NameInputEl.value;
  if (!player0Name) {
    player0Name = 'PP1';
  }
  player0NameDisplay.textContent = player0Name;
  //Set Player 1 name
  player1Name = player1NameInputEl.value;
  if (!player1Name) {
    player1Name = 'PP2';
  }
  player1NameDisplay.textContent = player1Name;

  //Close settings
  closeSettings();
});
closeEl.addEventListener('click', closeSettings);
overlayEl.addEventListener('click', closeSettings);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeSettings();
  }
});
