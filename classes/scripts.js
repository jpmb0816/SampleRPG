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
	loadImage('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQgRoJS5rCeSvk7q8ViZ7Bz-X4QrB4y7vCWF0fUta6j3CVv5QSU')
	.then(img => {
	  alert(img.width);
	  srm.add('grass-tile', img);
	  alert('added');
	  // return loadImage('../res/char/main.png');
	})
	/*.then(img => {
	  srm.add('char-sprite', img);
	  return loadImage('../res/shadow/char.png');
	})
	.then(img => {
	  srm.add('char-shadow', img);
	  player = new Player(0, 0, SIZE, SIZE, srm.getImage('char-sprite'), srm.getImage('char-shadow'));
	  enemy = new DynamicObject(64, 64, SIZE, SIZE, srm.getImage('char-sprite'), [
	    { direction: 'right', x: 192, y: 64 },
	    { direction: 'down', x: 192, y: 192 },
	    { direction: 'left', x: 64, y: 192 },
	    { direction: 'up', x: 64, y: 64 }
	  	], 8, srm.getImage('char-shadow'));
	  ally = new DynamicObject(64, 0, SIZE, SIZE, srm.getImage('char-sprite'), [
	    { direction: 'right', x: mapW - SIZE, y: 0 },
	    { direction: 'down', x: mapW - SIZE, y: mapH - SIZE },
	    { direction: 'left', x: 0, y: mapH - SIZE },
	    { direction: 'up', x: 0, y: 0 }
	  	], 8, srm.getImage('char-shadow'));
	  init();
	})*/
	.catch(err => console.log(err));
}

// This will execute before rendering
function init() {
	createCanvas(640, 512);
	/*camera = new Camera(width, height, mapW, mapH);
	objects = new ObjectCollection();
	objects.add(player);
	objects.add(enemy);
	objects.add(ally);*/
	c.font = '32px Monospace';
	c.fillStyle = 'rgb(237, 28, 36)';
	// frameRate(60);
	draw();
}

// This is where rendering takes place
function draw() {
  requestAnimationFrame(draw);
	// Starting camera
	
	c.fillStyle = 'black';
	c.fillRect(0, 0, width, height);
	
	// camera.update(player.x + player.width / 2, player.y + player.height / 2);

	// This area is affected by camera
	// srm.drawRect('grass-tile', 0, 0, mapW, mapH);

	// Draw by y order
	// objects.sortbyYOrder();
	// objects.drawAll();

	// This area is not affected by camera
	// camera.stop();
	// if (frameCount % 60 === 0) fps = frameRate();
	// c.fillText('FPS: ' + fps, 32, 32);
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