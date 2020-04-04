class SingleSprite {
	constructor(img) {
		this.img = img;
	}

	draw(ctx, sx, sy) {
		ctx.drawImage(this.img, sx, sy);
	}
}