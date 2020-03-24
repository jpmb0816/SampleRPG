class DynamicSprite {
	constructor(sId, eId, timeOutPerFrame) {
		this.sId = sId;
		this.eId = eId;
		this.timeOutPerFrame = timeOutPerFrame;
		this.i = sId;
		this.isPlaying = false;
	}

	update() {
		if (this.isPlaying) {
			if (frameCount % this.timeOutPerFrame === 0) this.i++;
			if (this.i > this.eId) this.i = this.sId;
		}
	}

	play() {
		this.isPlaying = true;
	}

	pause() {
		this.isPlaying = false;
	}

	reset() {
		this.i = this.sId;
	}

	stop() {
		this.pause();
		this.reset();
	}
}