# Snake Game Web App

An immersive snake game with stunning visual effects and sound design. This classic game has been enhanced with modern UI elements, animations, and audio feedback for a more engaging experience.

## Features

- 🎮 Classic snake gameplay with modern twists
- 🔊 Immersive sound effects for eating, movement, and game over
- 🌈 Beautiful visual effects including glowing elements and particle animations
- 📱 Responsive design that works on desktop and mobile devices
- ⚡ Increasing difficulty as your score gets higher
- 🏆 High score tracking using local storage
- 🎵 Background music with play/pause functionality

## How to Play

1. Click "Start Game" to begin
2. Use arrow keys or WASD to control the snake's direction
3. Eat the red apples to grow longer and increase your score
4. Avoid hitting the walls or yourself
5. Press SPACE to pause/resume the game

## Controls

- **Arrow Keys** or **WASD** - Change snake direction
- **Spacebar** - Pause/Resume game
- **Start Game** button - Begin the game
- **Pause** button - Pause the game
- **Reset** button - Reset the game state
- **Play Again** button - Start a new game after game over

## Running the Game

To run this game locally:

1. Clone or download this repository
2. Open `index.html` in your web browser (no server needed for basic functionality)
3. Or use the provided script:
   ```bash
   chmod +x run.sh
   ./run.sh
   ```
   
The game will be accessible at http://localhost:8080

## Changes Made

- **Higher Contrast Grid**: The grid background now has higher contrast for better visibility
- **Slower Snake Movement**: The snake moves at a more manageable pace for better gameplay

## Technical Details

### Visual Effects
- Glowing snake segments and food items
- Animated background gradient
- Particle effects in the game area
- Smooth animations for all game elements
- Responsive design for all screen sizes

### Sound Design
- Eat sound effect when collecting food
- Game over sound when collision occurs
- Movement sound with each snake step
- Background music that loops during gameplay

## File Structure

```
snake-game-webapp/
├── index.html          # Main HTML structure
├── style.css           # Styling and visual effects
├── script.js           # Game logic and sound handling
├── README.md           # Project documentation
├── PROJECT_INFO.md     # Project information
└── run.sh              # Deployment script
```

## Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled

## Development

This project was built with:
- HTML5 Canvas for rendering
- CSS3 animations and gradients
- JavaScript ES6+ for game logic
- Web Audio API for sound effects

## Future Enhancements

- Multiplayer mode
- Power-ups and special items
- Different game themes
- Scoreboard with local storage
- Mobile touch controls
- Difficulty selection

## License

This project is open source and available under the MIT License.

## Author

HIVE-Testing

Enjoy the game! 🎮