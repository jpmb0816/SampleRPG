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

function gridToCoordinate(r, c) {
	const x = r * SIZE;
	const y = c * SIZE;
	return { x: x - x % SIZE, y: y - y % SIZE };
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
let rm, camera, objects, player, npc = [];

let frameCount = 0;

var lastLoop = (new Date()).getMilliseconds();
var count = 1;
var fps = 0;

function updateFPS() {
	const currentLoop = (new Date()).getMilliseconds();

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
	rm = new ResourceManager();
	loadImage('res/tile/grass.png')
	.then(img => {
		rm.add('grass-tile', img);
		return loadImage('res/char/main.png');
	})
	.then(img => {
		rm.add('char-sprite', img);
		return loadImage('res/shadow/char.png');
	})
	.then(img => {
		rm.add('char-shadow', img);
		init();
	})
	.catch(err => console.log(err));
}

// This will execute before rendering
function init() {
	createCanvas(640, 512);

	player = new Player(0, 0, SIZE, SIZE, rm.getImage('char-sprite'), rm.getImage('char-shadow'));
	npc.push(new DynamicObject(64, 64, SIZE, SIZE, rm.getImage('char-sprite'), rm.getImage('char-shadow'), [
		['right', 3, 1],
		['down', 3, 3],
		['left', 1, 3],
		['up', 1, 1]
	], 12));
	npc.push(new DynamicObject(64, 0, SIZE, SIZE, rm.getImage('char-sprite'), rm.getImage('char-shadow'), [
		['right', 19, 0],
		['down', 19, 14],
		['left', 0, 14],
		['up', 0, 0]
	], 12));
	npc.push(new DynamicObject(128, 128, SIZE, SIZE, rm.getImage('char-sprite'), rm.getImage('char-shadow'), [
		['up', 2, 0],
		['down', 2, 3]
	], 12));
	npc.push(new DynamicObject(256, 0, SIZE, SIZE, rm.getImage('char-sprite'), rm.getImage('char-shadow'), [
		['down', 4, 14],
		['up', 4, 0]
	], 12));
	npc.push(new DynamicObject(320, 64, SIZE, SIZE, rm.getImage('char-sprite'), rm.getImage('char-shadow'), [
		['down', 5, 14],
		['up', 5, 0]
	], 12));
	npc.push(new DynamicObject(384, 128, SIZE, SIZE, rm.getImage('char-sprite'), rm.getImage('char-shadow'), [
		['down', 6, 14],
		['up', 6, 0]
	], 12));
	npc.push(new DynamicObject(448, 64, SIZE, SIZE, rm.getImage('char-sprite'), rm.getImage('char-shadow'), [
		['down', 7, 14],
		['up', 7, 0]
	], 12));
	npc.push(new DynamicObject(512, 0, SIZE, SIZE, rm.getImage('char-sprite'), rm.getImage('char-shadow'), [
		['down', 8, 14],
		['up', 8, 0]
	], 12));
	

	camera = new Camera(width, height, mapW, mapH);

	objects = new ObjectCollection();
	objects.add(player);
	objects.addAll(npc);

	c.font = '32px Monospace';
	c.fillStyle = 'rgb(237, 28, 36)';
	
	// Event listeners
	window.addEventListener('keydown', control.update);
	window.addEventListener('keyup', control.update);
	
	render();
}

// This is where rendering takes place
function render() {
	requestAnimationFrame(render);
	// Clear canvas
	c.fillStyle = 'black';
	c.fillRect(0, 0, width, height);
	
	camera.update(player.x + player.width / 2, player.y + player.height / 2);

	// This area is affected by camera
	rm.drawRect('grass-tile', 0, 0, mapW, mapH);

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