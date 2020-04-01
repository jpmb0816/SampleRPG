class SingleSprite {
	constructor(img) {
		this.img = img;
	}

	draw(x, y, ctx) {
		if (ctx === undefined) ctx = c;
		ctx.drawImage(this.img, x, y);
	}
}