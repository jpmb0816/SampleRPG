// Initialization
const MOBILE = /Mobi/.test(navigator.userAgent);
const SIZE = 64, npc = [];

const map = [
	[ 1,  1,  1,  1,  2,  3,  7,  3,  4,  1,  1,  1,  1],
	[ 1,  1,  1,  1,  5,  1,  8,  1, 10,  1,  1,  1,  1],
	[ 1,  2,  3,  3,  6,  1,  1,  1,  9,  3,  3,  4,  1],
	[ 1,  5,  1,  1,  1, 19,  1,  1,  1,  1,  1, 10,  1],
	[ 1, 11,  1,  1,  1,  1,  1, 19,  1,  1,  1, 12,  1],
	[ 1,  5,  1,  1,  1,  1, 19,  1,  1,  1,  1, 10,  1],
	[ 1, 14, 15, 15, 17,  1,  1,  1, 18, 15, 15, 16,  1],
	[ 1,  1,  1,  1,  5,  1,  1,  1, 10,  1,  1,  1,  1],
	[ 1,  1,  1,  1,  5,  1,  1,  1, 10,  1,  1,  1,  1],
	[ 1,  1,  1,  1, 14, 15, 13, 15, 16,  1,  1, 19,  1],
	[ 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1]
];
const mapCollisions = [
	[0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0],
	[0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
	[0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0],
	[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
	[0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0],
	[0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
	[0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
	[0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const mapC = map[0].length;
const mapR = map.length;

const mapW = mapC * SIZE;
const mapH = mapR * SIZE;

const KEY_A = 65;
const KEY_W = 87;
const KEY_D = 68;
const KEY_S = 83;

const KEY_Q = 81;

let canvas, c, width, height;
let mapCanvas, mapCtx;
let uiCanvas, uiCtx;
let uiTextCanvas, uiTextCtx;
let dialogCanvas, dialogCtx;
let rm, camera, objects, player, dialog, font;
let keyState = [];

let frameCount = 0;
let lastLoop = new Date().getMilliseconds();
let count = 1;
let fps = 0;

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

function updateFPS() {
	const currentLoop = new Date().getMilliseconds();

	if (lastLoop > currentLoop) {
		fps = count;
		count = 1;
	}
	else count += 1;

	lastLoop = currentLoop;
	frameCount++;
}

function loadImage(url) {
	return new Promise(resolve => {
		const image = new Image();
		image.addEventListener('load', () => resolve(image));
		image.src = url;
	});
}

function gridToCoordinate(n) {
	const r = n * SIZE;
	return r - r % SIZE;
}

function coordinateToGrid(n) {
	return Math.floor(n / SIZE);
}

function getCurrentTime() {
	const time = performance.now() / 1000;
	const secs = Math.floor(time % 60);
	const mins = Math.floor((time / 60) % 60);
	const hrs = Math.floor(time / 60 / 60);

	return { hrs: (hrs < 10 ? '0' : '') + hrs,
		mins: (mins < 10 ? '0' : '') + mins,
		secs: (secs < 10 ? '0' : '') + secs};
}

function keyEventLogger(e) {
	if (MOBILE) {
		keyState[KEY_A] = false;
		keyState[KEY_D] = false;
		keyState[KEY_W] = false;
		keyState[KEY_S] = false;
		keyState[KEY_Q] = false;
		keyState[e.keyCode] = (e.type === 'keydown');
	}
	else keyState[e.keyCode] = (e.type === 'keydown');
}

function loadMap(map, ctx) {
	const row = map.length;
	const col = map[0].length;

	for (let y = 0; y < row; y++) {
		for (let x = 0; x < col; x++) {
			const val = map[y][x] - 1;

			rm.drawMultiSprite('grass', val, x * SIZE, y * SIZE, ctx);
		}
	}
}

// This is where loading files takes place
function preload() {
	// Promises or Asynchronous functions
	rm = new ResourceManager();
	loadImage('res/char/char-ui.png')
	.then(img => {
		rm.add('char-ui', img);
		return loadImage('res/tile/grass-tileset.png');
	})
	.then(img => {
		rm.addMultiSprite('grass', img);
		return loadImage('res/char/main.png');
	})
	.then(img => {
		rm.add('char-sprite', img);
		return loadImage('res/shadow/char.png');
	})
	.then(img => {
		rm.add('char-shadow', img);
		return loadImage('res/tile/font-green.png');
	})
	.then(img => {
		rm.add('font-green', img);
		return loadImage('res/tile/font-red.png');
	})
	.then(img => {
		rm.add('font-red', img);
		return loadImage('res/tile/font-white.png');
	})
	.then(img => {
		rm.add('font-white', img);
		return loadImage('res/tile/dialog-box.png');
	})
	.then(img => {
		rm.add('dialog-box', img);
		init();
	})
	.catch(err => console.log(err));
}

// This will execute before rendering
function init() {
	createCanvas(640, 512);

	mapCanvas = document.createElement('canvas');
	mapCtx = mapCanvas.getContext('2d');
	mapCanvas.width = mapW;
	mapCanvas.height = mapH;

	uiCanvas = document.createElement('canvas');
	uiCtx = uiCanvas.getContext('2d');
	uiCanvas.width = width;
	uiCanvas.height = height;

	uiTextCanvas = document.createElement('canvas');
	uiTextCtx = uiTextCanvas.getContext('2d');
	uiTextCanvas.width = width;
	uiTextCanvas.height = height;

	dialogCanvas = document.createElement('canvas');
	dialogCtx = dialogCanvas.getContext('2d');
	dialogCanvas.width = 620;
	dialogCanvas.height = 170;

	player = new Player("AisakiChan", 0, 0, SIZE, SIZE, rm.getImage('char-sprite'), rm.getSprite('char-shadow'));
	npc.push(new DynamicObject("Del", gridToCoordinate(4), gridToCoordinate(3), SIZE, SIZE, rm.getImage('char-sprite'), rm.getSprite('char-shadow'), [
		['right', 8, 3],
		['down', 8, 5],
		['left', 4, 5],
		['up', 4, 3]
	], 12, "I heard there's a ghost in town, now I can't sleep at night. So scary!"));
	npc.push(new DynamicObject("Sid", gridToCoordinate(7), gridToCoordinate(4), SIZE, SIZE, rm.getImage('char-sprite'), rm.getSprite('char-shadow'), [
		['left', 5, 4],
		['right', 7, 4]
	], 12, "I can't remember. We don't know the difference between day and night anymore. It's all the same."));

	camera = new Camera(width, height, mapW, mapH);
	objects = new ObjectCollection();
	objects.add(player);
	objects.addAll(npc);

	font = new FontSprite(8, 16);
	font.add('green', rm.getImage('font-green'));
	font.add('red', rm.getImage('font-red'));
	font.add('white', rm.getImage('font-white'));

	dialog = new DialogBox(font, 65);

	// Pre-drawing
	loadMap(map, mapCtx);

	uiCtx.drawImage(rm.getImage('dialog-box'), 0, 275, 1200, 275, 490, 25, 132, 66);
	uiCtx.drawImage(rm.getImage('char-ui'), 10, 0);
	font.drawText(player.name, 'white', 140, 40, 16, uiCtx);

	dialogCtx.drawImage(rm.getImage('dialog-box'), 0, 1100, 1200, 275, 20, 0, 600, 170);
	
	// Event listeners
	window.addEventListener('keydown', keyEventLogger);
	if (!MOBILE) window.addEventListener('keyup', keyEventLogger);
	
	render();
}

// This is where rendering takes place
function render() {
	requestAnimationFrame(render);

	// Update camera view based on player position
	camera.update(player.x + player.width / 2, player.y + player.height / 2);

	// This area is affected by camera
	c.drawImage(mapCanvas, camera.x, camera.y, camera.cw, camera.ch,
		camera.x, camera.y, camera.cw, camera.ch);

	// Draw by y order
	objects.sortbyYOrder();
	objects.drawAll();

	// This area is not affected by camera
	camera.stop();

	dialog.display();

	const time = getCurrentTime();
	font.drawText('X: ' + player.x, 'white', 140, 60, 8, uiTextCtx, true);
	font.drawText('Y: ' + player.y, 'white', 140, 80, 8, uiTextCtx, true);
	font.drawText('C: ' + coordinateToGrid(player.x), 'white', 204, 60, 8, uiTextCtx, true);
	font.drawText('R: ' + coordinateToGrid(player.y), 'white', 204, 80, 8, uiTextCtx, true);
	font.drawText('TIME: ' + time.hrs + ':' + time.mins + ':' + time.secs, 'white',
		500, 40, 16, uiTextCtx, true);
	font.drawText('FPS: ' + fps, 'white', 500, 60, 8, uiTextCtx, true);

	c.drawImage(uiCanvas, 0, 0);
	c.drawImage(uiTextCanvas, 0, 0);
	updateFPS();
}