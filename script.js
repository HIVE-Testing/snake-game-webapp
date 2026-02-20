// Game variables
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const finalScoreDisplay = document.getElementById('final-score');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const restartBtn = document.getElementById('restart-btn');
const gameOverScreen = document.getElementById('game-over');

// Sound effects
const eatSound = document.getElementById('eat-sound');
const gameOverSound = document.getElementById('game-over-sound');
const moveSound = document.getElementById('move-sound');
const backgroundMusic = document.getElementById('background-music');

// Game state
let snake = [];
let food = {};
let direction = 'right';
let nextDirection = 'right';
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameSpeed = 120;
let gameRunning = false;
let gameLoop;

// Initialize game
function initGame() {
    // Set up snake
    snake = [
        {x: 5, y: 10},
        {x: 4, y: 10},
        {x: 3, y: 10}
    ];
    
    // Generate first food
    generateFood();
    
    // Reset game state
    direction = 'right';
    nextDirection = 'right';
    score = 0;
    scoreDisplay.textContent = score;
    highScoreDisplay.textContent = highScore;
    
    // Hide game over screen
    gameOverScreen.style.display = 'none';
}

// Generate food at random position
function generateFood() {
    const gridSize = 20;
    const maxX = Math.floor(canvas.width / gridSize) - 1;
    const maxY = Math.floor(canvas.height / gridSize) - 1;
    
    food = {
        x: Math.floor(Math.random() * maxX),
        y: Math.floor(Math.random() * maxY)
    };
    
    // Make sure food doesn't appear on snake
    for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
            return generateFood();
        }
    }
}

// Draw game elements
function draw() {
    // Clear canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid background
    drawGrid();
    
    // Draw snake
    snake.forEach((segment, index) => {
        if (index === 0) {
            // Draw head with different color
            ctx.fillStyle = '#4CAF50';
        } else {
            // Draw body with gradient
            const gradient = ctx.createLinearGradient(
                segment.x * 20, 
                segment.y * 20, 
                segment.x * 20 + 20, 
                segment.y * 20 + 20
            );
            gradient.addColorStop(0, '#8BC34A');
            gradient.addColorStop(1, '#4CAF50');
            ctx.fillStyle = gradient;
        }
        
        // Draw rounded segments
        ctx.beginPath();
        ctx.roundRect(segment.x * 20, segment.y * 20, 20, 20, 5);
        ctx.fill();
        
        // Add glow effect
        ctx.shadowColor = '#4CAF50';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
    });
    
    // Draw food (apple)
    ctx.fillStyle = '#FF5252';
    ctx.beginPath();
    ctx.arc(
        food.x * 20 + 10, 
        food.y * 20 + 10, 
        8, 
        0, 
        Math.PI * 2
    );
    ctx.fill();
    
    // Add glow to food
    ctx.shadowColor = '#FF5252';
    ctx.shadowBlur = 15;
    ctx.fill();
    ctx.shadowBlur = 0;
    
    // Draw stem on apple
    ctx.fillStyle = '#795548';
    ctx.fillRect(food.x * 20 + 9, food.y * 20 + 2, 2, 4);
}

// Draw grid background
function drawGrid() {
    const gridSize = 20;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 0.5;
    
    // Vertical lines
    for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

// Move snake
function moveSnake() {
    // Update direction
    direction = nextDirection;
    
    // Create new head based on direction
    const head = {x: snake[0].x, y: snake[0].y};
    
    switch(direction) {
        case 'up':
            head.y -= 1;
            break;
        case 'down':
            head.y += 1;
            break;
        case 'left':
            head.x -= 1;
            break;
        case 'right':
            head.x += 1;
            break;
    }
    
    // Check collision with walls
    if (head.x < 0 || head.x >= canvas.width / 20 || 
        head.y < 0 || head.y >= canvas.height / 20) {
        gameOver();
        return;
    }
    
    // Check collision with self
    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            gameOver();
            return;
        }
    }
    
    // Add new head to snake
    snake.unshift(head);
    
    // Check if food is eaten
    if (head.x === food.x && head.y === food.y) {
        // Play eat sound
        playSound(eatSound);
        
        // Increase score
        score += 10;
        scoreDisplay.textContent = score;
        
        // Generate new food
        generateFood();
        
        // Increase speed slightly
        if (gameSpeed > 60) {
            gameSpeed -= 2;
        }
    } else {
        // Remove tail if no food eaten
        snake.pop();
    }
    
    // Play move sound
    playSound(moveSound);
}

// Game loop
function gameUpdate() {
    if (!gameRunning) return;
    
    moveSnake();
    draw();
    
    // Schedule next frame
    setTimeout(() => {
        if (gameRunning) {
            gameUpdate();
        }
    }, gameSpeed);
}

// Start game
function startGame() {
    if (gameRunning) return;
    
    gameRunning = true;
    startBtn.textContent = "Resume";
    playSound(backgroundMusic, true);
    gameUpdate();
}

// Pause game
function pauseGame() {
    gameRunning = false;
    playSound(backgroundMusic, false);
    startBtn.textContent = "Resume";
}

// Reset game
function resetGame() {
    gameRunning = false;
    clearInterval(gameLoop);
    initGame();
    draw();
    playSound(backgroundMusic, false);
    startBtn.textContent = "Start Game";
}

// Game over
function gameOver() {
    gameRunning = false;
    playSound(gameOverSound);
    playSound(backgroundMusic, false);
    
    // Update high score
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        highScoreDisplay.textContent = highScore;
    }
    
    // Show game over screen
    finalScoreDisplay.textContent = score;
    gameOverScreen.style.display = 'block';
}

// Play sound with optional looping
function playSound(sound, loop = false) {
    try {
        sound.currentTime = 0;
        sound.loop = loop;
        sound.play().catch(e => console.log("Audio play error:", e));
    } catch (e) {
        console.log("Error playing sound:", e);
    }
}

// Handle keyboard input
function handleKeydown(e) {
    switch(e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            if (direction !== 'down') nextDirection = 'up';
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            if (direction !== 'up') nextDirection = 'down';
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            if (direction !== 'right') nextDirection = 'left';
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            if (direction !== 'left') nextDirection = 'right';
            break;
        case ' ':
            if (gameRunning) {
                pauseGame();
            } else {
                startGame();
            }
            break;
    }
}

// Event listeners
startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', pauseGame);
resetBtn.addEventListener('click', resetGame);
restartBtn.addEventListener('click', () => {
    resetGame();
    startGame();
});

document.addEventListener('keydown', handleKeydown);

// Initialize and draw the game
initGame();
draw();

// Add visual effects to the canvas
function addVisualEffects() {
    // Create a subtle particle effect
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            color: `rgba(0, 255, 255, ${Math.random() * 0.5 + 0.1})`
        });
    }
    
    function animateParticles() {
        if (!gameRunning) return;
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

// Start visual effects
addVisualEffects();