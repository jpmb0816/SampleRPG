class AnimationThread {
	constructor(animSprite, sequences, origin) {
		this.animSprite = animSprite;
		this.sequences = sequences;
		this.origin = origin;

		this.col = origin;
		this.index = this.sequences[this.col];
		this.isPlaying = false;

		this.count = 0;
	}

	update() {
		if (this.isPlaying) {
			if (this.count % this.animSprite.delayPerFrame === 0) {
				this.col++;
				this.index = this.sequences[this.col];
			}
			if (this.col >= this.sequences.length) {
				this.col = 0;
				this.index = this.sequences[this.col];
			}
			this.count++;
		}
	}

	play() {
		if (!this.isPlaying) {
			this.isPlaying = true;
			this.count = 0;
		}
	}

	pause() {
		this.isPlaying = false;
	}

	reset() {
		this.col = this.origin;
		this.index = this.sequences[this.col];
	}

	stop() {
		if (this.isPlaying) {
			this.pause();
			this.reset();
			this.count = 0;
		}
	}
}