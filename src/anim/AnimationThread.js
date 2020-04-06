class AnimationThread {
	constructor(animationSprite, sequences, origin) {
		this.animationSprite = animationSprite;
		this.sequences = sequences;
		this.origin = origin;

		this.c = origin;
		this.i = this.sequences[this.c];
		this.isPlaying = false;

		this.count = 0;
	}

	update() {
		if (this.isPlaying) {
			if (this.count % this.animationSprite.delayPerFrame === 0) {
				this.c++;
				this.i = this.sequences[this.c];
			}
			
			if (this.c >= this.sequences.length) {
				this.c = 0;
				this.i = this.sequences[this.c];
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
		this.c = this.origin;
		this.i = this.sequences[this.c];
	}

	stop() {
		if (this.isPlaying) {
			this.pause();
			this.reset();

			this.count = 0;
		}
	}
}