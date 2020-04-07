class StaticEntity {
	constructor(name, x, y, w, h, mainSprite, shadowSprite,
		mainOffset, shadowOffset, spriteIDs, message, isChanging=false, isCollidable=true) {

		this.id = null;
		this.x = x;
		this.y = y;

		this.w = w;
		this.h = h;

		this.mainSprite = mainSprite;
		this.shadowSprite = shadowSprite;

		this.isCollidable = isCollidable;
		this.isChanging = isChanging;

		if (spriteIDs !== null) {
			this.spriteIDs = spriteIDs;
			this.spriteID = spriteIDs[0];
		}

		this.mainOffset = (mainOffset === null) ? { x1: 0, x2: 0, y1: 0, y2: 0 } : mainOffset;
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
		if (this.x < camera.x + camera.cw && this.x + this.w > camera.x &&
			this.y < camera.y + camera.ch && this.y + this.h > camera.y) {
			
			if (this.shadowSprite !== undefined) this.shadowSprite.draw(c, this.x + this.shadowOffset.x, this.y + this.shadowOffset.y);

			if (this.isChanging) this.mainSprite.draw(c, this.spriteIDs[this.spriteID],
				this.w, this.h, this.x, this.y);
			else this.mainSprite.draw(c, this.x, this.y, c);
		}
		
		if (this.isChanging) this.update();
	}
}