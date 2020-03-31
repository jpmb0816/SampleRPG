// Initialization
const MOBILE = /Mobi/.test(navigator.userAgent);
const SIZE = 64, npc = [];
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

const KEY_A = 65;
const KEY_W = 87;
const KEY_D = 68;
const KEY_S = 83;

const KEY_Q = 81;

let canvas, c, width, height;
let tmpCanvas, tmpC;
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

function gridToCoordinate(r, c) {
	const x = r * SIZE;
	const y = c * SIZE;
	return { x: x - x % SIZE, y: y - y % SIZE };
}

function getCurrentTime() {
	const time = performance.now() / 1000;
	const secs = Math.floor(time % 60);
	const mins = Math.floor(time / 60);
	const hrs = Math.floor(mins / 60);

	return { hrs: (hrs < 10 ? '0' : '') + hrs, mins: (mins < 10 ? '0' : '') + mins, secs: (secs < 10 ? '0' : '') + secs};
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
	else {
		keyState[e.keyCode] = (e.type === 'keydown');
		lastKeyPressed = e;
	}
}

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

	tmpCanvas = document.createElement('canvas');
	tmpC = tmpCanvas.getContext('2d');
	tmpCanvas.width = mapW;
	tmpCanvas.height = mapH;

	player = new Player(0, 0, SIZE, SIZE, rm.getImage('char-sprite'), rm.getImage('char-shadow'));
	npc.push(new DynamicObject("Pico", 64, 64, SIZE, SIZE, rm.getImage('char-sprite'), rm.getImage('char-shadow'), [
		['right', 3, 1],
		['down', 3, 3],
		['left', 1, 3],
		['up', 1, 1]
	], 12, "I heard there's a ghost in town, now I can't sleep at night. So scary!"));
	npc.push(new DynamicObject("Pal", 64, 0, SIZE, SIZE, rm.getImage('char-sprite'), rm.getImage('char-shadow'), [
		['right', 19, 0],
		['down', 19, 14],
		['left', 0, 14],
		['up', 0, 0]
	], 12, "I can't wait to become adventurer."));
	npc.push(new DynamicObject("Ruben", 128, 128, SIZE, SIZE, rm.getImage('char-sprite'), rm.getImage('char-shadow'), [
		['up', 2, 0],
		['down', 2, 3]
	], 12, "Your name?"));
	npc.push(new DynamicObject("Dave", 256, 0, SIZE, SIZE, rm.getImage('char-sprite'), rm.getImage('char-shadow'), [
		['down', 4, 14],
		['up', 4, 0]
	], 12, "I can't remember. We don't know the difference between day and night anymore. It's all the same."));
	npc.push(new DynamicObject("Chad", 320, 64, SIZE, SIZE, rm.getImage('char-sprite'), rm.getImage('char-shadow'), [
		['down', 5, 14],
		['up', 5, 0]
	], 12, "I'm gonna do everything for captain."));
	npc.push(new DynamicObject("Drake", 384, 128, SIZE, SIZE, rm.getImage('char-sprite'), rm.getImage('char-shadow'), [
		['down', 6, 14],
		['up', 6, 0]
	], 12, "I'm the captain of the knights."));
	npc.push(new DynamicObject("Sid", 448, 64, SIZE, SIZE, rm.getImage('char-sprite'), rm.getImage('char-shadow'), [
		['down', 7, 14],
		['up', 7, 0]
	], 12, "Our captain was cool."));
	npc.push(new DynamicObject("Leo", 512, 0, SIZE, SIZE, rm.getImage('char-sprite'), rm.getImage('char-shadow'), [
		['down', 8, 14],
		['up', 8, 0]
	], 12, "I will protect this town."));
	

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
	rm.drawRect('grass-tile', 0, 0, mapW, mapH, tmpC);
	
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
	c.drawImage(tmpCanvas, camera.x, camera.y, camera.cw, camera.ch, camera.x, camera.y, camera.cw, camera.ch);

	// Draw by y order
	objects.sortbyYOrder();
	objects.drawAll();

	// This area is not affected by camera
	camera.stop();

	const time = getCurrentTime();

	dialog.display();
	font.drawText('FPS: ' + fps, 'red', 40, 40, 8);
	font.drawText('TIME: ' + time.hrs + ':' + time.mins + ':' + time.secs, 'red', 490, 40, 16);
	updateFPS();
}