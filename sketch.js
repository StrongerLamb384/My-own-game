
var square,square_anime,ground;
var squarePositionX;
var bkground;
var trap,trapGroup,trap1,trap1Group,trap_anime,spike;
var rand = 0;
var score,HighScore;
var database,dbref;
var portal,portal_anime;
var gameState;


function preload(){
  bkground = loadImage("PixelArt.png");
  trap_anime = loadImage("BearTrap.png");
  spike = loadImage("SpikeTrap.png");
  square_anime = loadImage("Square.jpg")
  portal_anime = loadAnimation("tile000.png","tile001.png","tile002.png","tile003.png","tile004.png","tile005.png","tile006.png","tile007.png","tile008.png");

}

function setup() {
  createCanvas(displayWidth,displayHeight);
  

square = createSprite(100,780,20,20);
square.addImage(square_anime);
square.scale = 0.03;

ground = createSprite(displayWidth/2,displayHeight,7500,5);

portal = createSprite(0,813,10,10);
portal.addAnimation("blah",portal_anime);
portal.scale =0.3;
portal.x = random(2700,3000);

trapGroup = new Group();
trap1Group = new Group();



score = 0;
HighScore = 0;

database = firebase.database();
 dbref = database.ref("highScore");
 dbref.on("value",(data)=>{
   HighScore = data.val();
 })

 gameState = 1;

}

function draw() {
  background(0);
  image(bkground,0,0,displayWidth*3,displayHeight);

  if(gameState === 1){
    if(keyDown(UP_ARROW)){
      square.velocityY = -11;
    }
  
    if(keyDown(RIGHT_ARROW)){
      square.x = square.x +20;
    }
  
    if(keyDown(DOWN_ARROW)){
      square.y = square.y +5;
    }
  
    if(keyDown(LEFT_ARROW)){
      square.x = square.x -20;
    }
  
  
    square.velocityY = square.velocityY + 0.8;
  
    square.collide(ground);
  
    if(score > HighScore){
      dbref.update({
        highScore:score
      })
    }
  
   camera.position.x = square.x;
  
   rand = Math.round(random(1,2));
  
   if(rand === 1){
     TrapBear();
   }
  
   if(rand === 2){
     TrapSpike();
   }
  
   if(square.isTouching(trapGroup) || square.isTouching(trap1Group)){
     gameState = 0;
     console.log("lets goo");
   }
  }

  if(square.isTouching(portal))

if(gameState === 0){

  square.collide(ground);

  camera.position.x = square.x;

  trapGroup.setVelocityXEach(0);
  trap1Group.setVelocityXEach(0);
  trapGroup.setLifetimeEach(-1);
  trap1Group.setLifetimeEach(-1);
  
}


  
  drawSprites();
}



function TrapBear(){
if(frameCount % 120 === 0){
    trap = createSprite(square.x + 500,800,10,10);
    trap.addImage(trap_anime);
    trap.scale = 0.1;
    trap.velocityX = -10;
    trapGroup.add(trap);
    trapGroup.setLifetimeEach(1000);
}
}

function TrapSpike(){
  if(frameCount % 120 === 0){
    trap1 = createSprite(square.x + 500,790,10,10);
    trap1.addImage(spike);
    trap1.velocityX = -10;
    trap1Group.add(trap1);
    trap1Group.setColliderEach("rectangle",0,0,100,100);
    trap1Group.setLifetimeEach(1000);
  }
}  