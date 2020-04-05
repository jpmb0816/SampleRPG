class StaticEntity {
	constructor(name, x, y, width, height, mainSprite, shadowSprite,
		offset, shadowOffset, spriteIDs, message, isChanging=false, type='default') {

		this.id = null;
		this.x = x;
		this.y = y;

		this.width = width;
		this.height = height;

		this.mainSprite = mainSprite;
		this.shadowSprite = shadowSprite;

		this.type = type;
		this.isChanging = isChanging;

		if (spriteIDs !== null) {
			this.spriteIDs = spriteIDs;
			this.spriteID = spriteIDs[0];
		}

		this.offset = (offset === null) ? { x1: 0, x2: 0, y1: 0, y2: 0 } : offset;
		this.shadowOffset = (shadowOffset === null) ? { x: 0, y: 0 } : shadowOffset;

		this.name = name;
		this.message = message;
		this.interactingTo = null;
	}

	update() {
		if (this.interactingTo === null) {
			if (this.spriteID !== 0) this.spriteID = 0;
		}
		else {
			switch (this.interactingTo.facing) {
				case 'left': this.spriteID = 2; break;
				case 'up': this.spriteID = 0; break;
				case 'right': this.spriteID = 1; break;
				case 'down': this.spriteID = 3; break;
			}
		}
	}

	draw() {
		if (this.x < camera.x + camera.cw && this.x + this.width > camera.x &&
			this.y < camera.y + camera.ch && this.y + this.height > camera.y) {
			
			if (this.shadowSprite !== undefined) this.shadowSprite.draw(c, this.x + this.shadowOffset.x, this.y + this.shadowOffset.y);

			if (this.isChanging) this.mainSprite.draw(c, this.spriteIDs[this.spriteID],
				this.width, this.height, this.x, this.y);
			else this.mainSprite.draw(c, this.x, this.y, c);
		}
		
		if (this.isChanging) this.update();
	}
}