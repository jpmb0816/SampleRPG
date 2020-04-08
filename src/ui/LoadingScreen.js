class LoadingScreen {
	constructor(map) {
		this.map = map;
		this.alpha = 1;
		this.done = false;
	}

	displayIfDone(ctx, func) {
		if (this.map.isLoaded) {
			if (this.done || this.alpha !== 0) {
				this.done = false;
				ctx.globalAlpha = 1;
			}

			func();

			if (this.alpha === 0) this.done = true;
			else if (this.alpha > 0) {
				ctx.globalAlpha = this.alpha;
				ctx.fillStyle = 'black';
				ctx.fillRect(0, 0, width, height);
				this.alpha -= 0.02;
			}
		}
		else {
			ctx.fillStyle = 'black';
			ctx.fillRect(0, 0, width, height);

			ctx.font = '30px Arial';
			ctx.fillStyle = 'white';
			ctx.fillText(this.map.status, 20, height - 50);
		}
	}

	reset(ctx) {
		ctx.globalAlpha = 1;
		this.alpha = 1;
		this.done = false;
	}
}