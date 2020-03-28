class StaticSprite {
	constructor(img) {
		this.img = img;
	}

	draw(x, y, context) {
		if (context === undefined) context = c;
		context.drawImage(this.img, x, y);
	}
}