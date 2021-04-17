var ground;
var woodmen;
var gobject;
var groundImage;
var woodmenImage;
var bobject;
var tree;
var ggroup,bgroup;
var treeImage;
var score = 0;
var gameState ="play";
var sunImage;
var chemicalImage;
var waterImage;
var axeImage;
var seedImage;
var fireImage;
var bg;
function preload(){
    groundImage = loadImage("ground.png");
   // woodmenImage = loadImage ("wood men.PNG");
   treeImage = loadImage("tree.png");
   sunImage = loadImage("sun.png");
   chemicalImage = loadImage("chemical.png");
   seedImage = loadImage("seed.png");
   waterImage = loadImage("water.png");
   axeImage = loadImage("axe.png");
   fireImage = loadImage("fire.png");
   

}

function setup(){
    createCanvas(displayWidth-20,displayHeight-170);

    // creating ground
    ground = createSprite(displayWidth/2-10,displayHeight-200,displayWidth-20,20);
    ground.addImage(groundImage);
    ground.velocityX = -3;
    ground.scale = 2.5;
   
    //creating player
    woodmen = createSprite(100,displayHeight-270,20,40);
  //  woodmen.addImage(woodmenImage);

  tree = createSprite(displayWidth/2,displayHeight/2-170,100,100);
  tree.addImage(treeImage);
  tree.scale = 0.05;

  


  ggroup = new Group ();
  bgroup = new Group ();

}
function draw(){
    background("#ABF7F7");
    if(gameState === "play"){
    score  = score+1;
    if(ground.x <0 ){
        ground.x = displayWidth/2-10;

    }
    if(keyDown("space")){
        woodmen.velocityY = -10;
    }
    //adding gravity
    woodmen.velocityY =  woodmen.velocityY+0.8;



    if(woodmen.isTouching(ggroup)){
        for(var i = 0; i<ggroup.length; i =i+1 ){
            tree.scale = tree.scale + 0.0001;
          
        }

    }
    
    if(woodmen.isTouching(bgroup)){
        for(var i = 0; i<bgroup.length; i =i+1 ){
            bgroup[i].destroy();
            gameState = "end";

        }

    }


    woodmen.collide(ground);
    

   var num = Math.round(random(1,2));
  
    if(num === 1){
        bad();
    }
    if(num === 2 ){
        good();
    }
  
    if(tree.isTouching(ground)){
        gameState = "win";

    }
}
    if(gameState === "win"){
        ground.velocityX = 0;
        ggroup.destroyEach();
        bgroup.destroyEach();
        stroke(0);
        strokeWeight(2);
        fill("white");
        textSize(30);
        text("HURRAY!",displayWidth/2-60,displayHeight/2-260);
        text("You saved the tree",displayWidth/2-110,displayHeight/2-230);
    
    }

    if(gameState === "end"){
        ground.velocityX = 0;
        ggroup.destroyEach();
        bgroup.destroyEach();
        fill("white");
        stroke(0);
        strokeWeight(2);
        textSize(30);
        text("GAME OVER",displayWidth/2-80,displayHeight/2-260);
        text("Conserve the Tree",displayWidth/2-110,displayHeight/2-230);
    
    }
    drawSprites();
    
    textSize(30);
    text("SCORE : "+score,100,100);
}
function bad(){  
    if(frameCount%100 === 0){
        bobject = createSprite(displayWidth-20,displayHeight-300,20,50);
        bobject.shapeColor = "red";
       bobject.velocityX = -3;
       var m = Math.round(random(1,3));
       switch(m){
           case 1 : bobject.addImage(axeImage);
           bobject.scale = 0.4;
           break;
           case 2 : bobject.addImage(fireImage);
           bobject.scale = 0.3;
           break;
           case 3 : bobject.addImage(chemicalImage);
           bobject.scale = 0.2;
           break;
       }
       bobject.lifetime = 500;
       bgroup.add(bobject);
       

    }

}
function good(){  
    if(frameCount%100=== 0){
        gobject = createSprite(displayWidth-20,displayHeight-300,20,50);
        gobject.shapeColor = "green";
        var n = Math.round(random(1,3));
        switch(n){
            case 1 : gobject.addImage(waterImage);
            gobject.scale = 0.1;
            break;
            case 2 : gobject.addImage(sunImage);
            gobject.scale = 0.2;
            break;
            case 3 : gobject.addImage(seedImage);
            gobject.scale = 0.3;
            break;
        }
        gobject.velocityX = -3;
       gobject.lifetime = 500;
       ggroup.add(gobject);



    }
    else{
        bad();
    }

}
