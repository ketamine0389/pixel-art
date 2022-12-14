const colors = {
	RED    : '#ff0000',
	ORANGE : '#ff7f00',
	YELLOW : '#ffff00',
	GREEN  : '#37780c',
	BLUE   : '#0000ff',
	INDIGO : '#4b0082',
	PURPLE : '#9400d3',
	WHITE  : '#fefefe',
	GREY   : '#8c8c8c',
	BLACK  : '#000000'
}
const gridSize = 20;
const cW = 420;
const cH = 420;
let rightPressed = false;
let locked = false;

/*
 * Custom Functions
 */

function gridFill(x, y) {
	// Create a square inline with the grid
	x -= x % gridSize;
	y -= y % gridSize;
	square(x, y, gridSize);
}

function fillAll() {
	for (let x = 0; x < cW; x++) {
		for (let y = 0; y < cH; y++) {
			gridFill(x, y);
		}
	}
}

const rand = function(min, max) { 
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
 * Document Setup
 */

{
	for (const color in colors) {
		let el = `<div class="color" data-color="${color}" style="background-color: ${colors[color]};"></div>`;
		document.querySelector('#colorPicker').insertAdjacentHTML('beforeend', el);
	}

	const children = document.querySelectorAll('#colorPicker .color');

	children.forEach((e, i) => {
		e.addEventListener('click', function(e) {
			if (document.querySelector('#activeColor')) document.querySelector('#activeColor').id = '';
			this.id = 'activeColor';
			fill(colors[this.dataset.color]);
		});
	});

	document.querySelector('#colorPicker').insertAdjacentHTML('beforeend', `<button id="fill">Fill All</button>`);
}

document.querySelector('#fill').addEventListener('click', function(e) {
	fillAll();
});

/*
 * p5 Functions
 */

function setup() {
	// Create a canvas of uniform size
	let cvs = createCanvas(cW, cH);
	cvs.parent('canvasContainer')

	// Set canvas background
	background(colors.WHITE);
	
	// Set stroke properties
	stroke(0, 0, 0);
	strokeWeight(1);

	// Disable the border around each "stroke"
	// noStroke();

	// Create the grid
	fillAll();

	// Default fill setup
	document.querySelectorAll('.color')[0].id = 'activeColor';
	fill(colors[document.querySelector('#activeColor').dataset.color]);
}

function mousePressed() {
	if (mouseButton === RIGHT) {
		rightPressed = true;
		fill(colors.WHITE);
	}
	locked = true;
	gridFill(mouseX, mouseY);
}

function mouseDragged() {
	if (locked)
		gridFill(mouseX, mouseY);
}

function mouseReleased() {
	if (rightPressed) {
		fill(colors[document.querySelector('#activeColor').dataset.color]);
		rightPressed = false;
	}
	locked = false;
}

// Prevent "right clicking"
document.addEventListener('contextmenu', event => event.preventDefault());
