const SIZE = 64;
let rm, am, player;

let control = {
	left: false,
	up: false,
	right: false,
	down: false
};

function preload() {
	rm = new SpriteManager('res/char/main.png');
	am = new AnimationManager(rm);
}

function setup() {
	createCanvas(640, 480);
	am.add(0, 3, 12);
	am.add(4, 7, 12);
	am.add(8, 11, 12);
	am.add(12, 15, 12);
	player = new Player(0, 0, SIZE, SIZE);
}

function draw() {
	background(150);
	player.update();
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