class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    man1 = createSprite(100,200);
    man1.addImage("man1",man2_img);
    man2 = createSprite(300,200);
    man2.addImage("man2",man2_img);
    man3 = createSprite(500,200);
    man3.addImage("man3",man3_img);
    man4 = createSprite(700,200);
  man4.addImage("man4",man4_img);
    mans = [man1, man2, man3, man4];
   hurdles=createSprite(800,400)
    hurdles.addImage("hurdles",hurdle1);
   hurdle2=createSprite(600,400)
    hurdle2.addImage("hurdle2",hurdle1)
   hurdle3=createSprite(400,400)
   hurdle3.addImage("hurdle3",hurdle1)
    hurdle4=createSprite(1000,400)
    hurdle4.addImage("hurdle4",hurdle1)
  // hurdle5=createSprite(1000,1000)
   // hurdle5.addImage("hurdle5",hurdle1)
   
    
    
  }

  play(){
    form.hide();
    
    spawnObstacles1()
    spawnObstacles();
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        mans[index-1].x = y;
        mans[index-1].y = x;

        if (index === player.index){
          stroke(10)
          fill("red")
          ellipse(x,y,60,60);
          mans[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = mans[index-1].y;
        }
        if (keyDown("space")) {
          console.log(player.x)
          mans[index - 1].velocityY = -4;

      }
      var i=0
      if(frameCount%60===0){
      i=i+100

          hurdles=createSprite(800,400)
   hurdles.addImage("hurdles",hurdle1);
   hurdles.lifetime = 800;
      }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 3860){
      gameState = 2;
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
  }
}
function spawnObstacles1() {
  if (frameCount % 360 === 0) {

      var obstacle = createSprite(100,700,displayWidth,displayHeight);

      
      obstacle.addImage(hurdle1);
      obstacle.scale = 0.80;
      obstacle.lifetime = 800;
      obstacle.setCollider("rectangle", -10, 0, 90, 150);
      obstacle.debug = false;

  }
}
function spawnObstacles() {
  var i = 0;
  if (frameCount % 360 === 0) {
      i = i + 1000
      var obstacle = createSprite(200,1000,displayWidth,displayWidth);

      
      obstacle.addImage(hurdle1);

      obstacle.scale = 0.80;
      obstacle.lifetime = 800;
      obstacle.setCollider("rectangle", -10, 0, 90, 150);
      obstacle.debug = false;
  }
}
