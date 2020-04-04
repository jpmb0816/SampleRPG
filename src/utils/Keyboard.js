// Key code to be used in game
const KEY_A = 65; // A
const KEY_W = 87; // W
const KEY_D = 68; // D
const KEY_S = 83; // S
const KEY_Q = 81; // Q

// Collection of keystate
const keyState = [];

// Log the key event
function keyEventLogger(e) {
	if (MOBILE) {
		keyState[KEY_A] = false;
		keyState[KEY_D] = false;
		keyState[KEY_W] = false;
		keyState[KEY_S] = false;
		keyState[KEY_Q] = false;
		keyState[e.keyCode] = (e.type === 'keydown');
	}
	else keyState[e.keyCode] = (e.type === 'keydown');
}