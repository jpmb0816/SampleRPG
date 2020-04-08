class DialogBox {
	constructor(fontSprite, lineLimit) {
		this.fontSprite = fontSprite;
		this.name = "";
		this.text = "";
		this.index = 1;
		this.length = 0;
		this.count = 0;
		this.countCD = 2;
		this.visible = false;
		this.canContinue = false;
		this.canDrawAuthor = true;
		this.canDrawText = true;
		this.lineLimit = lineLimit;
		this.lastPosition = { row: 0, col: 0, index: 0 };
	}

	display() {
		if (this.visible) {
			c.drawImage(dialogCanvas, 0, 340);
			this.drawAuthorOnce();
			const len = this.length;

			if (!this.canContinue && this.index >= len) {
				this.index = len;
				this.canContinue = true;
				this.drawText();
			}

			if (!this.canContinue && this.index < len) {
				this.drawText();
				if (this.count === this.countCD) {
					this.index++;
					this.count = 0;
				}
				if (this.count < this.countCD) this.count++;
			}
		}
	}

	drawAuthorOnce() {
		if (this.canDrawAuthor) {
			this.fontSprite.drawText(dialogCtx, this.name, 'red', 60, 40, this.lineLimit);
			this.canDrawAuthor = false;
		}
	}

	drawText() {
		this.lastPosition = this.fontSprite.drawTextInRange(dialogCtx, this.text, 'white', 60, 60,
			this.lineLimit, this.index, this.lastPosition);
	}

	reset() {
		this.name = '';
		this.text = '';
		this.length = 0;
		this.visible = false;
		this.canContinue = false;
		this.canDrawAuthor = true;
		this.lastPosition = { row: 0, col: 0, index: 0};
		dialogCtx.clearRect(0, 0, 620, 170);
		dialogCtx.drawImage(sm.getImage('dialog-box'), 0, 1100, 1200, 275, 20, 0, 600, 170);
	}

	setText(name, text) {
		this.index = 1;
		this.name = name;
		this.text = text;
		this.length = text.length;
		this.visible = true;
	}
}