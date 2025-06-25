// Variables to control game state
let gameRunning = false; // Keeps track of whether game is active or not
let dropMaker; // Will store our timer that creates drops regularly
let timerInterval; // Timer interval variable
let timeLeft = 30; // Countdown time in seconds
let score = 0; // Track the player's score

// Wait for button click to start the game
document.getElementById("start-btn").addEventListener("click", startGame);

function startGame() {
  // Prevent multiple games from running at once
  if (gameRunning) return;

  gameRunning = true;
  timeLeft = 30; // Reset timer to 30 seconds
  score = 0; // Reset score
  document.getElementById("time").textContent = timeLeft;
  document.getElementById("score").textContent = score;

  // Start countdown timer
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("time").textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      clearInterval(dropMaker);
      gameRunning = false;
      // Optionally, show game over or reset UI here
    }
  }, 1000);

  // Create new drops every second (1000 milliseconds)
  dropMaker = setInterval(createDrop, 1000);
}

function createDrop() {
  // Create a new div element that will be our water drop
  const drop = document.createElement("div");
  drop.className = "water-drop";

  // Make drops different sizes for visual variety
  const initialSize = 60;
  const sizeMultiplier = Math.random() * 0.8 + 0.5;
  const size = initialSize * sizeMultiplier;
  drop.style.width = drop.style.height = `${size}px`;

  // Position the drop randomly across the game width
  // Subtract 60 pixels to keep drops fully inside the container
  const gameWidth = document.getElementById("game-container").offsetWidth;
  const xPosition = Math.random() * (gameWidth - 60);
  drop.style.left = xPosition + "px";

  // Make drops fall for 4 seconds
  drop.style.animationDuration = "4s";

  // Add the new drop to the game screen
  document.getElementById("game-container").appendChild(drop);

  // Increase score when drop is clicked
  drop.addEventListener("click", () => {
    score++;
    document.getElementById("score").textContent = score;
    drop.remove();
  });

  // Remove drops that reach the bottom (weren't clicked)
  drop.addEventListener("animationend", () => {
    drop.remove(); // Clean up drops that weren't caught
  });
}

// Confetti celebration overlay
function showConfetti() {
    if (document.getElementById('confetti-overlay')) return;
    const overlay = document.createElement('div');
    overlay.id = 'confetti-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.fontSize = '5rem';
    overlay.style.zIndex = 1000;
    overlay.style.pointerEvents = 'none';
    overlay.innerText = '🎉🎊🎉';
    document.body.appendChild(overlay);
    setTimeout(() => {
        overlay.remove();
    }, 2000);
}

// Patch score update logic to trigger confetti at 25
const scoreSpan = document.getElementById('score');
let lastScore = 0;
const observer = new MutationObserver(() => {
    const score = parseInt(scoreSpan.textContent, 10);
    if (score === 25 && lastScore < 25) {
        showConfetti();
    }
    lastScore = score;
});
observer.observe(scoreSpan, { childList: true });
