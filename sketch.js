const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var obg;
var score=0;

var fuel=100;
var health=100;
var mf=0;
var mh=0;
var gameState = "play";


function preload() {
   backgroundImg = loadImage("spaceBg.jpg");
   earthImg=loadImage("earth_PNG39.png");
   moonImg=loadImage("moon_PNG52.png");
   astroImg=loadImage("astro1.png")
   astroWalkImg=loadAnimation("astro1.png","astro2.png");
   meteorImg=loadImage("meteor.png");
   met2Img=loadImage("meteor2.png");
   met3Img=loadImage("meteor3.png");
   wimg=loadImage("youwin.png");
   limg=loadImage("gameover.jpg");
   // backgroundimage();
}

function setup(){
    var canvas = createCanvas(displayWidth-20,displayHeight-150);
    engine = Engine.create();
    world = engine.world;


  

    earth=createSprite(displayWidth*3,displayHeight);
    earth.addImage("earthImage",earthImg);
    //earth.scale=0.5;

    player=createSprite(displayWidth*3,height/2,100,100);
    player.addAnimation("astronaught",astroImg);
    player.addAnimation("astronaught",astroWalkImg);

    
    fuelmeter=createSprite(player.x+100,player.y,30,150);
    fuelmeter.shapeColor="white";
    healthmeter=createSprite(player.x+150,player.y,30,150);
    healthmeter.shapeColor="white";

    fuelm=createSprite(player.x+100,player.y,30,150);
    fuelm.shapeColor="green";
    healthm=createSprite(player.x+150,player.y,30,150);
    healthm.shapeColor="green";


    moon=createSprite(random(100,displayWidth*5.5),random(-displayHeight*5,-displayHeight*4));
    moon.addImage("moonImage",moonImg);
 
    winner=createSprite(moon.x,moon.y,300,300);
 winner.addImage("testing",wimg);
 winner.addImage("lost",limg);
    winner.visible=false;

    obg= new Group();
}

function draw(){
    image(backgroundImg,0,-displayHeight*6,displayWidth*6,displayHeight*7);

    camera.position.x=player.x;
    camera.position.y=player.y;
    /*
    noStroke();
    textSize(35);
    fill("white");
    text("score: "+ score,width-300,50)  */
    

    if(gameState==="play"){
    
    directions();
    keepUpdate();
    spawnObs();
    updateHealth();
    if(player.isTouching(moon)){
        gameState="won";
        console.log("touching moon");
    }
    if(fuel<=0||health<=0){
        gameState="lost";
    }
   }


   if(gameState==="won"){
    //directions();
    player.x=moon.x;
    player.y=moon.y;
    winner.visible=true;
    console.log("won state");
    obg.destroyEach();

   }
   if(gameState==="lost"){
    player.x=moon.x;
    player.y=moon.y;
    winner.visible=true;
    winner.changeImage('lost',limg);
    console.log("lost");
    obg.destroyEach();

      // directions();
   }
drawSprites();  
fill("white");
    line(player.x,player.y,moon.x,moon.y);
}

function directions(){
   // if(bool==true){
        if(keyDown("up")&&player.y>(-displayHeight*6)+displayHeight/2){
            player.y-=15;
            updateFuel();
        }
        if(keyDown("down")&&player.y<displayHeight/2){
            player.y+=15;
            updateFuel();
        }
        if(keyDown("left")&&player.x>displayWidth/2){
            player.x-=15;
            updateFuel();
        }
        if(keyDown("right")&&player.x<displayWidth*5.5){
            player.x+=15;
            updateFuel();
        }
}

//else{}
//}

function keepUpdate(){
    fuelmeter.y=player.y;
    fuelmeter.x=player.x+100;
    healthmeter.y=player.y;
    healthmeter.x=player.x+150;
    fuelm.y=player.y+mf;
    fuelm.x=player.x+100;
    healthm.y=player.y+mh;
    healthm.x=player.x+150;


}

function updateFuel(){
    if(frameCount%60===0&&fuel!==0){
    fuel-=5;
    fuelm.height=(fuel/100)*150
    mf+=3.7;
}

if(fuel===0){
    fuelm.visible=false;
}
if(fuel<50&&fuel>19){
    fuelm.shapeColor="yellow";
}
else if(fuel<20){
    fuelm.shapeColor="red";
}
else{
    fuelm.shapeColor="green";
}
}
function updateHealth(){
    healthm.height=(health/100)*150;


if(health===0){
    healthm.visible=false;
}
if(health<50&&health>19){
    healthm.shapeColor="yellow";
}
else if(health<20){
    healthm.shapeColor="red";
}
else{
    healthm.shapeColor="green";
}
}


function spawnObs(){
    if (frameCount % 10 === 0) {
        obs = createSprite(random(100, displayWidth*5),-displayHeight*7 , 100, 100);
        obs.velocityY = 12;
        obs.velocityX =random(-8,8);
        if(obs.x<0||obs.x>displayWidth*6){
            obs.velocityX=-obs.velocityX;
        }
        
        var rand=Math.round(random(1,3))
        
        switch(rand){
            case 1:
                obs.addImage("meteor",meteorImg);
                obs.scale=0.3;
                break;
                case 2:
                obs.addImage(met2Img);
                break;
            case 3:
                obs.addImage(met3Img);
                obs.scale=0.3;
                break;

        }
        obg.add(obs);
        
    }
    
     if (player) {
       for (var i = 0; i < obg.length; i++) {
           if (obg.get(i).isTouching(player)||obg.get(i).isTouching(earth)||obg.get(i).isTouching(moon)) {
               
            }
            if (obg.get(i).isTouching(player)){
                obg.get(i).destroy();
                health-=10;
                mh+=7.4;
            }
       }
     }
}