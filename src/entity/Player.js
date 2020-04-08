class Player extends DynamicEntity {
	constructor(name, x, y, w, h, mainSprite, shadowSprite, mainOffset, shadowOffset) {
		super(name, x, y, w, h, mainSprite, shadowSprite, mainOffset, shadowOffset, true, true);
		
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

		this.speed = 2;

		this.actionCD = 15;
		this.actionCount = this.actionCD;
	}

	update() {
		if (this.enable) {
			this.action();
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
				if (other !== this && !(other instanceof Projectile)) {
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

					if (!this.interactingTo) {
						if (other.message && collide && keyState[KEY_Q]) {
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
			if (this.interactingTo) {
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

	action() {
		if (keyState[KEY_K] && this.actionCount === this.actionCD) {
			const facing = this.facing;
			const pjOffset = { x1: 20, x2: 20, y1: 32, y2: 12 };
			let x, y;

			if (facing === 'left') {
				x = this.cx - this.w + pjOffset.x2;
				y = this.cy;
			}
			else if (facing === 'right') {
				x = this.cx + this.w - pjOffset.x1;
				y = this.cy;
			}
			else if (facing === 'up') {
				x = this.cx;
				y = this.cy - this.h + pjOffset.y2;
			}
			else if (facing === 'down') {
				x = this.cx;
				y = this.cy + this.h - pjOffset.y1;
			}

			map.entities.add(new Projectile(this.name, "Fireball", x, y, 64, 64,
				sm.getImage('fireball'), sm.getSprite('char-shadow'),
				pjOffset, null, facing, 4, 4));

			this.actionCount = 0;
		}
		
		if (this.actionCount < this.actionCD) this.actionCount++;
	}

	setFacing(facing) {
		this.facing = facing;
		if (facing === 'left') this.spriteID = 1;
		else if (facing === 'right') this.spriteID = 2;
		else if (facing === 'up') this.spriteID = 3;
		else if (facing === 'down') this.spriteID = 0;
	}
}