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
const KEY_V = 86; // V
const KEY_C = 67; // C

const ARR_LEFT = 37; // LEFT
const ARR_RIGHT = 39; // RIGHT
const ARR_UP = 38; // UP
const ARR_DOWN = 40; // DOWN

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

		keyState[KEY_1] = false;
		keyState[KEY_2] = false;

		keyState[KEY_K] = false;
		keyState[KEY_L] = false;

		keyState[KEY_V] = false;
		keyState[KEY_C] = false;

		keyState[ARR_LEFT] = false;
		keyState[ARR_RIGHT] = false;
		keyState[ARR_UP] = false;
		keyState[ARR_DOWN] = false;

		keyState[evt.keyCode] = (evt.type === 'keydown');
	}
	else keyState[evt.keyCode] = (evt.type === 'keydown');

	if (evt.type === 'keydown') {
		if (keyState[KEY_1]) {
			map.load('config/map/WellSpring/config.json', 'Teleporting to WellSpring...');
		}
		else if (keyState[KEY_2]) {
			map.load('config/map/EastHaven/config.json', 'Teleporting to EastHaven...');
		}
		else if (keyState[KEY_V]) {
			map.wireframe = !map.wireframe;
		}
		else if (keyState[KEY_C]) {
			player.speed = (player.speed === 16) ? 1600 : 16;
		}
	}
}