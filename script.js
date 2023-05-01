let sentStr = "" // Sentence that will be typed
let gameStarted = false;
let waiting = false;
let clickable = false; // Checks if user is allowed to type
let passNum = 0;
let i = 0;
let score = 0;
let open = false;
let isTextCustom = false;
let customTextStr = "";

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

let tickSounds = [new Audio("tick.mp3"), new Audio("tick.mp3"), new Audio("tick.mp3"), new Audio("tick.mp3"), new Audio("tick.mp3"), new Audio("tick.mp3"), new Audio("tick.mp3"), new Audio("tick.mp3"), new Audio("tick.mp3"), new Audio("tick.mp3"), new Audio("tick.mp3"), new Audio("tick.mp3"), new Audio("tick.mp3"), new Audio("tick.mp3"), new Audio("tick.mp3"), new Audio("tick.mp3"), new Audio("tick.mp3"), new Audio("tick.mp3"), new Audio("tick.mp3"), new Audio("tick.mp3")]
let curTick = 0;

copyText.innerHTML = sentStr;

window.onload = () => { // Checks if user is using a mobile device
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    if (check) 
        window.location.href("/mobile/index.html");
    console.log(check);
};

function LoadTable() {
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
            songDisplay.children[0].innerHTML = data[currentBeat].name;
            songDisplay.children[2].innerHTML = data[currentBeat].bpm + " bpm";
            songDisplay.children[4].innerHTML = data[currentBeat].songStr;
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
            copyText.style.left = "-465px"; // Artificial space
        } else {
            copyText.style.left = "-475px";
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
            readyText.innerHTML = "You got " + score + " points!";
        }
    }
}

function widenBox() {
    if (!gameStarted && currentBeat != -1) {
        tickSounds[curTick].play()
        path.setAttribute('d', waveStart);
        
        let newStr = "";

        for (let i = 0; i < 100; i++) {
            newStr += words[parseInt(Math.random() * 400)] + "_";
        }

        if (isTextCustom) {
            let customTextElem = document.querySelector('#custom-text');
            sentStr = customTextElem.value;
        } else {
            sentStr = newStr;
        }

        copyText.innerHTML = sentStr;

        setTimeout(() => {
            gameStarted = true;
            loop();
        }, 1000);
        setTimeout(() => {
            textInp.style.width = "500px";
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

function ChangeCustomText(elem) {
    isTextCustom = !isTextCustom;
    if (isTextCustom) {
        elem.innerHTML = "On";
    } else {
        elem.innerHTML = "Off";
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