let width, height;
let canvas, c;

function loadImage(url) {
	return new Promise(resolve => {
		const image = new Image();
		image.addEventListener('load', () => {
			resolve(image);
		});
		image.src = url;
	});
}

function createCanvas(w, h) {
	if (canvas !== undefined) {
		canvas.parentElement.removeChild(canvas);
	}
	canvas = document.createElement('canvas');
	document.body.appendChild(canvas);
	c = canvas.getContext('2d');
	canvas.width = w;
	canvas.height = h;
	width = w;
	height = h;
}

// Initialization
const SIZE = 64;
let srm, camera, objects, player, enemy, ally;

let frameCount = 0;

var lastLoop = (new Date()).getMilliseconds();
var count = 1;
var fps = 0;

function updateFPS() {
	var currentLoop = (new Date()).getMilliseconds();

	if (lastLoop > currentLoop) {
		fps = count;
		count = 1;
	}
	else count += 1;

	lastLoop = currentLoop;
}

let control = {
	left: false,
	up: false,
	right: false,
	down: false,
	update: function(evt) {
		if (evt.type === 'keydown') keyPressed(evt.keyCode);
		else if (evt.type === 'keyup') keyReleased(evt.keyCode);
	}
};

const map = [
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const mapW = map[0].length * SIZE;
const mapH = map.length * SIZE;

// This is where loading files takes place
function preload() {
	// Promises or Asynchronous functions
	srm = new StaticResourceManager();
	loadImage('res/tile/grass.png')
	.then(img => {
		srm.add('grass-tile', img);
		return loadImage('res/char/main.png');
	})
	.then(img => {
		srm.add('char-sprite', img);
		return loadImage('res/shadow/char.png');
	})
	.then(img => {
		srm.add('char-shadow', img);
		init();
	})
	.catch(err => console.log(err));
}

// This will execute before rendering
function init() {
	createCanvas(640, 512);

	player = new Player(0, 0, SIZE, SIZE, srm.getImage('char-sprite'), srm.getImage('char-shadow'));
	enemy = new DynamicObject(64, 64, SIZE, SIZE, srm.getImage('char-sprite'), srm.getImage('char-shadow'), [
		{ direction: 'right', x: 192, y: 64 },
		{ direction: 'down', x: 192, y: 192 },
		{ direction: 'left', x: 64, y: 192 },
		{ direction: 'up', x: 64, y: 64 }
		], 8);
	ally = new DynamicObject(64, 0, SIZE, SIZE, srm.getImage('char-sprite'), srm.getImage('char-shadow'), [
		{ direction: 'right', x: mapW - SIZE, y: 0 },
		{ direction: 'down', x: mapW - SIZE, y: mapH - SIZE },
		{ direction: 'left', x: 0, y: mapH - SIZE },
		{ direction: 'up', x: 0, y: 0 }
		], 8);

	camera = new Camera(width, height, mapW, mapH);

	objects = new ObjectCollection();
	objects.add(player);
	objects.add(enemy);
	objects.add(ally);

	c.font = '32px Monospace';
	c.fillStyle = 'rgb(237, 28, 36)';

	window.addEventListener('keydown', control.update);
	window.addEventListener('keyup', control.update);

	// frameRate(60);
	setInterval(render, 1000 / 60);
}

// This is where rendering takes place
function render() {
	// Clear canvas
	c.fillStyle = 'black';
	c.fillRect(0, 0, width, height);
	
	camera.update(player.x + player.width / 2, player.y + player.height / 2);

	// This area is affected by camera
	srm.drawRect('grass-tile', 0, 0, mapW, mapH);

	// Draw by y order
	objects.sortbyYOrder();
	objects.drawAll();

	// This area is not affected by camera
	camera.stop();
	updateFPS();
	c.fillStyle = 'red';
	c.fillText('FPS: ' + fps, 40, 40);
	frameCount++;
}

function keyPressed(keyCode) {
	// Event for controling player when key is pressed
	switch(keyCode) {
		case 65: control.left = true; return;
		case 87: control.up = true; return;
		case 68: control.right = true; return;
		case 83: control.down = true; return;
	}
}

function keyReleased(keyCode) {
	// Event for controling player when key is released
	switch(keyCode) {
		case 65: control.left = false; return;
		case 87: control.up = false; return;
		case 68: control.right = false; return;
		case 83: control.down = false; return;
	}
}

preload();