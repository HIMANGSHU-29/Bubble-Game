var timer = 60;
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
    var pbtm = document.querySelector("#pbtm");
    var width = pbtm.offsetWidth;
    var height = pbtm.offsetHeight;

    // dynamically calculate bubbles to prevent top/bottom spilling
    var isMobile = window.innerWidth <= 768;
    var bubbleSize = isMobile ? 48 : 65; // bubble width/height + gap

    var bubblesPerRow = Math.floor(width / bubbleSize);
    var rows = Math.floor(height / bubbleSize);
    var computedCount = (bubblesPerRow * rows) || bubblesCount;

    for (var i = 1; i <= computedCount; i++) {
        var rn = Math.floor(Math.random() * 10);
        // Staggered animation delay for beautiful loading
        var delay = Math.floor(Math.random() * 20);
        clutter += `<div class="bubble" style="--i: ${delay}">${rn}</div>`;
    }
    pbtm.innerHTML = clutter;
}

function runtimer() {
    var timerinterval = setInterval(function () {
        if (timer > 0) {
            timer--;
            var timerEl = document.querySelector("#timervalue");
            timerEl.textContent = timer;

            if (timer <= 10 && timer > 0) {
                timerEl.style.color = "#ef4444"; // Highlight red when time is low
            } else {
                timerEl.style.color = "";
            }
        } else {
            clearInterval(timerinterval);
            updateHighScore(score);
            document.querySelector("#pbtm").innerHTML = `
                <div class="game-over-screen">
                    <h1 class="bounce-in">Time's up!</h1>
                    <div id="finalscore" class="fade-in">Your final score is: <span class="highlight">${score}</span></div>
                    <button id="tryAgainBtn" class="btn btn-primary pop-in">Play Again</button>
                </div>
            `;

            document.getElementById("tryAgainBtn").addEventListener("click", function () {
                timer = startTime;
                score = 0;
                document.querySelector("#scorevalue").textContent = score;
                var timerEl = document.querySelector("#timervalue");
                timerEl.textContent = timer;
                timerEl.style.color = "";
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

document.querySelector("#pbtm").addEventListener("click", function (dets) {
    if (dets.target.classList.contains('bubble')) {
        var clickedbubble = Number(dets.target.textContent);
        if (clickedbubble === hitrn) {
            getnewscore();
            document.querySelector("#scorevalue").textContent = score;
            makebubble();
            getnewhit();
        }
        else {
            // Instead of an annoying alert, use a CSS shake animation to give nice feedback
            dets.target.classList.add("wrong-click");
            dets.target.addEventListener('animationend', () => {
                dets.target.classList.remove("wrong-click");
            });
        }
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

    // Check local storage for theme preference to remember it
    if (localStorage.getItem('bubbleTheme') === 'dark') {
        body.classList.add('dark');
        updateThemeButton(true);
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            body.classList.toggle("dark");
            const isDark = body.classList.contains("dark");

            localStorage.setItem('bubbleTheme', isDark ? 'dark' : 'light');
            updateThemeButton(isDark);
        });
    }

    function updateThemeButton(isDark) {
        const icon = isDark
            ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
            : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

        if (themeToggle) {
            themeToggle.innerHTML = `${icon} <span>${isDark ? 'Light Theme' : 'Dark Theme'}</span>`;
        }
    }
});

window.addEventListener("load", function () {
    var loader = document.getElementById("pageloader");
    if (loader) {
        loader.classList.add("hide");
        setTimeout(function () {
            loader.style.display = "none";
        }, 700);
    }
});
