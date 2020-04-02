class FontSprite {
	constructor(charWidth, charHeight) {
		this.fontNames = []
		this.images = [];
		this.charWidth = charWidth;
		this.charHeight = charHeight;
	}

	add(name, image) {
		this.fontNames.push(name);
		this.images.push(image);
	}

	drawText(ctx, text, fontName, x, y, lineLimit, cleanFirst=false) {
		if (ctx === undefined) ctx = c;

		text = text.toUpperCase();

		const len = text.length;
		const fontID = this.getFontID(fontName);
		const w = this.charWidth;
		const h = this.charHeight;

		for (let i = 0, row = 0, col = 0; i < len; i++, col++) {
			const id = text.charCodeAt(i) - 32;
			
			const currX = x + col * w;
			const currY = y + row * h;

			if (cleanFirst && col === 0) ctx.clearRect(currX, currY, w * lineLimit, h);

			if (id !== 0) {
				ctx.drawImage(this.images[fontID], id * w, 0, w, h,
					currX, currY, w, h);
			}

			if (col === lineLimit - 1) {
				row++;
				col = -1;
			}
		}
	}

	drawTextInRange(ctx, text, fontName, x, y, lineLimit, end, lastPosition) {
		const start = lastPosition.index;

		if (start < end) {
			text = text.toUpperCase();

			const fontID = this.getFontID(fontName);
			const w = this.charWidth;
			const h = this.charHeight;

			let row = lastPosition.row;
			let col = lastPosition.col;
			let i;

			for (i = start; i < end; i++, col++) {
				const id = text.charCodeAt(i) - 32;

				if (id !== 0) {
					const currX = col * w + x;
					const currY = row * h + y;

					ctx.drawImage(this.images[fontID], id * w, 0, w, h,
						currX, currY, w, h);
				}
				
				if (col === lineLimit - 1) {
					row++;
					col = -1;
				}
			}

			return { row: row, col: col, index: i };
		}

		return lastPosition;
	}

	getFontID(fontName) {
		const len = this.fontNames.length;

		for (let i = 0; i < len; i++) {
			if (this.fontNames[i] === fontName) return i;
		}

		return -1;
	}
}