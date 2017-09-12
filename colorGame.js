var numSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
	// mode buttons event listeners
	setUpModeButtons();
	// add click listeners to squares
	setUpSquares();
	// reset the screen
	reset();
}

function setUpModeButtons(){
	for (var i=0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			// figure out how many squares to show
			// using the ternary operator in JS
			this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
			reset();
		});
	}
}

function setUpSquares(){
	for (var i=0; i < squares.length; i++) {
		squares[i].addEventListener("click", function(){
			// grab color of clicked square
			// compare color to pickedColor
			if (this.style.backgroundColor === pickedColor) {
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?";
				changeColors(pickedColor);
				h1.style.backgroundColor = pickedColor;
			}
			else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
				resetButton.textContent = "New Colors";
			}
		});
	}
}

resetButton.addEventListener("click", function(){
	reset();
});

function reset(){
	// generate all new colors
	colors = generateRandomColors(numSquares);
	// pick a new random color from array
	pickedColor = pickColor();
	// change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;
	messageDisplay.textContent = "";
	resetButton.textContent = "New Colors";
	// change the colors of the squares on the page
	for (var i=0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.backgroundColor = colors[i];
			squares[i].style.display = "block";
		}
		else {
			squares[i].style.display = "none";
		}
		squares[i].style.backgroundColor = colors[i];
	}
	h1.style.backgroundColor = "steelblue";
}

function changeColors(color){
	// loop through all squares
	for (var i=0; i < squares.length; i++) {
		// change each color to match given color
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(numColors){
	// make an array
	var arr = [];
	// repeat numColors times
	for (var i=0; i < numColors; i++){
		// get random color and push into array
		arr.push(randomColor());
	}
	// return that array
	return arr;
}

function randomColor(){
	// pick a "red" from 0-255
	var r = Math.floor(Math.random() * 256);
	// pick a "green" from 0-255
	var g = Math.floor(Math.random() * 256);
	// pick a "blue" from 0-255
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}