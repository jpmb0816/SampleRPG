class DialogBox {
	constructor() {
		this.text = "";
		this.visible = false;
	}

	display() {
		if (this.visible) c.fillText(this.text, 40, 450);
	}
}