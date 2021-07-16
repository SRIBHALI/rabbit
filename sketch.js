var garden,rabbit;
var gardenImg,rabbitImg,apple , leavesImg,leaves,endImg;
var applesEaten = 0;
var DieSound,eatingSound;

function preload(){
  gardenImg = loadImage("garden.png");
  rabbitImg = loadImage("rabbit.png");
  appleImg = loadImage("apple.png");
  leavesImg = loadImage("orangeLeaf.png");
  endImg = loadImage("gameOver.PNG");
  DieSound = loadSound("gameover.mp3");
  eatingSound = loadSound("rabbitEating.mp3");
} 

function setup(){
  
  createCanvas(400,400);
  
// Moving background
garden=createSprite(200,200);
garden.addImage(gardenImg);

//creating boy running
rabbit = createSprite(180,290,30,30);
rabbit.scale =0.09;
rabbit.addImage(rabbitImg);

//invisibleTree = createSprite(20,290,40,100)
//invisibleTree.visible = true;

appleGroup = createGroup();
leafGroup = createGroup();
}


function draw() {
  background(0);
  
  edges= createEdgeSprites();
  rabbit.collide(edges);
 //rabbit.collide(invisibleTree);

  var select_sprites = Math.round(random(1,2));

  if(frameCount % 80 == 0 ){
    if(select_sprites == 1){
      createApples()
    }
    else {
      createleaves()
    }
  }

  if(rabbit.isTouching(appleGroup)){
  appleGroup.destroyEach();
  applesEaten = applesEaten+1
  eatingSound.play();
  }

  else if(rabbit.isTouching(leafGroup)){
 rabbit.addImage(endImg);
 rabbit.scale = 1;
 rabbit.y = 250
 appleGroup.destroyEach();
 appleGroup.setVelocityYEach(0);
 leafGroup.destroyEach();
 leafGroup.setVelocityYEach(0);
 DieSound.play()
  }

 rabbit.x = World.mouseX
  drawSprites();
  textSize(20);
  fill("black");
  text("ApplesEaten:" +applesEaten, 120,30 )
}

function createApples(){
  apple = createSprite(random(50,350),40,10,10);
  apple.addImage(appleImg);
  apple.scale=0.1;
  apple.velocityY = (7+(applesEaten/5));
  lifetime = 150;
  appleGroup.add(apple);
}

  function createleaves(){
  leaves =  createSprite(random(50,350),40,10,10);
  leaves.addImage(leavesImg);
  leaves.scale = 0.1;
  leaves.velocityY = (8+(applesEaten/2));
  lifetime = 150;
  leafGroup.add(leaves);
  }