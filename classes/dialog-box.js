class DialogBox {
	constructor(fontSprite, lineLimit) {
		this.fontSprite = fontSprite;
		this.text = "";
		this.visible = false;
		this.lineLimit = lineLimit;
	}

	display() {
		if (this.visible) {
			c.drawImage(rm.getImage('dialog-box'), 0, 1100, 1200, 275, 20, 340, 600, 170);
			this.fontSprite.drawText(this.text, 'white', 60, 400, this.lineLimit);
		}
	}
}