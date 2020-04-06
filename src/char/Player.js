class Player {
	constructor(name, x, y, width, height, charSprite, shadowSprite, offset, shadowOffset, type='default') {
		this.id = null;
		this.name = name;
		
		this.health = 100;
		this.mana = 50;

		this.maxHealth = 100;
		this.maxMana = 50;

		this.x = x;
		this.y = y;

		this.width = width;
		this.height = height;

		this.velocity = { x: 0, y: 0 };
		this.speed = 2;

		this.charSprite = new AnimationSprite(charSprite, 12, null, 1);
		this.shadowSprite = shadowSprite;

		this.type = type;
		this.spriteID = 0;

		this.offset = (offset === null) ? { x1: 0, x2: 0, y1: 0, y2: 0 } : offset;
		this.shadowOffset = (shadowOffset === null) ? { x: 0, y: 0 } : shadowOffset;

		this.interactingTo = null;
		this.facing = 'down';
		this.enable = true;
		this.canSkip = false;

		this.regenCount = 0;
	}

	update() {
		if (this.enable) {
			this.updateMovement();

			this.x += this.velocity.x;
			this.y += this.velocity.y;

			if (this.velocity.x < 0) {
				this.spriteID = 1;
				this.charSprite.play(1);
				this.facing = 'left';
			}
			else if (this.velocity.x > 0) {
				this.spriteID = 2;
				this.charSprite.play(2);
				this.facing = 'right';
			}
			else {
				this.charSprite.stop(1);
				this.charSprite.stop(2);
			}

			if (this.velocity.y < 0) {
				this.spriteID = 3;
				this.charSprite.play(3);
				this.facing = 'up';
			}
			else if (this.velocity.y > 0) {
				this.spriteID = 0;
				this.charSprite.play(0);
				this.facing = 'down';
			}
			else {
				this.charSprite.stop(3);
				this.charSprite.stop(0);
			}

			if (this.velocity.x === 0 && this.velocity.y === 0) {
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
			this.velocity.x = 0;
			this.velocity.y = 0;

			this.charSprite.stop(1);
			this.charSprite.stop(2);

			this.charSprite.stop(3);
			this.charSprite.stop(0);
		}

		this.checkCollision();
		this.checkBoundaries();
	}

	draw() {
		this.shadowSprite.draw(c, this.x + this.shadowOffset.x, this.y + this.shadowOffset.y);
		this.charSprite.draw(this.spriteID, this.x, this.y);
		this.update();
	}

	updateMovement() {
		if (keyState[KEY_A]) {
			this.velocity.x = -this.speed;
			this.velocity.y = 0;
		}
		if (keyState[KEY_D]) {
			this.velocity.x = this.speed;
			this.velocity.y = 0;
		}
		if (keyState[KEY_W]) {
			this.velocity.y = -this.speed;
			this.velocity.x = 0;
		}
		if (keyState[KEY_S]) {
			this.velocity.y = this.speed;
			this.velocity.x = 0;
		}

		if (!keyState[KEY_A] && !keyState[KEY_D]) this.velocity.x = 0;
		if (!keyState[KEY_W] && !keyState[KEY_S]) this.velocity.y = 0;
	}

	checkCollision() {
		if (this.enable) {
			// Map entity collision detection
			for (let y = 0; y < map.rows; y++) {
				for (let x = 0; x < map.cols; x++) {
					if (map.collisions[y][x] === 1) {
						const x1 = this.x + this.offset.x1;
						const x2 = this.x + this.width - this.offset.x2;
						const y1 = this.y + this.offset.y1;
						const y2 = this.y + this.height - this.offset.y2

						const ox1 = x * TILE_SIZE;
						const ox2 = x * TILE_SIZE + TILE_SIZE;
						const oy1 = y * TILE_SIZE;
						const oy2 = y * TILE_SIZE + TILE_SIZE;

						if (x1 < ox2 && x2 > ox1 && y1 < oy2 && y2 > oy1) {
							if (this.velocity.x != 0) this.x -= this.velocity.x;
							if (this.velocity.y != 0) this.y -= this.velocity.y;
						}
					}
				}
			}

			// Moving object collision detection
			map.entities.data.forEach(obj => {
				if (obj !== this && obj.type === 'default') {
					let x1 = this.x + this.offset.x1;
					let x2 = this.x + this.width - this.offset.x2;
					let y1 = this.y + this.offset.y1;
					let y2 = this.y + this.height - this.offset.y2

					const ox1 = obj.x + obj.offset.x1;
					const ox2 = obj.x + obj.width - obj.offset.x2;
					const oy1 = obj.y + obj.offset.y1;
					const oy2 = obj.y + obj.height - obj.offset.y2;

					let collideX = (x1 < ox2 && x2 > ox1);
					let collideY = (y1 < oy2 && y2 > oy1);

					if (collideX && collideY) {
						if (this.velocity.x != 0) {
							this.x -= this.velocity.x;
							x1 -= this.velocity.x;
							x2 -= this.velocity.x;
						}

						if (this.velocity.y != 0) {
							this.y -= this.velocity.y;
							y1 -= this.velocity.y;
							y2 -= this.velocity.y;
						}
					}

					collideX = (x1 < ox2 && x2 > ox1);
					collideY = (y1 < oy2 && y2 > oy1);

					const collide = ((this.facing === 'left' && x1 === ox2 && collideY) ||
						(this.facing === 'up' && y1 === oy2 && collideX) ||
						(this.facing === 'right' && x2 === ox1 && collideY) ||
						(this.facing === 'down' && y2 === oy1 && collideX));

					if (this.interactingTo === null) {
						if (obj.message !== null && collide && keyState[KEY_Q]) {
							this.enable = false;

							dialog.setText(obj.name, obj.message);

							this.interactingTo = obj;
							obj.interactingTo = this;
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

	checkBoundaries() {
		const x1 = this.x;
		const x2 = this.x + this.width;
		const y1 = this.y;
		const y2 = this.y + this.height;

		if (x1 < 0) this.x = 0;
		else if (x2 > map.width) this.x = map.width - this.width;

		if (y1 < 0) this.y = 0;
		else if (y2 > map.height) this.y = map.height - this.height;
	}
}