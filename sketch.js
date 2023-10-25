// decalring variables
var dungeon, dungeonImg;
var step, stepImg, stepGroup;
var ground

var obstacle, obstaclesGroup, fireballImg, ghostImg;

// var fireball, fireballImg, fireballGroup;
// var ghost, ghostImg, ghostGroup;

var dragon, dragonImg;
var knight, kightStand, knightRun, knightJump;

var gameState = "play"


function preload(){
    dungeonImg = loadImage("dungeon.bg.png");
    step = loadImage("woodStep.png");

    knightRun = loadAnimation("knight_run1.png","knight_run2.png", "knight_run3.png", "knight_run4.png", "knight_run5.png", "knight_run6.png");
    knightStand = loadImage("knight_run1.png");

    stepImg = loadImage("woodStep.png");
    fireballImg = loadImage("fireball.png");
    ghostImg = loadImage("ghost.png");

}

function setup() {
    createCanvas(690, 319.2);

    ground = createSprite(345, 310, 690, 10);

    dungeon = createSprite(508, 159.6);
    dungeon.addImage(dungeonImg);
    dungeon.scale=0.4;
    dungeon.velocityX=-5;

    knight = createSprite(190, 250);
    knight.addAnimation("running", knightRun);
    knight.addImage(knightStand);
    knight.scale=0.8

    stepGroup = new Group();
    obstaclesGroup = new Group();

}

function draw() {

    if(gameState == "play"){

        spawnSteps();
        spawnObstacles();


        //scrolling
        if (dungeon.x < 150){
        dungeon.x = 510;
        }

        //movements
        if(keyDown("SPACE")){
        knight.velocityY = -10;
        }
        knight.velocityY = knight.velocityY + 2.4;

        if(keyDown("RIGHT_ARROW")){
        knight.x = knight.x+3;
        }


        //collisions
        knight.collide(ground);
        knight.collide(stepGroup);
    
        if(obstaclesGroup.isTouching(knight)||knight.x<0){
            gameState = "end"
        }
    }


    if(gameState == "end"){
        stroke("red");
        strokeWeight(3);
        fill("yellow");
        textSize(30);
        text("GAME OVER", 200, 300);

        knight.addImage(knightStand);

        obstaclesGroup.destroyEach();
        stepGroup.destoryEach();
        knight.destroy();
        dungeon.velocityX = 0;
    }

    drawSprites();
}



function spawnSteps(){
    if(frameCount % 120 === 0){
      step = createSprite(690, 150);
  
      step.y = Math.round(random(60, 295));
  
      step.addImage(stepImg);
      step.scale = 0.5
  
      step.velocityX = -5;
  
      knight.depth = step.depth;
      knight.depth +=1;
  
      step.lifetime = 800;
  
      stepGroup.add(step);
    }
}


function spawnObstacles(){
    if(frameCount % 100 === 0){
        obstacle = createSprite(690, 150, 20, 20);
        obstacle.y = Math.round(random(60,300));;

        //generate random obstacles
        var rand = Math.round(random(1,5));
        switch(rand) {
            case 1: obstacle.addImage(fireballImg);
                    obstacle.scale = 0.22;
                    obstacle.setCollider("circle", 0, 0, 8);
                    obstacle.velocityX = -5.2
              break;
            case 2: obstacle.addImage(ghostImg);
                    obstacle.scale = 0.13;
                    obstacle.setCollider("circle", 0, 0, 13);
                    obstacle.velocityX = -4.5
              break;
            case 3: obstacle.addImage(fireballImg);
                    obstacle.scale = 0.25;
                    obstacle.setCollider("circle", 0, 0, 8);
                    obstacle.velocityX = -5.1
              break;
            case 4: obstacle.addImage(ghostImg);
                    obstacle.scale = 0.1;
                    obstacle.setCollider("circle", 0, 0, 10);
                    obstacle.velocityX = -4.8;
              break;
            case 5: obstacle.addImage(fireballImg);
                    obstacle.scale = 0.21;
                    obstacle.setCollider("circle", 0, 0, 8);
                    obstacle.velocityX = -5.5
              break;
            default: break;
        }
        
        obstacle.lifetime = 800

        obstaclesGroup.add(obstacle);
    }
}
