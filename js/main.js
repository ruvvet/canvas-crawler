// displays x-y-coordinates
const movementDisplay = document.querySelector('#movement');
// the game canvas
const game = (display = document.querySelector('#game'));

// ctx canvas element thinks it is 180x300 (default),
// items are stretched to fit dom element
// set hxw of game element on dom with getcomputed style

//getcomputed style >>> returns object with all css values
// set attribute of game to "height"
const computedStyle = getComputedStyle(game);

//get height/width key from the css object
const height = computedStyle.height;
const width = computedStyle.width;
//set dom attribute  - DOM
game.height = parseInt(height);
game.width = parseInt(width);

// game.setAttribute("height", getComputedStyle(game)["height"])
// game.setAttribute("width", getComputedStyle(game)["width"])

// once the size is scaled correctly, set other styling

// set Context
const ctx = game.getContext('2d');

let hero;
let ogre;

// DONT USE THIS -

// // fill color - DOM
// ctx.fillStyle = 'white';
// // Line Color - DOM
// ctx.strokeStyle = 'red';
// // Line width - DOM
// ctx.lineWidth = 5;

// //x-coordinate of ...from 10 >>>1 00
// //y-coordinate.. start from px 10>>>100
// ctx.fillRect(10, 10, 100, 100);

// ctx.strokeRect(10, 10, 100, 100);

// create a function that takes in 4 parameters
// // x-coordinate, y-coordinate, size = height and width (Square), color
// function drawBox(x, y, size, color){
//     ctx.fillStyle = color;
//     ctx.fillRect(x, y, size, size);
//   }

//   //drawBox (200, 200, 50, 'pink');

// //BUT MAKING A CONSTRUCTOR/CLASS IS BETTER...

//   game.addEventListener("click", function(e) {
//     drawBox(e.offsetX, e.offsetY, 50, 'green');
//   });

class Crawler {
  constructor(x, y, color, width, height) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
    this.alive = true;
  }
  // fucntions in a class = METHODS ON THE CLASS
  render() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

//   // x-,y-, color, width, height
// let hero = new Crawler(0, 0, '#FFFFFF', 20, 20);
// let ogre = new Crawler(10, 10, '#000FFF', 40, 80);

// document.getElementById('btm-right').addEventListener("click", function(){
//     hero.render();
//     ogre.render();

// });

// DONT USE THIS
// // on click, pass the clickpoitn and get
// // clear canvas, at click point e, use those as the x,y offset coordinates

//   game.addEventListener("click", function(e) {
//     ctx.clearRect(0, 0, game.width, game.height)
//     hero.x = e.offsetX
//     hero.y = e.offsetY
//     hero.render()
//   });




function detectHit() {
    if (hero.x < ogre.x + ogre.width
      && hero.x + hero.width > ogre.width
      && hero.y < ogre.y + ogre.height
      && hero.y + hero.height > ogre.y) {
          console.log('hit');
      //ogre.alive = false;
    }

  }


function gameLoop() {
  // Clear the Canvas
  ctx.clearRect(0, 0, game.width, game.height);
  //Display the X and Y coordinates of our hero
  movementDisplay.textContent = `X: ${hero.x} Y: ${hero.y}`;
  // Check of the ogre is alive
  if (ogre.alive) {
    if (ogre.alive){
        ogre.render();
    }
    detectHit();
  }
  hero.render();
}

// pass in key to the function
function movementHandler(e) {
  // get e.keycode = key number
  // if (e.key === 'ArrowUp') {
  //     // ...my hero should move up
  //     hero.y -= 1
  //   }
  // if (e.key === 'ArrowLeft'){
  //     hero.x -=1
  // }
  // if (e.key === 'ArrowDown'){
  //     hero.y +=1
  // }
  // if (e.key === 'ArrowRight'){
  //     hero.x +=1
  // }

  // // up (w:87): y-=1; left (a:65): x-=1; down (s:83): y+=1; right (d:68): x+=1
  switch (e.key) {
    case 'ArrowUp':
    case 'w':
      hero.y -= 10;
      break;
    case 'ArrowLeft':
    case 'a':
      hero.x -= 10;
      break;
    case 'ArrowDown':
    case 's':
      hero.y += 10;
      break;
    case 'ArrowRight':
    case 'd':
      hero.x += 10;
      break;
  }
}



document.addEventListener('keyup', function (e) {
  console.log(e.key);
});

// wait until dom has loaded, then set var to classes
document.addEventListener('DOMContentLoaded', function () {
  hero = new Crawler(100, 200, 'hotpink', 40, 40);
  ogre = new Crawler(500, 150, '#BADA55', 100, 150);

  document.addEventListener('keydown', movementHandler);

  var runGame = setInterval(gameLoop, 60);
});

//create on click function ---
// Clear the canvas
// Display the X and Y coordinates of our hero
// Check if the ogre is alive. 3a. render ogre 3b. check for collision
// Render the hero

//notes
//call event listner on game to interact w/ canvas
//call event listener on document to interact with page
