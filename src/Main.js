/**************************************************
 *                                                *
 *                 Initialization                 *
 *                                                *
 **************************************************/

// Canvas and canvas context
let canvas, c, width, height;
let mapCanvas, mapCtx;
let uiTextCanvas, uiTextCtx;
let dialogCanvas, dialogCtx;

// Object used in game
let sm, camera, fps, objects, player, dialog, font;

/**************************************************
 *                                                *
 *                 Main functions                 *
 *                                                *
 **************************************************/

// This is where loading files takes place
function preload() {
	// Creating main canvas
	createCanvas(640, 512);

	// Loading screen
	c.fillStyle = 'black';
	c.fillRect(0, 0, width, height);

	c.font = '30px Arial';
	c.fillStyle = 'white';
	c.fillText('Loading...', 250, 260);

	// Promises or Asynchronous functions
	sm = new SpriteManager();

	loadJSON('gfx/config/main.json')
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

	// Canvas layers
	mapCanvas = document.createElement('canvas');
	mapCtx = mapCanvas.getContext('2d');
	mapCanvas.width = mapW;
	mapCanvas.height = mapH;

	uiTextCanvas = document.createElement('canvas');
	uiTextCtx = uiTextCanvas.getContext('2d');
	uiTextCanvas.width = width;
	uiTextCanvas.height = 100;

	dialogCanvas = document.createElement('canvas');
	dialogCtx = dialogCanvas.getContext('2d');
	dialogCanvas.width = 620;
	dialogCanvas.height = 170;

	// Offsets
	const offset = { x1: 8, x2: 8, y1: 32, y2: 4 };
	const shadowOffset = { x: 0, y: 5 };

	// Player
	player = new Player("Sora", gridToCoordinate(2), gridToCoordinate(2), TILE_SIZE, TILE_SIZE,
		sm.getImage('player'), sm.getSprite('char-shadow'), offset, shadowOffset);

	// Object collection for handling objects
	objects = new EntityCollection();

	objects.add(player);

	objects.add(new DynamicEntity("Alicia", gridToCoordinate(4), gridToCoordinate(4), TILE_SIZE, TILE_SIZE,
		sm.getImage('princess'), sm.getSprite('char-shadow'), offset, shadowOffset, [
			['right', 7, 4],
			['down', 7, 7],
			['left', 4, 7],
			['up', 4, 4]
		], 12, null, "How dare you speak to me like that!"));

	objects.add(new DynamicEntity("Arthur", gridToCoordinate(12), gridToCoordinate(4), TILE_SIZE, TILE_SIZE,
		sm.getImage('sawyer'), sm.getSprite('char-shadow'), offset, shadowOffset, [
			['right', 15, 4],
			['left', 12, 4],
		], 12, null, "I remember when I was young, I used to be an adventurer like you."));

	objects.add(new DynamicEntity("Rapthalia", gridToCoordinate(4), gridToCoordinate(12), TILE_SIZE, TILE_SIZE,
		sm.getImage('demi'), sm.getSprite('char-shadow'), offset, shadowOffset, [
			['down', 4, 15],
			['right', 7, 15],
			['left', 4, 15],
			['up', 4, 12],
		], 12, null, "Please, don't hurt me!"));

	objects.add(new DynamicEntity("Leafa", gridToCoordinate(12), gridToCoordinate(12), TILE_SIZE, TILE_SIZE,
		sm.getImage('fairy'), sm.getSprite('char-shadow'), offset, { x: 0, y: 15 }, [
			['down', 12, 15],
			['right', 15, 15],
			['up', 15, 12],
			['left', 12, 12]
		], 12, null, "Are you the hero that they're talking about? That's amazing!"));

	objects.add(new StaticEntity("Frank", gridToCoordinate(9), gridToCoordinate(8), TILE_SIZE, TILE_SIZE,
		sm.getSprite('monk'), sm.getSprite('char-shadow'), offset, shadowOffset, [1, 4, 7, 10],
		"You want to learn some magic? Come at my house anytime.", true));

	objects.add(new StaticEntity("Stone", gridToCoordinate(3), gridToCoordinate(3), TILE_SIZE, TILE_SIZE * 2,
		sm.getSprite('stone'), null, { x1: 0, x2: 0, y1: 70, y2: 6 }, null, null,
		"...", false));

	objects.add(new StaticEntity("Stone", gridToCoordinate(16), gridToCoordinate(3), TILE_SIZE, TILE_SIZE * 2,
		sm.getSprite('stone'), null, { x1: 0, x2: 0, y1: 70, y2: 6 }, null, null,
		"...", false));

	objects.add(new StaticEntity("Stone", gridToCoordinate(3), gridToCoordinate(15), TILE_SIZE, TILE_SIZE * 2,
		sm.getSprite('stone'), null, { x1: 0, x2: 0, y1: 70, y2: 6 }, null, null,
		"...", false));

	objects.add(new StaticEntity("Stone", gridToCoordinate(16), gridToCoordinate(15), TILE_SIZE, TILE_SIZE * 2,
		sm.getSprite('stone'), null, { x1: 0, x2: 0, y1: 70, y2: 6 }, null, null,
		"...", false));

	objects.add(new StaticEntity("Barrel", gridToCoordinate(13), gridToCoordinate(5), TILE_SIZE * 2, TILE_SIZE * 2,
		sm.getSprite('barrel'), null, { x1: 6, x2: 8, y1: 60, y2: 16 }, null, null,
		"This thing seems to be empty.", false));

	// Camera
	camera = new Camera(width, height, mapW, mapH);

	// Font sprites
	font = new FontSprite(8, 16);
	font.add('red', sm.getImage('font-red'));
	font.add('white', sm.getImage('font-white'));

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
	dialogCtx.drawImage(sm.getImage('dialog-box'), 0, 1100, 1200, 275, 20, 0, 600, 170);
	
	// Event listeners
	window.addEventListener('keydown', keyEventLogger);
	if (!MOBILE) window.addEventListener('keyup', keyEventLogger);

	canvas.addEventListener('mousemove', updateMouse);
	canvas.addEventListener('mousedown', updateMouseClick);
	canvas.addEventListener('mouseup', updateMouseClick);

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
}