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

	drawText(text, fontName, x, y, lineLimit, ctx, clearFirst=false) {
		if (ctx === undefined) ctx = c;

		const len = text.length;
		const fontID = this.getFontID(fontName);
		text = text.toUpperCase();

		for (let i = 0, row = 0, col = 0; i < len; i++, col++) {
			const id = text.charCodeAt(i) - 32;

			const currX = x + col * this.charWidth;
			const currY = y + row * this.charHeight;
			const w = this.charWidth;
			const h = this.charHeight;

			if (clearFirst) ctx.clearRect(currX, currY, w, h);
			ctx.drawImage(this.images[fontID], id * this.charWidth, 0, this.charWidth, this.charHeight,
				currX, currY, w, h);
			
			if (col === lineLimit - 1) {
				row++;
				col = -1;
			}
		}
	}

	drawTextInRange(text, fontName, x, y, lineLimit, end, ctx, lastPosition) {
		const start = lastPosition.index;

		if (start < end) {
			const fontID = this.getFontID(fontName);
			text = text.toUpperCase();

			let row = lastPosition.row;
			let col = lastPosition.col;
			
			let i;

			for (i = start; i < end; i++, col++) {
				const currX = col * this.charWidth + x;
				const currY = row * this.charHeight + y;
				
				const id = text.charCodeAt(i) - 32;

				ctx.drawImage(this.images[fontID], id * this.charWidth, 0, this.charWidth, this.charHeight,
					currX, currY, this.charWidth, this.charHeight);
				
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