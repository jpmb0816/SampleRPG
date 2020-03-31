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

	drawText(text, fontName, x, y, lineLimit, start, end) {
		const s = (start === undefined) ? 0 : start;
		const len = (end === undefined) ? text.length : end;
		const fontID = this.getFontID(fontName);

		text = text.toUpperCase();

		for (let i = s, row = 0, col = 0; i < len; i++, col++) {
			let id = text.charCodeAt(i) - 32;
			c.drawImage(this.images[fontID], id * this.charWidth, 0, this.charWidth, this.charHeight, x + col * this.charWidth, y + row * this.charHeight, this.charWidth, this.charHeight);
			
			if (col === lineLimit - 1) {
				row++;
				col = -1;
			}
		}
	}

	getFontID(fontName) {
		const len = this.fontNames.length;

		for (let i = 0; i < len; i++) {
			if (this.fontNames[i] === fontName) return i;
		}

		return -1;
	}
}