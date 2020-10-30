const movementDisplay = document.querySelector('#movement')
const game = document.querySelector('#game')

// syncing up the canvas's internal height&width to its apparent height&width
const computedStyle = getComputedStyle(game)
const height = computedStyle.height
const width = computedStyle.width
game.height = height.replace('px', '')
game.width = width.replace('px', '')



// grab a context from the canvas
const ctx = game.getContext('2d')



class Crawler {
  constructor(x, y, color, width, height) {
    this.x = x
    this.y = y
    this.color = color
    this.width = width
    this.height = height
    this.alive = true
  }

  render() {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

const ogre = new Crawler(10, 10, "#BADA55", 40, 80)
const hero = new Crawler(150, 150, 'hotpink', 20, 20)

document.getElementById('status').addEventListener('click', function() {
  hero.render()
  ogre.render()
})

document.addEventListener('keyup', function(evt) {
  if (evt.key === 'w') {
    hero.y -= 10
  } else if (evt.key === 'a') {
    hero.x -= 10
  } else if (evt.key === 's') {
    hero.y += 10
  } else if (evt.key === 'd') {
    hero.x += 10
  }

  movementDisplay.textContent = `X: ${hero.x}, Y: ${hero.y}`
})

function detectHit() {
  // hit coming in from the right
  if (hero.x < ogre.x + ogre.width
    && hero.x + hero.width > ogre.x
    && hero.y < ogre.y + ogre.height
    && hero.y + hero.height > ogre.y) {
    ogre.alive = false
  }
}

function rePaint() {
  // clear off the entire canvas
  ctx.clearRect(0, 0, game.width, game.height)

  // render the hero and the ogre
  hero.render()
  if (ogre.alive) {
    ogre.render()
  }

  detectHit()
}

setInterval(rePaint, 1000 / 60) // 60 frames per second