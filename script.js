var timer = 6;
var score = 0;
var hitrn = 0;
var bubblesCount = 180;
var startTime = 60;

function getnewscore() {
    score += 10;
}

function getnewhit() {
    hitrn = Math.floor(Math.random() * 10);
    document.querySelector("#hitvalue").textContent = hitrn;
}

function makebubble() {
    var clutter = "";
    for (var i = 1; i <= bubblesCount; i++) {
        var rn = Math.floor(Math.random() * 10);
        clutter += `<div class="bubble">${rn}</div>`;
    }
    document.querySelector("#pbtm").innerHTML = clutter;
}

function runtimer() {
    var timerinterval = setInterval(function () {
        if (timer > 0) {
            timer--;
            document.querySelector("#timervalue").textContent = timer;
        } else {
            clearInterval(timerinterval);
            updateHighScore(score);
            document.querySelector("#pbtm").innerHTML = `
                <center>
                    <h1>Time's up!</h1>
                    <br>
                    <div id="finalscore">Your final score is: ${score}</div>
                    <br>
                    <button id="tryAgainBtn" style="padding:0.7em 2em;font-size:1.1rem;border:none;border-radius:8px;background:#699965;color:#fff;cursor:pointer;transition:background 0.2s;">Try Again</button>
                </center>
            `;
            
            document.getElementById("tryAgainBtn").addEventListener("click", function () {
                timer = startTime;
                score = 0;
                document.querySelector("#scorevalue").textContent = score;
                document.querySelector("#timervalue").textContent = timer;
                runtimer();
                makebubble();
                getnewhit();
            });
        }
    }, 1000);
}

// Initialize high score from localStorage
let highScore = localStorage.getItem("bubbleHighScore") || 0;
document.querySelector("#highscorevalue").textContent = highScore;

// Update high score if needed
function updateHighScore(newScore) {
    if (newScore > highScore) {
        highScore = newScore;
        localStorage.setItem("bubbleHighScore", highScore);
        document.querySelector("#highscorevalue").textContent = highScore;
    }
}

document.querySelector("#pbtm")
    .addEventListener("click", function (dets) {
        var clickedbubble = Number(dets.target.textContent);
        if (clickedbubble === hitrn) {
            getnewscore();
            document.querySelector("#scorevalue").textContent = score;
            makebubble();
            getnewhit();
        }
        else {
            alert("Wrong bubble clicked!");
        }
    });


document.addEventListener("DOMContentLoaded", function () {
    var landing = document.getElementById("landing");
    var main = document.getElementById("main");
    var playBtn = document.getElementById("playBtn");
    if (playBtn) {
        playBtn.addEventListener("click", function () {
            landing.classList.add("hidden");
            main.classList.remove("hidden");
            // You can also start your game logic here if needed
            timer = startTime;
            score = 0;
            document.querySelector("#scorevalue").textContent = score;
            document.querySelector("#timervalue").textContent = timer;
            runtimer();
            makebubble();
            getnewhit();
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    var themeToggle = document.getElementById("themeToggle");
    var body = document.body;
    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            body.classList.toggle("dark");
            if (body.classList.contains("dark")) {
                themeToggle.textContent = "Switch to Light Theme";
            } else {
                themeToggle.textContent = "Switch to Dark Theme";
            }
        });
    }
});

window.addEventListener("load", function () {
    var loader = document.getElementById("pageloader");
    if (loader) {
        loader.classList.add("hide");
        setTimeout(function () {
            loader.style.display = "none";
        }, 700); // matches the CSS transition
    }
});
