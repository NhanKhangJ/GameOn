const keys = document.querySelectorAll(".key"),
  note = document.querySelector(".nowplaying"),
  hints = document.querySelectorAll(".hints");

const playerOneScore = document.querySelector('#playerOne-score');
const playerTwoScore = document.querySelector('#playerTwo-score');
const displayM = document.querySelector('.display-m');
const startButton = document.querySelector('#startButton');
const displayStatus =document.querySelector('#current-player');
const displayRound =document.querySelector('#display-round')

console.log(playerOneScore)
        
let playerOnePoint = 0;
let playerTwoPoint = 0;
let noteID =[65,87,83,69,68,70,84,71,89,72,85,74,75,79,76,80,186]

let designateNote = []
let playerSeries = [];

let roundStatus = 1;
let round = 1;

let noteStatus = 4;
let noteNumber = 4;

function randomNote(){
   for(let i = 1; i <= noteNumber; i++){
    let result = Math.floor(Math.random()*16);
        designateNote.push(noteID[result]);
   } ;
}

let playerTurn = true ; 

function autoNote(){
    let time =0
  for(let i = 0; i <designateNote.length; i++){
    time = i*1000 + 1000;
    setTimeout(()=>{
        const audio =  document.querySelector(`audio[data-key="${designateNote[i]}"]`),
        key =  document.querySelector(`.key[data-key="${designateNote[i]}"]`);
        key.classList.add("playing");
            audio.currentTime = 0;
        audio.play()
    }, i*1000 +1000)
  }
  setTimeout(countDownPlay, time)
}

function countDownPlay(){
    displayStatus.innerText = 'Your time left'
    let result = 10
    for(let i = 0; i <=10; i++){
        setTimeout(() =>{
            displayM.innerText = result--;
        }, i*1000 +1000)
    }
    setTimeout(()=>{
      checkResult()
      playerTurn = !playerTurn;
      roundStatus += 0.5;
      round = Math.floor(roundStatus);
      noteStatus += 0.5;
      noteNumber = Math.floor(noteStatus);
      if(roundStatus === 4){
        if(playerOnePoint > playerTwoPoint){
            alert('Player one win');
            window.location.reload();
        } else if (playerOnePoint < playerTwoPoint){
            alert('Player two win');
            window.location.reload();
        } else {
            alert('What a competiton, the score is ties');
            window.location.reload();
        }
    }
      displayRound.innerText = `Round ${round} and ${playerTurn?'player 1 turn':'player 2 turn'}`
      displayStatus.innerText ='';
      startButton.classList.remove('disapear')
    },11000)
}


function AutoNotePlayCountDown(){
    playerSeries=[];
    designateNote =[];
    randomNote()
    displayRound.innerText = `Round ${round} and ${playerTurn?'player 1 turn':'player 2 turn'}`;
    displayM.innerText =''
    startButton.classList.add('disapear')
    playerTurn? displayStatus.innerText = 'Player one start in' : displayStatus.innerText = 'Player Two start in'
    let result = 3
    for(let i = 0; i <=3; i++){
        setTimeout(() =>{
            displayM.innerHTML =  result===0 ? 'Listen carefully' : result--
        }, i*1000 +1000)
    }
    setTimeout(autoNote,4000);
}

function checkResult(){
if(playerSeries.length>=designateNote.length){
    if(playerTurn){
        if(designateNote.length === playerSeries.length && designateNote.every((value, index) => value === playerSeries[index])){
                    playerOnePoint +=1
                    playerOneScore.innerText = playerOnePoint
                    displayM.innerText = "Press Go to start playing"
                    alert('Player 1 got one point')
        } else{
                alert('player 1 wrong note')
                displayM.innerText = "Press Go to start playing"
        }
      } else if(!playerTurn){
        if(designateNote.length === playerSeries.length && designateNote.every((value, index) => value === playerSeries[index])){
                    playerTwoPoint +=1
                    playerTwoScore.innerText = playerTwoPoint;
                    displayM.innerText = "Press Go to start playing"
                    alert('Player 2 got one point')
        } else{
                alert('player 2 wrong note')
                displayM.innerText = "Press Go to start playing"
        }
      } 
  }else{
    displayM.innerText = "Press Go to start playing"
  }
}

startButton.addEventListener('click', AutoNotePlayCountDown)

function playNote(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`),
    key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  playerSeries.push(e.keyCode)
  if (!key) return;
  key.classList.add("playing");
  audio.currentTime = 0;
  audio.play();
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

function hintsOn(e, index) {
  e.setAttribute("style", "transition-delay:" + index * 50 + "ms");
}

hints.forEach(hintsOn);

keys.forEach(key => key.addEventListener("transitionend", removeTransition));

window.addEventListener("keydown", playNote);


