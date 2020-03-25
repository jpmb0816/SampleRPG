class AnimationThread {
	constructor(sequences, delayPerFrame) {
		this.sequences = sequences;
		this.delayPerFrame = delayPerFrame;
		this.c = 0;
		this.i = this.sequences[0];
		this.isPlaying = false;
	}

	update() {
		if (this.isPlaying) {
			if (frameCount % this.delayPerFrame[this.c] === 0) {
				this.c++;
				this.i = this.sequences[this.c];
			}
			
			if (this.c >= this.sequences.length) {
				this.c = 0;
				this.i = this.sequences[this.c];
			}
		}
	}

	play() {
		this.isPlaying = true;
	}

	pause() {
		this.isPlaying = false;
	}

	reset() {
		this.c = 0;
		this.i = this.sequences[this.c];
	}

	stop() {
		this.pause();
		this.reset();
	}
}