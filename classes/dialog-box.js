class DialogBox {
	constructor(fontSprite, lineLimit) {
		this.fontSprite = fontSprite;
		this.name = "";
		this.text = "";
		this.length = 0;
		this.visible = false;
		this.lineLimit = lineLimit;
		this.i = 0;
		this.canContinue = false;
	}

	display() {
		if (this.visible) {
			if (!this.canContinue && this.i >= this.length) {
				this.i = this.length;
				this.canContinue = true;
			}

			c.drawImage(rm.getImage('dialog-box'), 0, 1100, 1200, 275, 20, 340, 600, 170);
			this.fontSprite.drawText(this.name, 'red', 60, 380, this.lineLimit);
			this.fontSprite.drawText(this.text, 'white', 60, 400, this.lineLimit, 0, this.i);

			if (!this.canContinue && this.i < this.length) if (frameCount % 2 === 0) this.i++;
		}
	}

	setText(name, text) {
		this.i = 0;
		this.name = name;
		this.text = text;
		this.length = text.length;
	}
}