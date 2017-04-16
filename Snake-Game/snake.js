//game settings
var snakeX = 2;
var snakeY = 2;
var height = 30;
var width = 30;
var interval = 100;
var increment = 1;
//game variables
var length = 0;
var TailX = [snakeX];
var TailY = [snakeY];
var fX;
var fY;
var running = false;
var gameOver = false;
var direction = -1; //Down -1, UP 0, LEFT 1, RIGHT 2
var int;
var score = 0;

//entery point of the game

function run(){
    inti();
    int = setInterval(gameLoop , interval);

}

function inti(){
  drawMap();
  drawSnake();
  drawFruit();
}

//generate maps

function drawMap(){
  document.write("<table>");
	for(var y =0 ; y< height; y++){
		document.write("<tr>");
		for(var x= 0; x < width ; x++){

			if(x==0 || x==width-1 || y==0 || y==width-1){
				document.write("<td class='wall' id='"+x+"-"+y+"'></td>");
			}
			else{
				document.write("<td class='blank' id='"+x+"-"+y+"'></td>");
			}

		}
		document.write("</tr>");
	}
		document.write("</table>");

}

function drawSnake(){
  set(snakeX , snakeY , "snake");
}

function get(x,y){
  return document.getElementById(x+"-"+y);
}

function set(x,y,value){
  get(x,y).setAttribute("class",value);

}

function getType(x,y){
	return get(x,y).getAttribute("class");
}

function rand(min,max){
	return Math.floor(Math.random()*(max-min)+min);
}
function drawFruit(){
	var found =false;
	while(!found &&(length < (width-2)*(height-2)+1)){
		var fruitX = rand(1, width-1);
		var fruitY = rand(1, height-1);
		if(getType(fruitX,fruitY) == "blank"){
			found= true;
		}
	}
	set(fruitX,fruitY,"fruit");
	fX =fruitX;
	fY = fruitY;
}


window.addEventListener("keypress", function key(){
	var key = event.keyCode;
	//if w then up
	if(direction != -1 &&(key == 119 || key == 87)){
		direction = 0;
	}else if(direction != 0 &&(key == 115 || key == 83)){
		direction = -1;
		}else if(direction != 2 &&(key == 97 || key == 65)){
		direction = 1;
		}else if(direction !=1 &&(key == 100 || key == 68)){
		direction = 2;
		}
		if(!runnig){
			running =true;
		}else if(key == 32){
		running = false;	
		}
	});
	
function gameLoop(){
	if(!running && !gameOver){
		update();}else if(gameOver){
			clearInterval(int);}
	}
	
function update(){
	set(fX, fY ,"fruit");
	updateTail();
	set(TailX[length] , TailY[length],"blank");
	if(direction == 0 ){
		snakeY--;
	}else if(direction == -1){
		snakeY++;
	}else if(direction == 1){
		snakeX--;
	}else if(direction == 2){
		snakeX++;
	} 
	set(snakeX,snakeY,"snake");
	
	for(var i = TailX.length; i>=0 ; i--){
		if(TailX[i]==snakeX && TailY[i]==snakeY){
			gameOver =true;
			}
		}
	if(snakeX == 0 || snakeX == width-1 || snakeY==0 || snakeY==height-1){
		gameOver =true;
		}else if(snakeX==fX && snakeY == fY){
			drawFruit();
			length += increment;
			score +=10;
			}
			
			document.getElementById("score").innerHTML = score;
			
				if(gameOver == true){
		alert("The game is over, your score is "+score);
		
		}
	}	
	
	function updateTail(){
		for(i=length; i>0; i--){
			TailX[i] = TailX[i-1];
			TailY[i] = TailY[i-1];
				}
				TailX[0] = snakeX;
				TailY[0] = snakeY;
				}
run();
