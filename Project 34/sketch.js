
var hypnoticBall, database;
var position;
var coin;

function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);

  hypnoticBall = createSprite(250,25,10,10);
  hypnoticBall.shapeColor = "Blue";

  coin = createSprite(400,400,20,20);
  coin.shapeColor = "yellow";
  var hypnoticBallPosition = database.ref('ball/position');
  hypnoticBallPosition.on("value", readPosition, showError);
}

function draw(){
  background("grey");
  
  if(hypnoticBall.collide(coin)){
   text("YOU WON!",200,300)
  }
  

    if(keyDown(LEFT_ARROW)){
      writePosition(-2,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(2,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-2);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+2);
    }
    
    hypnoticBall.velocityY=+1

    drawSprites();
       
  
}

function writePosition(x,y){
  database.ref('ball/position').set({
'x':position.x+x,
'y':position.y+y
  })
}
   
   
  

function readPosition(data){
  position = data.val();
  console.log(position.x);
  console.log(position.y);
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}
