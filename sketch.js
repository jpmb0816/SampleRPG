// Initialization
const SIZE = 64;
let srm, camera, objects, player, enemy, ally;
let fps = 0;

let control = {
	left: false,
	up: false,
	right: false,
	down: false
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

function drawMap(rows, cols) {
	for (let y = 0; y < cols; y++) {
		for (let x = 0; x < rows; x++) {
			let value = map[y][x];
			srm.draw('grass-tile', x * SIZE, y * SIZE);
		}
	}
}

function getRandomDirection() {
	let directions = ['left', 'up', 'right', 'down'];
	return directions[floor(random(0, directions.length))];
}

// This is where loading files takes place
function preload() {
	srm = new StaticResourceManager();
	srm.add('grass-tile', 'res/tile/grass.png');
	srm.add('bg-shadow', 'res/shadow/bg.png');
	
	player = new Player(0, 0, SIZE, SIZE);
	enemy = new DynamicObject(64, 64, SIZE, SIZE, 'res/char/main.png', [
		{ direction: 'right', x: 192, y: 64 },
		{ direction: 'down', x: 192, y: 192 },
		{ direction: 'left', x: 64, y: 192 },
		{ direction: 'up', x: 64, y: 64 }
	], 8);
	ally = new DynamicObject(64, 0, SIZE, SIZE, 'res/char/main.png', [
		{ direction: 'right', x: mapW - SIZE, y: 0 },
		{ direction: 'down', x: mapW - SIZE, y: mapH - SIZE },
		{ direction: 'left', x: 0, y: mapH - SIZE },
		{ direction: 'up', x: 0, y: 0 }
	], 8);
}

// This will execute before rendering
function setup() {
	createCanvas(640, 512);
	camera = new Camera(width, height, mapW, mapH);
	objects = new ObjectCollection();
	objects.add(player);
	objects.add(enemy);
	objects.add(ally);
	textSize(32);
	textFont('Monospace');
	fill(237, 28, 36);
}

// This is where rendering takes place
function draw() {
	// Starting camera
	camera.start();
	background(0);
	camera.update(player.x + player.width / 2, player.y + player.height / 2);

	// This area is affected by camera
	srm.drawRect('grass-tile', 0, 0, mapW, mapH);

	// Draw by y order
	objects.sortbyYOrder();
	objects.drawAll();

	// This area is not affected by camera
	camera.stop();
	if (frameCount % 60 === 0) fps = getFrameRate();
	text('FPS: ' + floor(fps), 32, 32, 250, 64);
}

function keyPressed() {
	// Event for controling player when key is pressed
	switch(keyCode) {
		case 65: control.left = true; return;
		case 87: control.up = true; return;
		case 68: control.right = true; return;
		case 83: control.down = true; return;
	}
}

function keyReleased() {
	// Event for controling player when key is released
	switch(keyCode) {
		case 65: control.left = false; return;
		case 87: control.up = false; return;
		case 68: control.right = false; return;
		case 83: control.down = false; return;
	}
}