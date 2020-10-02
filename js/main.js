var gridLength = 500;
var penPressure = .1;
var prevPressure = .1;
var colorMode = "normal";

$(document).ready(function() {
	squaresPerSide = 16;
	makeGrid(squaresPerSide);

	$("#container").on("mouseenter", "div", function() {
		if (colorMode == "random") {
			if (penPressure !== 0) {			
				randomColorChange($(this));
			}
		}

		changeOpacity($(this));
	}); 


	$("#changeGrid").on("click", function() {
		changeGridSize();
	});

	$("#normalMode").on("click", function() {
		if (colorMode !== "normal") {
			colorMode = "normal";
			$("button").removeClass("selected");
			$(this).addClass("selected");
		}
	});

	$("#randomColor").on("click", function() {
		if (colorMode != "random") {
			colorMode = "random";
			$("button").removeClass("selected");
			$(this).addClass("selected");
		}
	});

	$("#clearCanvas").on("click", function() {
		$("#container").children("div").css({"background-color": "#fff", "opacity": "0"})
	});

	$("[type='range']").on("change", function() {
		var pressure = +$(this).val();
		penPressure = pressure / 100;
		$("#penOutput").text(penPressure);
	});

	$(document).keydown(function(event) {
		event.preventDefault();
		var key = event.which;
		if (key == 32) {
			toggleOpacity();
		}
		if (key == 72) {
			toggleHelp();
		}
	});	
});

function makeGrid(squaresPerSide) {         //function to generate a grid
	clearGrid();
	//Create squares
	var numSquares = squaresPerSide * squaresPerSide;
	//find container
	var squareSide = gridLength / squaresPerSide; 
	var square;

	for (var i = 0; i < numSquares; i++) {
		square = $("<div></div>").css({"height": squareSide, "width": squareSide});
		$("#container").append(square);
	}
	penPressure = .1;
	changeSliderValues();
}

function randomColorChange(box) {         //function to change the color to random color
	var redVal = Math.floor(Math.random() * 255 + 1); 
	var greenVal = Math.floor(Math.random() * 255 + 1); 
	var blueVal = Math.floor(Math.random() * 255 + 1); 
	var newVal = "rgb" + "(" + redVal + ", " + greenVal + ", " + blueVal + ")";
	box.css("background", newVal);
}

function changeOpacity(box) {         //function to change the opacity of grid
	var currentOpacity = box.css("opacity");
		currentOpacity = parseFloat(currentOpacity);
		if (currentOpacity < 1) {
			currentOpacity += penPressure;
			box.css("opacity", currentOpacity);
		}
}

function clearGrid() {         //function to clear the grid
	$("#container").children("div").remove();
}

function changeGridSize() {         //function to change the grid size
	var newSize = prompt("Choose a new side length (between 1 and 100)");
	 while (isNaN(newSize) || newSize > 100 || newSize < 1 && 
	 	newSize != null && newSize !== "") {
	 	newSize = prompt("Please choose a valid side length from 1 to 100");
	 }

	 if (newSize == "" || newSize == null) {
	 	newSize = 16;
	 }
	 makeGrid(newSize);
}

function toggleOpacity() {         //function to toggle the opacity
	if (penPressure !== 0) {
		prevPressure = penPressure;
		penPressure = 0;
	}

	else {
		penPressure = prevPressure;
	}
	changeSliderValues();	
}

function changeSliderValues() {         //function to change the slider values
	$("#penOutput").text(penPressure);
	$("#changePenPressure").val(penPressure * 100);
}


function toggleHelp() {         //function to access the help menu
	$("#help").fadeToggle();
}
