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

function makeGrid(squaresPerSide) {
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

function randomColorChange(box) {
	var redVal = Math.floor(Math.random() * 255 + 1); 
	var greenVal = Math.floor(Math.random() * 255 + 1); 
	var blueVal = Math.floor(Math.random() * 255 + 1); 
	var newVal = "rgb" + "(" + redVal + ", " + greenVal + ", " + blueVal + ")";
	box.css("background", newVal);
}

function changeOpacity(box) {
	var currentOpacity = box.css("opacity");
		currentOpacity = parseFloat(currentOpacity);
		if (currentOpacity < 1) {
			currentOpacity += penPressure;
			box.css("opacity", currentOpacity);
		}
}

function clearGrid() {
	$("#container").children("div").remove();
}

function changeGridSize() {
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

function toggleOpacity() {
	if (penPressure !== 0) {
		prevPressure = penPressure;
		penPressure = 0;
	}

	else {
		penPressure = prevPressure;
	}
	changeSliderValues();	
}

function changeSliderValues() {
	$("#penOutput").text(penPressure);
	$("changePenPressure").val(penPressure * 100);
}


function toggleHelp() {
	$("#help").fadeToggle();
}