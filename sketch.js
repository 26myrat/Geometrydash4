var geoManImg, spikeImg, tallRectImg, mediumRectImg, smallRectImg, groundImg
var geoMan, ground, invisibleGround, obstaclesGroup
var gameState, score
var bgMusic, resetButton, resetImg

function preload() {
  geoManImg = loadImage("Images/GeoMan.png")
  spikeImg = loadImage("Images/spike.png")
  tallRectImg = loadImage("Images/tallRect.jpg")
  mediumRectImg = loadImage("Images/mediumRect.jpg")
  smallRectImg = loadImage("Images/smallRect.jpg")
  groundImg = loadImage("Images/bg.jpg")
  bgMusic = loadSound("bgMusic.mp3")
  resetImg = loadImage("Images/resetButton.jpg")
}

function setup() {
  createCanvas(1400,800);

  ground = createSprite(700, 400, 1400, 800)
  ground.addImage(groundImg)
  ground.scale = 2.5
  ground.velocityX = -3

  invisibleGround = createSprite(700, 730, 1400, 20)
  invisibleGround.visible = false

  geoMan = createSprite(50, 700, 10, 10);
  geoMan.setCollider("rectangle", 0,0, 200,200)
  geoMan.addImage(geoManImg)
  geoMan.scale = 0.25

  score = 0

  obstaclesGroup = new Group()

  gameState = "play"
  
  resetButton = createSprite(700, 400, 100, 50)
  resetButton.addImage(resetImg)
  resetButton.visible = false
  resetButton.scale = 0.2
  //bgMusic.play();
}


function draw() {
  background(30,260,105);  
  if(bgMusic.isPlaying()) {
    console.log("isPlaying")
  }
  else {
    //bgMusic.play()
  }
  if (gameState === "play") {

  if (frameCount%3 === 0) {
   score = score +1
  }
  if(ground.x < ground.width/2) {
    ground.x = 700
  }
  if (keyWentDown("space")) {
    geoMan.velocityY = -10
  }
  geoMan.velocityY = geoMan.velocityY +0.5

  if(frameCount%90 === 0) {
    spawnObstacles();
  }
  if(obstaclesGroup.isTouching(geoMan)) {
    gameState = "end"
  }
  }
  else if(gameState === "end") {
    ground.velocityX = 0
    obstaclesGroup.setVelocityXEach(0)
    geoMan.velocityY = 0
    bgMusic.stop()
    resetButton.visible = true
  }
  geoMan.collide(invisibleGround)
  for(var i = 0; i< obstaclesGroup.length; i++) {
    obstaclesGroup.get(i).collide(invisibleGround)
  }
  drawSprites();

  textSize(24)
  fill("black")
  text("Score: " + score,700, 200)
  
  if (mousePressedOver(resetButton)) {
    restart()
    
  }
}

function restart() {
  gameState = "play"
  score = 0
  obstaclesGroup.destroyEach()
  ground.velocityX = -3
  resetButton.visible = false
}

function spawnObstacles() {
  var obstacles = createSprite(1400, 700)
  obstacles.scale = 0.5
  obstacles.setCollider("rectangle", 0, 0, 100, 100)
  obstacles.velocityX = -3
  var rand = Math.round(random(1,4))
  switch(rand) {
    case 1: obstacles.addImage(smallRectImg)
    break;
    case 2: obstacles.addImage(mediumRectImg)
    break;
    case 3: obstacles.addImage(tallRectImg)
    break;
    case 4: obstacles.addImage(spikeImg)

  }
  obstaclesGroup.add(obstacles)
  //obstacles.collide(invisibleGround)
}