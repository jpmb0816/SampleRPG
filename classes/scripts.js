// Initialization
const MOBILE = /Mobi/.test(navigator.userAgent);
const SIZE = 64, npc = [];
const control = {
	talk: false,
	enable: true,
	left: false,
	up: false,
	right: false,
	down: false,
	// Event for controling player when key is released
	update: function(evt) {
		const val = (evt.type === 'keydown') ? true : false;

		switch (evt.keyCode) {
			case 65: // W
				if (control.enable) {
					control.left = val;
					control.resetExcept(1);
				}
				break;
			case 87: // A
				if (control.enable) {
					control.up = val;
					control.resetExcept(2);
				}
				break;
			case 68: // S
				if (control.enable) {
					control.right = val;
					control.resetExcept(3);
				}
				break;
			case 83: // D
				if (control.enable) {
					control.down = val;
					control.resetExcept(4);
				}
				break;
			case 81: // Q
				if (val) control.talk = !control.talk;
				break;
		}
	},
	resetExcept: function(e) {
		if (MOBILE) {
			if (e !== 1) control.left = false;
			if (e !== 2) control.up = false;
			if (e !== 3) control.right = false;
			if (e !== 4) control.down = false;
		}
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

// const mapW = 15000;
// const mapH = 15000;

let canvas, c, width, height;
let tmpCanvas, tmpC;
let rm, camera, objects, player, dialog;

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

	tmpCanvas = document.createElement('canvas');
	tmpC = tmpCanvas.getContext('2d');
	tmpCanvas.width = mapW;
	tmpCanvas.height = mapH;

	player = new Player(0, 0, SIZE, SIZE, rm.getImage('char-sprite'), rm.getImage('char-shadow'));
	npc.push(new DynamicObject(64, 64, SIZE, SIZE, rm.getImage('char-sprite'), rm.getImage('char-shadow'), [
		['right', 3, 1],
		['down', 3, 3],
		['left', 1, 3],
		['up', 1, 1]
	], 12, "Hi, how are you?"));
	npc.push(new DynamicObject(64, 0, SIZE, SIZE, rm.getImage('char-sprite'), rm.getImage('char-shadow'), [
		['right', 19, 0],
		['down', 19, 14],
		['left', 0, 14],
		['up', 0, 0]
	], 12, "I'm excited to become adventurer."));
	npc.push(new DynamicObject(128, 128, SIZE, SIZE, rm.getImage('char-sprite'), rm.getImage('char-shadow'), [
		['up', 2, 0],
		['down', 2, 3]
	], 12, "How was your day?"));
	npc.push(new DynamicObject(256, 0, SIZE, SIZE, rm.getImage('char-sprite'), rm.getImage('char-shadow'), [
		['down', 4, 14],
		['up', 4, 0]
	], 12, "I will protect this town."));
	npc.push(new DynamicObject(320, 64, SIZE, SIZE, rm.getImage('char-sprite'), rm.getImage('char-shadow'), [
		['down', 5, 14],
		['up', 5, 0]
	], 12, "I'm gonna do everything for captain."));
	npc.push(new DynamicObject(384, 128, SIZE, SIZE, rm.getImage('char-sprite'), rm.getImage('char-shadow'), [
		['down', 6, 14],
		['up', 6, 0]
	], 12, "I'm the captain of the knights."));
	npc.push(new DynamicObject(448, 64, SIZE, SIZE, rm.getImage('char-sprite'), rm.getImage('char-shadow'), [
		['down', 7, 14],
		['up', 7, 0]
	], 12, "Our captain was cool."));
	npc.push(new DynamicObject(512, 0, SIZE, SIZE, rm.getImage('char-sprite'), rm.getImage('char-shadow'), [
		['down', 8, 14],
		['up', 8, 0]
	], 12, "Don't disturb us, we are marching."));
	

	camera = new Camera(width, height, mapW, mapH);

	objects = new ObjectCollection();
	objects.add(player);
	objects.addAll(npc);

	dialog = new DialogBox();


	c.font = '32px Monospace';
	c.fillStyle = 'rgb(237, 28, 36)';

	// Pre-drawing
	rm.drawRect('grass-tile', 0, 0, mapW, mapH, tmpC);
	
	// Event listeners
	window.addEventListener('keydown', control.update);
	if (!MOBILE) window.addEventListener('keyup', control.update);
	
	render();
}

// This is where rendering takes place
function render() {
	requestAnimationFrame(render);
	// Clear canvas

	camera.update(player.x + player.width / 2, player.y + player.height / 2);

	// This area is affected by camera
	c.drawImage(tmpCanvas, camera.x, camera.y, camera.cw, camera.ch, camera.x, camera.y, camera.cw, camera.ch);

	// Draw by y order
	objects.sortbyYOrder();
	objects.drawAll();

	// This area is not affected by camera
	camera.stop();

	dialog.display();

	c.fillStyle = 'red';
	c.fillText('FPS: ' + fps, 40, 40);
	updateFPS();
}