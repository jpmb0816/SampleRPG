class SignPost extends StaticEntity {
	constructor(name, x, y, w, h, mainSprite, shadowSprite, mainOffset, shadowOffset,
		spriteIDs, message, isChanging=false, isCollidable=true) {

		super(name, x, y, w, h, mainSprite, shadowSprite, mainOffset, shadowOffset,
		spriteIDs, message, isChanging, isCollidable);
	}

	update() {
		if (!this.interactingTo) {
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
		if (this.cx < camera.x + camera.cw && this.cx + this.w > camera.x &&
			this.cy < camera.y + camera.ch && this.cy + this.h > camera.y) {
			
			if (this.shadowSprite) {
				this.shadowSprite.draw(c, this.cx + this.shadowOffset.x, this.cy + this.shadowOffset.y);
			}

			if (this.isChanging) this.mainSprite.draw(c, this.spriteIDs[this.spriteID],
				this.w, this.h, this.cx, this.cy);
			else this.mainSprite.draw(c, this.cx, this.cy, c);
		}
		
		if (this.isChanging) this.update();
	}
}