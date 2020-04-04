class AnimationThread {
	constructor(delayPerFrame, sequences, origin) {
		this.delayPerFrame = delayPerFrame;
		this.sequences = sequences;
		this.origin = origin;

		this.c = origin;
		this.i = this.sequences[0];
		this.isPlaying = false;
	}

	update() {
		if (this.isPlaying) {
			const delay = Number.isInteger(this.delayPerFrame) ?
			this.delayPerFrame : this.delayPerFrame[this.c];
			
			if (fps.getFrameCount() % delay === 0) {
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
		this.c = this.origin;
		this.i = this.sequences[this.c];
	}

	stop() {
		this.pause();
		this.reset();
	}
}