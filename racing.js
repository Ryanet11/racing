var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;
var images = [new Image(), new Image(), new Image(), new Image(), new Image()];
var keys = [];
function loadImg() {
	images[3].onload = function() {
		ctx.drawImage(images[3], 0, 0, 500, 500)
	}
	images[0].src = "player1.png";
	images[1].src = "player1-right.png";
	images[2].src = "player1-left.png";
	images[3].src = "background.png";
	images[4].src = "road-block.png";
}
function animate() {
	requestAnimationFrame(animate);
	if (gameOver == false) {
		ctx.drawImage(images[3], 0, 0, 500, 500)
		player.update();
		obstacle.update();
		ctx.fillStyle = "white";
		ctx.font = "30px Calibri";
		ctx.fillText(score, 10, 30)
	}
	else {
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "black";
		ctx.font = "30px Calibri";
		ctx.textAlign = "center";
		ctx.fillText("Your score is " + score, canvas.width / 2, canvas.height / 2);
		ctx.font = "25px Calibri";
		ctx.fillText("pres \"ENTER\" to restart", 250, 280)
		checkRespawn();
	}
}
var xLocations = [0, 25, 50 ,75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350, 375, 400]
var player = new Player();
var obstacle = new Obstacle();
var score = 0;
var gameOver = false;
function checkRespawn() {
	if (keys[13]) {
		score = 0;
		obstacle = new Obstacle();
		player = new Player();
		gameOver = false;
	}
}
function Obstacle() {
	this.x = xLocations[Math.floor(Math.random()*xLocations.length)];
	this.y = 10;
	this.dy = 1;
	this.width = 100;
	this.height = 50;
	this.draw = function() {
		ctx.drawImage(images[4], this.x, this.y);
	}
	this.update = function() {
		if (player.x + player.width > this.x && player.x < this.x + this.width && player.y + player.height > this.y && player.y < this.y + this.height) {
			this.gameOver();
		}
		else {
			if (this.y + this.height + this.dy < canvas.height) {
				this.y += this.dy;
			}
			else {
				this.x = xLocations[Math.floor(Math.random()*xLocations.length)];
				this.y = 10;
				score += 1;
				console.log(score);
				this.dy = 1;
				this.dy += (score / 4);
			}
			this.draw();	
		}
	}
	this.gameOver = function() {
		gameOver = true;
		
	}
}
function Player() {
	this.x = 0;
	this.y = 390;
	this.dx = 3;
	this.width = 50;
	this.height = 100;
	this.draw = function() {
		if (keys[68] || keys[39]) {
			ctx.drawImage(images[1], this.x, this.y);
			this.width = 78;
		}
		else if(keys[65] || keys[37]) {
			ctx.drawImage(images[2], this.x, this.y);
			this.width = 78;
		}
		else {
			ctx.drawImage(images[0], this.x, this.y);
			this.width = 50;
		}
	}
	this.update = function() {
		if (gameOver == false) {
			if (keys[68] || keys[39]) {
				if (this.x + this.dx + this.width < canvas.width) { 	
					this.x += this.dx
				}
			}
			if (keys[65] || keys[37]) {
				if (this.x - this.dx > 0) {
					this.x -= this.dx
				}
			}
			this.draw();
		}
	}
}
loadImg();
animate();
window.onkeydown = function(event) {
	keys[event.keyCode] = true;
}
window.onkeyup = function(event) {
	keys[event.keyCode] = false;
}
