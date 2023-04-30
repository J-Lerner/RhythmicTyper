let sentStr = "" // Sentence that will be typed
let gameStarted = false;
let waiting = false;
let clickable = false; // Checks if user is allowed to type
let passNum = 0;
let i = 0;
let score = 0;
let open = false;
let tableLoaded = false;

// ~ Song Settings ~
let currentBeat = -1;
let data = document.cookie.beats;

// ~ Objects ~
const textInp = document.querySelector('#main-text-inp')
const copyText = document.querySelector('#copy-text');
const readyText = document.querySelector('#ready-text');
const songDisplay = document.querySelector('#song-display');
const path = document.querySelector('path');

const waveNormal = "M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
const waveHit = `M0,100 C150, 400 350,20 500,100 L500,00 L0,0 Z`;
const waveStart = `M0,20 C150, 600 210,20 500,150 L500,00 L0,0 Z`;

let tickSounds = [new Audio("tick.mp3"), new Audio("tick.mp3"), new Audio("tick.mp3")]
let curTick = 0;

copyText.innerHTML = sentStr;

function LoadTable() {
    tableLoaded = true;
    let songTable = document.querySelector('#song-list-table');
    
    console.log(data.length);
    for (let song = 0; song < data.length; song++) {
        console.log(song);
        let newRow = document.createElement("tr");

        let newCell = document.createElement("td");
        newCell.innerHTML = data[song].name + "<br>BPM: " + data[song].bpm + "<br>Difficulty: " + data[song].difficulty
        newCell.onclick = () => {
            currentBeat = song;
            console.log(songDisplay.children);
            songDisplay.children[0].innerHTML = data[currentBeat].songStr;
            songDisplay.children[2].innerHTML = data[currentBeat].name;
            songDisplay.children[4].innerHTML = data[currentBeat].bpm + " bpm";
        };

        newRow.appendChild(newCell);
        songTable.appendChild(newRow);
    }
}

window.onkeydown = (e) => {
    if (passNum == 1) {
        if (textInp == document.activeElement && clickable && e.key == sentStr.charAt(0)) {
            score++;
            clickable = false;
        } else {
            score--;
        }

        sentStr = sentStr.slice(1);
        if (sentStr.charAt(0) == " ") { // Checks if there is a space.
            copyText.style.left = "100px"; // Artificial space
        } else {
            copyText.style.left = "85px";
        }

    }
    copyText.innerHTML = sentStr;
    textInp.value = "";
}

function loop() {
    let songInfo = data[currentBeat];
    let quarterNote = 60000 / songInfo.bpm / 4;
    let beatStr = songInfo.songStr;

    if (i < beatStr.length) {
        if (waiting) {
            // Don't do anything
        } else if (beatStr[i] == ".") {
            tickSounds[curTick].play();
            clickable = true;

            path.setAttribute('d', waveHit); // Changes wave shape

            setTimeout(() => {
                clickable = false;
                path.setAttribute('d', waveNormal);
            }, 150);
            waiting = true;
            setTimeout(() => {
                waiting = false;
                i++;
                loop();
            }, quarterNote)
        } else if (beatStr[i] == "-") {
            waiting = true;
            setTimeout(() => { 
                waiting = false; 
                i++;
                loop();
            }, quarterNote);
        }
        curTick++;
        if (curTick >= tickSounds.length) 
            curTick = 0;
    }
    if (i >= beatStr.length) { // If song is over
        passNum += 1;
        i = 0;
        if (passNum == 1) {
            let x = 1; // Seconds/times it will count down for
            let readyInterval = setInterval(() => {
                if (x >= 5) {
                    readyText.style.display = "none";
                    clearInterval(readyInterval);
                    loop(); // Begins user's turn when loop is finished
                } else {
                      readyText.style.display = "block";
                    readyText.innerHTML = x;
                }
                x++;
            }, quarterNote * 4);
        } else if (passNum > 1) { // Game end
            closeBox();
            passNum = 0;
            i = 0;
            readyText.style.display = "block";
            readyText.innerHTML = score + " points!";
            readyText.style.fontSize = "30px";
        }
    }
}

function widenBox() { // Starts game
    if (!gameStarted && currentBeat != -1) {
        tickSounds[curTick].play()
        path.setAttribute('d', waveStart);
        readyText.style.fontSize = "50px";
        
        for (let i = 0; i < 100; i++) {
            sentStr += words[parseInt(Math.random() * 400)] + "_";
        }
        copyText.innerHTML = sentStr;

        setTimeout(() => {
            gameStarted = true;
            loop();
        }, 1000);
        setTimeout(() => {
            textInp.style.width = "85%";
            textInp.style.fontSize = "50px";
            copyText.style.display = "inline-block";
        }, 400);
        setTimeout(() => {
            path.setAttribute('d', waveNormal);
        }, 250)
        console.log(currentBeat);
        console.log(data[currentBeat].songStr);
    } else {
        alert("Choose a song in settings (top right)"); 
    }
}

function closeBox() {
    if (gameStarted) {
        gameStarted = false;

        textInp.style.width = "80px";
        textInp.style.fontSize = "30px";
        copyText.style.display = "none";
    }
}

function OpenSideBar() {
    let sideBar = document.querySelector('#side-bar');
    let openBar = document.querySelector('#bar-open');
    let openBarText = document.querySelector('#bar-open > a');

    if (open) {
        open = false;
        openBarText.innerHTML = "settings";
        openBar.style.background = "skyblue";
        sideBar.style.right = "-300px";
    } else if (!open) {
        open = true;
        openBarText.innerHTML = "chevron_right";
        openBar.style.background = "none";
        sideBar.style.right = "0";
    }
}

function ChangeModal(open) {
    let modal = document.querySelector('#modal');

    if (!open) {
        modal.style.display = "none";
    } else {
        modal.style.display = "block";
    }
}