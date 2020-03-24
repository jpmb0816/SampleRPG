const SIZE = 64;
let rm, am, player;
let tpf = 8;
let fps = 0;
let shadow;
let bgtile;
let bgshadow;

let control = {
	left: false,
	up: false,
	right: false,
	down: false
};

function preload() {
	rm = new SpriteManager('res/char/main.png');
	am = new AnimationManager(rm);
	shadow = loadImage('res/shadow/char.png');
	bgtile = loadImage('res/tile/grass.png');
	bgshadow = loadImage('res/shadow/bg.png');
}

function setup() {
	createCanvas(640, 480);
	am.add(0, 3, tpf);
	am.add(4, 7, tpf);
	am.add(8, 11, tpf);
	am.add(12, 15, tpf);
	player = new Player(0, 0, SIZE, SIZE);
	textSize(32);
	textFont('Monospace');
	fill(237, 28, 36);
}

function draw() {
	for (let y = 0; y < height; y += SIZE) {
		for (let x = 0; x < width; x += SIZE) {
			image(bgtile, x, y);
		}
	}
	image(shadow, player.x, player.y);
	player.update();
	image(bgshadow, 0, 0);
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