const SIZE = 64;
let srm, player;
let fps = 0;
let enemy;

let control = {
	left: false,
	up: false,
	right: false,
	down: false
};

function preload() {
	srm = new StaticResourceManager();
	srm.add('grass-tile', 'res/tile/grass.png');
	srm.add('bg-shadow', 'res/shadow/bg.png');
	
	player = new Player(0, 0, SIZE, SIZE);
	enemy = new DynamicObject(64, 64, SIZE, SIZE, 'res/char/main.png', [
		[0, 1, 2, 3],
		[4, 5, 6, 7],
		[8, 9, 10, 11],
		[12, 13, 14, 15]
	], [
		[8, 8, 8, 8],
		[8, 8, 8, 8],
		[8, 8, 8, 8],
		[8, 8, 8, 8]
	], [
		{ direction: 'right', x: 128, y: 64 },
		{ direction: 'down', x: 128, y: 128 },
		{ direction: 'left', x: 64, y: 128 },
		{ direction: 'up', x: 64, y: 64 }
	]);
}

function setup() {
	createCanvas(640, 480);
	textSize(32);
	textFont('Monospace');
	fill(237, 28, 36);
}

function draw() {
	srm.drawRect('grass-tile', 0, 0, width, height);
	enemy.draw();
	player.draw();
	srm.draw('bg-shadow', 0, 0);

	if (frameCount % 60 === 0) fps = getFrameRate();
	text('FPS: ' + floor(fps), 32, 32, 150, 64);
}

function keyPressed() {
	switch(keyCode) {
		case 65: control.left = true; return;
		case 87: control.up = true; return;
		case 68: control.right = true; return;
		case 83: control.down = true; return;
	}
}

function keyReleased() {
	switch(keyCode) {
		case 65: control.left = false; return;
		case 87: control.up = false; return;
		case 68: control.right = false; return;
		case 83: control.down = false; return;
	}
}