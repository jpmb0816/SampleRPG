/**************************************************
 *                                                *
 *                 Initialization                 *
 *                                                *
 **************************************************/

// Canvas and canvas context
let canvas, c, width, height;
let uiTextCanvas, uiTextCtx;
let dialogCanvas, dialogCtx;

// Object used in game
let sm, camera, fps, map, player, dialog, font;

/**************************************************
 *                                                *
 *                 Main functions                 *
 *                                                *
 **************************************************/

// This is where loading files takes place
function preload() {
	// Creating main canvas
	createCanvas(640, 512);

	// Promises or Asynchronous functions
	sm = new SpriteManager();

	loadJSON('config/main.json')
	.then(json => {
		const list = [];
		for (key in json) json[key].forEach(data => list.push(data));
		return loadAllSprites(list);
	})

	// When done loading all images, call the init() function
	.then(() => init())
	.catch(err => console.error(err));
}

// This will execute before rendering
function init() {
	fps = new FPS();
	map = new GameMap();

	uiTextCanvas = document.createElement('canvas');
	uiTextCtx = uiTextCanvas.getContext('2d');
	uiTextCanvas.width = width;
	uiTextCanvas.height = 100;

	dialogCanvas = document.createElement('canvas');
	dialogCtx = dialogCanvas.getContext('2d');
	dialogCanvas.width = 620;
	dialogCanvas.height = 170;

	// Player
	player = new Player("Sora", gridToCoordinate(2), gridToCoordinate(2), TILE_SIZE, TILE_SIZE,
		sm.getImage('player'), sm.getSprite('char-shadow'), { x1: 8, x2: 8, y1: 32, y2: 4 },
		{ x: 0, y: 5 });

	// Camera
	camera = new Camera(c, width, height);

	// Font sprites
	font = new FontSprite(8, 16);
	font.add('red', sm.getImage('font-red'));
	font.add('white', sm.getImage('font-white'));

	// Dialog box
	dialog = new DialogBox(font, 65);

	// UI Text
	font.drawText(uiTextCtx, player.name, 'red', 30, 40, 16);

	font.drawText(uiTextCtx, 'TIME:', 'white', 260, 40, 5);

	font.drawText(uiTextCtx, 'X:', 'white', 500, 40, 2);
	font.drawText(uiTextCtx, 'Y:', 'white', 564, 40, 2);
	font.drawText(uiTextCtx, 'C:', 'white', 500, 60, 2);
	font.drawText(uiTextCtx, 'R:', 'white', 564, 60, 2);

	font.drawText(uiTextCtx, 'FPS:', 'white', 500, 80, 4);

	// Dialog box
	dialogCtx.drawImage(sm.getImage('dialog-box'), 0, 1100, 1200, 275, 20, 0, 600, 170);
	
	// Event listeners
	window.addEventListener('keydown', keyEventLogger);
	if (!MOBILE) window.addEventListener('keyup', keyEventLogger);

	canvas.addEventListener('mousemove', updateMouse);
	canvas.addEventListener('mousedown', updateMouseClick);
	canvas.addEventListener('mouseup', updateMouseClick);

	map.load('config/map/WellSpring/config.json');

	// Call render
	render();
}

// This is where rendering takes place
function render() {
	// Call back
	requestAnimationFrame(render);

	map.loadingScreen.displayIfDone(c, () => {
		// Update camera view based on player position
		camera.update(player.x + player.width / 2, player.y + player.height / 2);

		// This area is affected by camera
		c.drawImage(map.canvas, camera.x, camera.y, camera.cw, camera.ch,
			camera.x, camera.y, camera.cw, camera.ch);

		// Sort by y order and draw
		map.entities.sortbyYOrder();
		map.entities.drawAll();

		// This area is not affected by camera
		camera.stop();

		// If player is enable render it
		if (player.enable) {
			const time = getCurrentTime();

			const hp = clamp(getPercentage(player.health, player.maxHealth), 0, 100);
			const hpImg = Math.floor(scaleValue(hp, 0, 100, 5.99, 1));

			const mana = clamp(getPercentage(player.mana, player.maxMana), 0, 100);
			const manaImg = Math.floor(scaleValue(mana, 0, 100, 2.99, 1));

			sm.drawMultiSprite(uiTextCtx, 'hp-bar', 0, 110, 11, 30, 60);
			sm.drawMultiSprite(uiTextCtx, 'hp-bar', hpImg, hp, 11, 39, 60);

			sm.drawMultiSprite(uiTextCtx, 'mana-bar', 0, 110, 11, 30, 75);
			sm.drawMultiSprite(uiTextCtx, 'mana-bar', manaImg, mana, 11, 39, 75);

			font.drawText(uiTextCtx, time.hrs + ':' + time.mins + ':' + time.secs, 'white',
				308, 40, 16, true);

			font.drawText(uiTextCtx, player.x + '', 'white', 524, 40, 4, true);
			font.drawText(uiTextCtx, player.y + '', 'white', 588, 40, 4, true);

			font.drawText(uiTextCtx, coordinateToGrid(player.x) + '', 'white', 524, 60, 3, true);
			font.drawText(uiTextCtx, coordinateToGrid(player.y) + '', 'white', 588, 60, 3, true);

			font.drawText(uiTextCtx, fps.get() + '', 'white', 540, 80, 3, true);
			
			c.drawImage(uiTextCanvas, 0, 0);
		}

		// Display dialog
		dialog.display();

		// Display mouse
		sm.drawMultiSprite(c, 'cursor', (mouse.hasClick ? 2 : 4), 15, 19, mouse.x, mouse.y);

		// Update FPS
		fps.update();
	});
}