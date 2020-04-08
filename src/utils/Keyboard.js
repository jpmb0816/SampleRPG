// Key code to be used in game
const KEY_A = 65; // A
const KEY_W = 87; // W
const KEY_D = 68; // D
const KEY_S = 83; // S
const KEY_Q = 81; // Q
const KEY_1 = 49; // 1
const KEY_2 = 50; // 2
const KEY_K = 75; // K
const KEY_L = 76; // L

// Collection of keystate
const keyState = [];

// Log the key event
function keyEventLogger(evt) {
	if (MOBILE) {
		keyState[KEY_A] = false;
		keyState[KEY_D] = false;
		keyState[KEY_W] = false;
		keyState[KEY_S] = false;
		keyState[KEY_Q] = false;
		keyState[evt.keyCode] = (evt.type === 'keydown');
	}
	else keyState[evt.keyCode] = (evt.type === 'keydown');

	if (evt.type === 'keydown') {
		if (evt.keyCode === 49) {
			map.load('config/map/WellSpring/config.json', 'Teleporting to WellSpring Town...');
		}
		else if (evt.keyCode === 50) {
			map.load('config/map/EastHaven/config.json', 'Teleporting to EastHaven Town...');
		}
	}
}