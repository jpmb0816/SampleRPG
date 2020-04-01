class MultiSprite {
	constructor(img) {
		this.img = img;
		this.coordinates = [];

		const row = img.height;
		const col = img.width;

		for (let y = 0; y < row; y += SIZE) {
			for (let x = 0; x < col; x += SIZE) {
				this.coordinates.push({ x: x, y: y });
			}
		}
	}

	draw(id, x, y, ctx) {
		if (ctx === undefined) ctx = c;
		ctx.drawImage(this.img, this.coordinates[id].x, this.coordinates[id].y, SIZE, SIZE,
			x, y, SIZE, SIZE);
	}
}