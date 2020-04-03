/**************************************************
 *                                                *
 *                 Initialization                 *
 *                                                *
 **************************************************/

// Check if mobile or not
const MOBILE = /Mobi/.test(navigator.userAgent);
const SIZE = 64;

// Map value
const mapBG = [
	[   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1],
	[   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1],
	[   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1],
	[   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1],
	[   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1],
	[   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1],
	[   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1],
	[   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1],
	[   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1],
	[   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1],
	[   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1],
	[   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1],
	[   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1],
	[   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1],
	[   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1],
	[   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1],
	[   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1],
	[   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1],
	[   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1],
	[   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1]
];

const mapFG = [
	[ 109, 108, 109, 108, 109, 108, 109, 108, 109, 108, 109, 108, 109, 108, 109, 108, 109, 108, 109, 108],
	[  93, 109,  39,  38,  39,  38,  39,  38,  39,  38,  39,  38,  39,  38,  39,  38,  39,  38,  93,  92],
	[ 109,  39,   0,   0,   0,  74,  75,   0,   0,   0,   0,   0,   0, 244, 229,   0,   0,   0,  38, 108],
	[  93,  23,   0,   0,   0,   0,   0,   0, 121,   0,   0, 121,   0,   0,   0,   0,   0,   0,  22,  92],
	[ 109,  39,   0,   0,   0,   0,   0,   0, 121,   0,   0, 121,   0,   0,   0,   0,   0,   0,  38, 108],
	[  93,  23,   0,   0, 137, 122, 122, 137, 121,   0,   0, 121, 137,   0,   0, 137,   0,   0,  22,  92],
	[ 109,  39,   0,   0, 137, 122, 122, 137, 121,   0,   0, 121, 137,   0,   0, 137,   0,   0,  38, 108],
	[  93,  23,   0,   0,   0,   0,   0,   0, 121,   0,   0, 121,   0,   0,   0,   0,   0,   0,  22,  92],
	[ 109,  39,   0, 121, 121, 121, 121, 121, 121,   0,   0, 121, 121, 121, 121, 121, 121,   0,  38, 108],
	[  93,  23,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  22,  92],
	[ 109,  39,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  38, 108],
	[  93,  23,   0, 121, 121, 121, 121, 121, 121,   0,   0, 121, 121, 121, 121, 121, 121,   0,  22,  92],
	[ 109,  39,   0,   0,   0,   0,   0,   0, 121,   0,   0, 121,   0,   0,   0,   0,   0,   0,  38, 108],
	[  93,  23,   0,   0, 137, 221, 221, 137, 121,   0,   0, 121, 137, 146, 146, 137,   0,   0,  22,  92],
	[ 109,  39,   0,   0, 137, 221, 221, 137, 121,   0,   0, 121, 137, 146, 146, 137,   0,   0,  38, 108],
	[  93,  23,   0,   0,   0,   0,   0,   0, 121,   0,   0, 121,   0,   0,   0,   0,   0,   0,  22,  92],
	[ 109,  39,   0,   0,   0,   0,   0,   0, 121,   0,   0, 121,   0,   0,   0,   0,   0,   0,  38, 108],
	[  93,  23,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  22,  92],
	[ 109, 108,  23,  22,  23,  22,  23,  22,  23,  22,  23,  22,  23,  22,  23,  22,  23,  22,  92, 108],
	[  93,  92,  93,  92,  93,  92,  93,  92,  93,  92,  93,  92,  93,  92,  93,  92,  93,  92,  93,  92]
];

// Map collision value
const mapCollisions = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
	[0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0],
	[0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
	[0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
	[0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
	[0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
	[0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
	[0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0],
	[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
	[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
	[0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0],
	[0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
	[0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0],
	[0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0],
	[0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
	[0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
	[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
	[0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

// Map columns and rows
const mapC = mapBG[0].length;
const mapR = mapBG.length;

// Map width and height
const mapW = mapC * SIZE;
const mapH = mapR * SIZE;

// Key code to be used in game
const KEY_A = 65; // A
const KEY_W = 87; // W
const KEY_D = 68; // D
const KEY_S = 83; // S
const KEY_Q = 81; // Q

// Canvas and canvas context
let canvas, c, width, height;
let mapCanvas, mapCtx;
let uiCanvas, uiCtx;
let uiTextCanvas, uiTextCtx;
let dialogCanvas, dialogCtx;

// Object used in game
let rm, camera, objects, player, dialog, font;

// Collection of keystate
let keyState = [];

// FPS
let frameCount = 0;
let lastLoop = new Date().getMilliseconds();
let count = 1;
let fps = 0;

/**************************************************
 *                                                *
 *                Extra Functions                 *
 *                                                *
 **************************************************/

// Create canvas and append to HTML Body
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

// Update FPS
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

// Loading image asynchronously and append to resource manager
function loadImage(data) {
	return new Promise(resolve => {
		const image = new Image();
		// When done loading image
		image.addEventListener('load', () => {
			if (data[2]) rm.addMultiSprite(data[0], image, data[3], data[4]);
			else rm.add(data[0], image);

			resolve();
		});
		image.src = data[1];
	});
}

// Load all images in list
function loadAll(list) {
	const promises = [];
	// Loop through each data in list and load the image
	list.forEach(data => promises.push(loadImage(data)));
	return Promise.all(promises);
}

// Grid to coordinate converter
function gridToCoordinate(n) {
	const r = n * SIZE;
	return r - r % SIZE;
}

// Coordinate to grid converter
function coordinateToGrid(n) {
	return Math.floor(n / SIZE);
}

// Get current time in hh:mm:ss format
function getCurrentTime() {
	const time = performance.now() / 1000;
	const secs = Math.floor(time % 60);
	const mins = Math.floor((time / 60) % 60);
	const hrs = Math.floor(time / 60 / 60);

	return { hrs: (hrs < 10 ? '0' : '') + hrs,
		mins: (mins < 10 ? '0' : '') + mins,
		secs: (secs < 10 ? '0' : '') + secs};
}

// Get percentage of value based on max
function getPercentage(val, max) {
	return Math.floor((val / max) * 100);
}

// Scaled to new number
function scaleValue(v, s1, e1, s2, e2) {
	return (v - s1) / (e1 - s1) * (e2 - s2) + s2;
}

// Clam value
function clamp(value, min, max) {
	if (value < min) return min;
	else if (value > max) return max;
	return value;
}

// Log the key event
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

// Draw map
function drawMap(map, ctx) {
	const row = map.length;
	const col = map[0].length;

	for (let y = 0; y < row; y++) {
		for (let x = 0; x < col; x++) {
			const valBG = mapBG[y][x] - 1;
			const valFG = mapFG[y][x] - 1;

			if (valBG > -1) rm.draw('grass', x * SIZE, y * SIZE, ctx); //
			if (valFG > -1) rm.drawMultiSprite(ctx, 'props', valFG, SIZE, SIZE, x * SIZE, y * SIZE);
		}
	}
}

// Create buttons for android support
function createButtons() {
	const interactBtn = document.createElement('button');
	const leftBtn = document.createElement('button');
	const upBtn = document.createElement('button');
	const rightBtn = document.createElement('button');
	const downBtn = document.createElement('button');
	const lowStats = document.createElement('button');
	const tp1 = document.createElement('button');
	const tp2 = document.createElement('button');
	const tp3 = document.createElement('button');
	const tp4 = document.createElement('button');
	const tp5 = document.createElement('button');

	interactBtn.innerHTML = 'INTERACT';
	leftBtn.innerHTML = 'LEFT';
	upBtn.innerHTML = 'UP';
	rightBtn.innerHTML = 'RIGHT';
	downBtn.innerHTML = 'DOWN';
	lowStats.innerHTML = 'LOW STATS';
	tp1.innerHTML = 'TP1';
	tp2.innerHTML = 'TP2';
	tp3.innerHTML = 'TP3';
	tp4.innerHTML = 'TP4';
	tp5.innerHTML = 'TP5';

	interactBtn.onclick = () => keyEventLogger({ keyCode: 81, type: 'keydown' });
	leftBtn.onclick = () => keyEventLogger({ keyCode: 65, type: 'keydown' });
	upBtn.onclick = () => keyEventLogger({ keyCode: 87, type: 'keydown' });
	rightBtn.onclick = () => keyEventLogger({ keyCode: 68, type: 'keydown' });
	downBtn.onclick = () => keyEventLogger({ keyCode: 83, type: 'keydown' });
	lowStats.onclick = () => {
		player.health = 10;
		player.mana = 0;
	};
	tp1.onclick = () => {
		player.x = 4 * SIZE;
		player.y = 3 * SIZE;
	};
	tp2.onclick = () => {
		player.x = 15 * SIZE;
		player.y = 3 * SIZE;
	};
	tp3.onclick = () => {
		player.x = 4 * SIZE;
		player.y = 16 * SIZE;
	};
	tp4.onclick = () => {
		player.x = 15 * SIZE;
		player.y = 16 * SIZE;
	};
	tp5.onclick = () => {
		player.x = 9 * SIZE;
		player.y = 7 * SIZE;
	};

	document.body.appendChild(interactBtn);
	document.body.appendChild(leftBtn);
	document.body.appendChild(upBtn);
	document.body.appendChild(rightBtn);
	document.body.appendChild(downBtn);
	document.body.appendChild(lowStats);
	document.body.appendChild(tp1);
	document.body.appendChild(tp2);
	document.body.appendChild(tp3);
	document.body.appendChild(tp4);
	document.body.appendChild(tp5);
}

/**************************************************
 *                                                *
 *               Important functions              *
 *                                                *
 **************************************************/

// This is where loading files takes place
function preload() {
	// Promises or Asynchronous functions
	rm = new ResourceManager();

	// Image to be loaded
	const imageToBeLoaded = [
		['hp-bar', 'res/ui/hp-bar.png', true, 110, 11],
		['mana-bar', 'res/ui/mana-bar.png', true, 110, 11],
		['props', 'res/tile/props.png', true, SIZE, SIZE],
		['grass', 'res/tile/grass.png'],
		['stone', 'res/tile/stone.png'],
		['barrel', 'res/tile/barrel.png'],
		['char-sprite', 'res/char/main.png'],
		['char-shadow', 'res/shadow/char.png'],
		['princess', 'res/char/princess.png'],
		['sawyer', 'res/char/sawyer.png'],
		['demi', 'res/char/demi.png'],
		['fairy', 'res/char/fairy.png'],
		['monk', 'res/char/monk.png', true, SIZE, SIZE],
		['font-red', 'res/tile/font-red.png'],
		['font-white', 'res/tile/font-white.png'],
		['dialog-box', 'res/tile/dialog-box.png']
	];

	loadAll(imageToBeLoaded)
	// When done loading all images, call the init() function
	.then(() => init())
	.catch(err => console.error(err));
}

// This will execute before rendering
function init() {
	// Creating main canvas
	createCanvas(640, 512);

	// Canvas layers
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
	uiTextCanvas.height = 100;

	dialogCanvas = document.createElement('canvas');
	dialogCtx = dialogCanvas.getContext('2d');
	dialogCanvas.width = 620;
	dialogCanvas.height = 170;

	// Our player
	player = new Player("Sora", gridToCoordinate(2), gridToCoordinate(2), SIZE, SIZE,
		rm.getImage('char-sprite'), rm.getSprite('char-shadow'));

	// Object collection for handling objects
	objects = new ObjectCollection();

	objects.add(player);

	objects.add(new DynamicEntity("Alicia", gridToCoordinate(4), gridToCoordinate(4), SIZE, SIZE,
		rm.getImage('princess'), rm.getSprite('char-shadow'), [
			['right', 7, 4],
			['down', 7, 7],
			['left', 4, 7],
			['up', 4, 4]
		], 12, "How dare you speak to me like that!"));

	objects.add(new DynamicEntity("Arthur", gridToCoordinate(12), gridToCoordinate(4), SIZE, SIZE,
		rm.getImage('sawyer'), rm.getSprite('char-shadow'), [
			['right', 15, 4],
			['left', 12, 4],
		], 12, "I remember when I was young, I used to be an adventurer like you."));

	objects.add(new DynamicEntity("Rapthalia", gridToCoordinate(4), gridToCoordinate(12), SIZE, SIZE,
		rm.getImage('demi'), rm.getSprite('char-shadow'), [
			['down', 4, 15],
			['right', 7, 15],
			['left', 4, 15],
			['up', 4, 12],
		], 12, "Please, don't hurt me!"));

	objects.add(new DynamicEntity("Leafa", gridToCoordinate(12), gridToCoordinate(12), SIZE, SIZE,
		rm.getImage('fairy'), rm.getSprite('char-shadow'), [
			['down', 12, 15],
			['right', 15, 15],
			['up', 15, 12],
			['left', 12, 12]
		], 12, "Are you the hero that they're talking about? That's amazing!",
		{ x: 0, y: 15 }));

	objects.add(new StaticEntity("Frank", gridToCoordinate(9), gridToCoordinate(8), SIZE, SIZE,
		rm.getSprite('monk'), rm.getSprite('char-shadow'), { x1: 8, x2: 8, y1: 2, y2: 4 }, null,
		[1, 4, 7, 10], "You want to learn some magic? Come at my house anytime.", true));

	objects.add(new StaticEntity("Stone", gridToCoordinate(3), gridToCoordinate(3), SIZE, SIZE * 2,
		rm.getSprite('stone'), null, { x1: 0, x2: 0, y1: 70, y2: 6 }, null, null,
		"...", false));

	objects.add(new StaticEntity("Stone", gridToCoordinate(16), gridToCoordinate(3), SIZE, SIZE * 2,
		rm.getSprite('stone'), null, { x1: 0, x2: 0, y1: 70, y2: 6 }, null, null,
		"...", false));

	objects.add(new StaticEntity("Stone", gridToCoordinate(3), gridToCoordinate(15), SIZE, SIZE * 2,
		rm.getSprite('stone'), null, { x1: 0, x2: 0, y1: 70, y2: 6 }, null, null,
		"...", false));

	objects.add(new StaticEntity("Stone", gridToCoordinate(16), gridToCoordinate(15), SIZE, SIZE * 2,
		rm.getSprite('stone'), null, { x1: 0, x2: 0, y1: 70, y2: 6 }, null, null,
		"...", false));

	objects.add(new StaticEntity("Barrel", gridToCoordinate(13), gridToCoordinate(5), SIZE * 2, SIZE * 2,
		rm.getSprite('barrel'), null, { x1: 6, x2: 8, y1: 60, y2: 16 }, null, null,
		"This thing seems to be empty.", false));

	// Camera
	camera = new Camera(width, height, mapW, mapH);

	// Font sprites
	font = new FontSprite(8, 16);
	font.add('red', rm.getImage('font-red'));
	font.add('white', rm.getImage('font-white'));

	// Dialog box
	dialog = new DialogBox(font, 65);

	// Pre-drawing
	drawMap(mapBG, mapCtx);

	// UI Text
	font.drawText(uiTextCtx, player.name, 'red', 30, 40, 16);

	font.drawText(uiTextCtx, 'TIME:', 'white', 260, 40, 5);

	font.drawText(uiTextCtx, 'X:', 'white', 500, 40, 2);
	font.drawText(uiTextCtx, 'Y:', 'white', 564, 40, 2);
	font.drawText(uiTextCtx, 'C:', 'white', 500, 60, 2);
	font.drawText(uiTextCtx, 'R:', 'white', 564, 60, 2);

	font.drawText(uiTextCtx, 'FPS:', 'white', 500, 80, 4);

	// Dialog box
	dialogCtx.drawImage(rm.getImage('dialog-box'), 0, 1100, 1200, 275, 20, 0, 600, 170);
	
	// Event listeners
	window.addEventListener('keydown', keyEventLogger);
	if (!MOBILE) window.addEventListener('keyup', keyEventLogger);
	
	if (MOBILE) createButtons();
	// Call render
	render();
}

// This is where rendering takes place
function render() {
	// Call back
	requestAnimationFrame(render);

	// Update camera view based on player position
	camera.update(player.x + player.width / 2, player.y + player.height / 2);

	// This area is affected by camera
	c.drawImage(mapCanvas, camera.x, camera.y, camera.cw, camera.ch,
		camera.x, camera.y, camera.cw, camera.ch);

	// Sort by y order and draw
	objects.sortbyYOrder();
	objects.drawAll();

	// This area is not affected by camera
	camera.stop();

	// If player is enable render it
	if (player.enable) {
		const time = getCurrentTime();

		const hp = clamp(getPercentage(player.health, player.maxHealth), 0, 100);
		const hpImg = Math.floor(scaleValue(hp, 0, 100, 5.99, 1));

		const mana = clamp(getPercentage(player.mana, player.maxMana), 0, 100);
		const manaImg = Math.floor(scaleValue(mana, 0, 100, 2.99, 1));

		rm.drawMultiSprite(uiTextCtx, 'hp-bar', 0, 110, 11, 30, 60);
		rm.drawMultiSprite(uiTextCtx, 'hp-bar', hpImg, hp, 11, 39, 60);

		rm.drawMultiSprite(uiTextCtx, 'mana-bar', 0, 110, 11, 30, 75);
		rm.drawMultiSprite(uiTextCtx, 'mana-bar', manaImg, mana, 11, 39, 75);

		font.drawText(uiTextCtx, time.hrs + ':' + time.mins + ':' + time.secs, 'white',
			308, 40, 16, true);

		font.drawText(uiTextCtx, player.x + '', 'white', 524, 40, 4, true);
		font.drawText(uiTextCtx, player.y + '', 'white', 588, 40, 4, true);

		font.drawText(uiTextCtx, coordinateToGrid(player.x) + '', 'white', 524, 60, 3, true);
		font.drawText(uiTextCtx, coordinateToGrid(player.y) + '', 'white', 588, 60, 3, true);

		font.drawText(uiTextCtx, fps + '', 'white', 540, 80, 3, true);
		
		c.drawImage(uiTextCanvas, 0, 0);
	}

	// Display dialog
	dialog.display();

	// Update FPS
	updateFPS();
}