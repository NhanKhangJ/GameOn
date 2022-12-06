const keys = document.querySelectorAll(".key"),
  note = document.querySelector(".nowplaying"),
  hints = document.querySelectorAll(".hints");

const playerOneScore = document.querySelector('#playerOne-score');
const playerTwoScore = document.querySelector('#playerTwo-score');
const displayM = document.querySelector('.display-m');
const startButton = document.querySelector('#startButton');
const displayStatus =document.querySelector('#current-player')
console.log(playerOneScore)
        



let playerOnePoint = 0;
let playerTwoPoint = 0;
let noteID =[65,87,83,69,68,70,84,71,89,72,85,74,75,79,76,80,186]


let designateNote = []
let playerSeries = [];

// console.log(noteID.length)
//create a function make a random number from 1 to 17; the result will be minus one(so it will be equal to the index); 


let round = 1;
let noteNumber = 4;



function randomNote(){
   for(let i = 1; i <= noteNumber; i++){
    let result = Math.floor(Math.random()*16);
        designateNote.push(noteID[result]);
   } ;
   console.log('get ready and listen carefully')
}


// 65,87,83,69,68,70,84,71,89,72,85,74,75,79,76,80,186

//player who play equal to true: player 1 , false: player2
let playerTurn = true ; // this default will be player one false when the play one is finish
//at default the value gonna be true as always, every time player finish they turn the value of this gonna set this to opposite 
//if player one turn the value equal too true and if player one is coreect he will got one point eles if not player will not have point and also naviturn the value of true equal to false, and player two will play;




function autoNote(){
    //play the note from the array automaticly
    let time =0
  for(let i = 0; i <designateNote.length; i++){
    time = i*1000 + 1000;
    setTimeout(()=>{
        const audio =  document.querySelector(`audio[data-key="${designateNote[i]}"]`),
        key =  document.querySelector(`.key[data-key="${designateNote[i]}"]`);
        key.classList.add("playing");
        // const keyNote =  key.getAttribute("data-note");
        // note.innerHTML = keyNote;
        audio.currentTime = 0;
        audio.play()
    }, i*1000 +1000)
  }
  setTimeout(countDownPlay, time)
}





let timeCount = 1000

function countDownPlay(){
    //manipulate the dom to appear the out put which is your time and your countdown time
    console.log('Your time left')  
    displayStatus.innerText = 'Your time left'
    let result = 10

    for(let i = 0; i <=10; i++){
        setTimeout(() =>{
            timeCount += i*1000;
            displayM.innerHTML = result--
            console.log(result);
        }, i*1000 +1000)
    }
    setTimeout(()=>{
        checkResult()
      playerTurn = !playerTurn;
      displayStatus.innerText ='';
      startButton.classList.remove('disapear')
      console.log(playerTurn)
    },11000)
}


function AutoNotePlayCountDown(){
    playerSeries=[];
    designateNote =[];
    randomNote()
    console.log(playerTurn ? 'Player one start in' : 'Player two start in');
    startButton.classList.add('disapear')
    playerTurn? displayStatus.innerText = 'Player one start in' : displayStatus.innerText = 'Player Two start in'

    let result = 3
    for(let i = 0; i <=3; i++){
        setTimeout(() =>{
            displayM.innerHTML = result--
            console.log(result);
        }, i*1000 +1000)
    }
    setTimeout(autoNote,4000);
}


// AutoNotePlayCountDown();


function checkResult(){
if(playerSeries.length>=designateNote.length){
    if(playerTurn){
        if(designateNote.length === playerSeries.length && designateNote.every((value, index) => value === playerSeries[index])){
            // setTimeout( () =>{
              
                    // playerTurn = !playerTurn
                    // // autoNote()
                    console.log(playerTurn)
                    playerOnePoint +=1
                    playerOneScore.innerText = playerOnePoint
                    console.log(playerOnePoint);
                    // playerSeries=[];
                    // designateNote =[];
                    displayM.innerText = "Press Go to start playing"
                    console.log(playerSeries);
                    
                    // AutoNotePlayCountDown()
               
            // },timeCount)
        } else{
            // setTimeout(()=>{
                console.log('player 1 wrong note');
                displayM.innerText = "Press Go to start playing"
                // playerTurn = !playerTurn;
                // playerSeries=[];
                // designateNote =[];
                // AutoNotePlayCountDown();
                // autoNote()
            // },timeCount)
        }
      } else if(!playerTurn){
        if(designateNote.length === playerSeries.length && designateNote.every((value, index) => value === playerSeries[index])){
            // // setTimeout(async () =>{
            //     try {
                    // playerTurn = !playerTurn
                    console.log(playerTurn);
                    // autoNote()
                    playerTwoPoint +=1
                    playerTwoScore.innerText = playerTwoPoint;
                    displayM.innerText = "Press Go to start playing"
                    console.log(playerTwoPoint);
                    // playerSeries=[];
                    // designateNote =[];
                    console.log(playerSeries)
                    // AutoNotePlayCountDown();
                // } catch (error) {
                    // console.log(error.message)
                // }
            // },timeCount)
        } else{
            // setTimeout(()=>{
                console.log('player 2 wrong note');
                displayM.innerText = "Press Go to start playing"
                // playerTurn = !playerTurn;
                // playerSeries=[];
                // designateNote =[];
                // AutoNotePlayCountDown();
                // autoNote()
            // },timeCount)
        }
      } 
  }else{
    console.log('not enough note')
    displayM.innerText = "Press Go to start playing"
  }
}

startButton.addEventListener('click', AutoNotePlayCountDown)

function playNote(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`),
    key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  playerSeries.push(e.keyCode)
  if (!key) return;
//   const keyNote = key.getAttribute("data-note");
  key.classList.add("playing");
//   note.innerHTML = keyNote;
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


