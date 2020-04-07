class Player extends DynamicEntity {
	constructor(name, x, y, w, h, mainSprite, shadowSprite, mainOffset, shadowOffset) {
		super(name, x, y, w, h, mainSprite, shadowSprite, mainOffset, shadowOffset, true, true);

		this.id = null;
		
		this.health = 100;
		this.mana = 50;

		this.maxHealth = 100;
		this.maxMana = 50;

		this.spriteID = 0;

		this.enable = true;
		this.canSkip = false;
		this.facing = 'down';
		this.interactingTo = null;
		this.regenCount = 0;
	}

	update() {
		if (this.enable) {
			this.updateOldPos();
			this.updateMovement();

			this.cx += this.vx;
			this.cy += this.vy;

			this.updateMapPos();

			if (this.vx < 0) {
				this.spriteID = 1;
				this.mainSprite.play(1);
				this.facing = 'left';
			}
			else if (this.vx > 0) {
				this.spriteID = 2;
				this.mainSprite.play(2);
				this.facing = 'right';
			}
			else {
				this.mainSprite.stop(1);
				this.mainSprite.stop(2);
			}

			if (this.vy < 0) {
				this.spriteID = 3;
				this.mainSprite.play(3);
				this.facing = 'up';
			}
			else if (this.vy > 0) {
				this.spriteID = 0;
				this.mainSprite.play(0);
				this.facing = 'down';
			}
			else {
				this.mainSprite.stop(3);
				this.mainSprite.stop(0);
			}

			if (this.vx === 0 && this.vy === 0) {
				this.regenCount++;

				if (this.health < this.maxHealth && this.regenCount % 100 === 0) {
					const regenHealth = Math.floor(this.maxHealth * 0.02);
					this.health += regenHealth;
				}

				if (this.mana < this.maxMana && this.regenCount % 30 === 0) {
					const regenMana = Math.floor(this.maxMana * 0.02);
					this.mana += regenMana;
				}
			}
			else if (this.regenCount !== 0) {
				this.regenCount = 0;
			}
		}
		else {
			this.vx = 0;
			this.vy = 0;

			this.mainSprite.stop(1);
			this.mainSprite.stop(2);

			this.mainSprite.stop(3);
			this.mainSprite.stop(0);
		}

		this.updateCurrPos();

		this.d2sCollision();
		this.d2dCollision();

		this.checkBoundaries();
	}

	draw() {
		this.shadowSprite.draw(c, Math.round(this.cx + this.shadowOffset.x), Math.round(this.cy + this.shadowOffset.y));
		this.mainSprite.draw(this.spriteID, Math.round(this.cx), Math.round(this.cy));
		this.update();
	}

	updateMovement() {
		if (keyState[KEY_A]) {
			this.vx = -this.speed;
			this.vy = 0;
		}
		if (keyState[KEY_D]) {
			this.vx = this.speed;
			this.vy = 0;
		}
		if (keyState[KEY_W]) {
			this.vy = -this.speed;
			this.vx = 0;
		}
		if (keyState[KEY_S]) {
			this.vy = this.speed;
			this.vx = 0;
		}

		if (!keyState[KEY_A] && !keyState[KEY_D]) this.vx = 0;
		if (!keyState[KEY_W] && !keyState[KEY_S]) this.vy = 0;
	}

	d2dCollision() {
		if (this.hasD2DCollision && this.enable) {
			// Dynamic entity collision detection
			map.entities.data.forEach(other => {
				if (other !== this) {
					checkCollision(this, other);

					const al = Math.round(this.l);
					const ar = Math.round(this.r);
					const at = Math.round(this.t);
					const ab = Math.round(this.b);

					const bl = Math.round(other.l);
					const br = Math.round(other.r);
					const bt = Math.round(other.t);
					const bb = Math.round(other.b);

					const collideX = (al < br && ar > bl);
					const collideY = (at < bb && ab > bt);

					const collide = ((this.facing === 'left' && al === br && collideY) ||
						(this.facing === 'up' && at === bb && collideX) ||
						(this.facing === 'right' && ar === bl && collideY) ||
						(this.facing === 'down' && ab === bt && collideX));

					if (this.interactingTo === null) {
						if (other.message !== null && collide && keyState[KEY_Q]) {
							this.enable = false;
							this.interactingTo = other;

							dialog.setText(other.name, other.message);

							other.interactingTo = this;
							keyState[KEY_Q] = false;
						}
					}
				}
			});
		}
		else {
			// Interacting state
			if (this.interactingTo !== null) {
				if (keyState[KEY_Q] && this.canSkip) {
					this.enable = true;
					this.canSkip = false;

					dialog.reset();

					this.interactingTo.interactingTo = null;
					this.interactingTo = null;
					keyState[KEY_Q] = false;
				}
				else if (!dialog.canContinue && keyState[KEY_Q]) {
					dialog.index = Math.floor(dialog.index * 1.25);
					if (MOBILE) keyState[KEY_Q] = false;
				}
				else if (!this.canSkip && dialog.canContinue && !keyState[KEY_Q]) {
					this.canSkip = true;
				}
			}
		}
	}
}