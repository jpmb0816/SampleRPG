class Player {
	constructor(x, y, width, height, charSprite, shadowSprite, type='default') {
		this.id = null;
		this.x = x;
		this.y = y;

		this.width = width;
		this.height = height;

		this.head = height / 2;
		this.velocity = { x: 0, y: 0 };
		this.speed = 2;

		this.charSprite = new DynamicSprite(charSprite, 12);
		this.shadowSprite = new StaticSprite(shadowSprite);

		this.type = type;
		this.spriteID = 0;
		this.offset = {
			x1: 16,
			x2: 16,
			y1: 4,
			y2: 4
		};

		this.interactingTo = null;
		this.facing = 'down';
	}

	update() {
		this.updateAM();

		this.x += this.velocity.x;
		this.y += this.velocity.y;

		this.checkCollision();
		this.checkBoundaries();
	}

	draw() {
		this.shadowSprite.draw(this.x, this.y);
		this.charSprite.draw(this.spriteID, this.x, this.y);
		this.update();
	}

	updateAM() {
		if (control.left) {
			this.velocity.x = -this.speed;
			this.velocity.y = 0;

			this.spriteID = 1;
			this.charSprite.play(this.spriteID);
			this.facing = 'left';
		}
		else if (control.up) {
			this.velocity.y = -this.speed;
			this.velocity.x = 0;

			this.spriteID = 3;
			this.charSprite.play(this.spriteID);
			this.facing = 'up';
		}
		else if (control.right) {
			this.velocity.x = this.speed;
			this.velocity.y = 0;

			this.spriteID = 2;
			this.charSprite.play(this.spriteID);
			this.facing = 'right';
		}
		else if (control.down) {
			this.velocity.y = this.speed;
			this.velocity.x = 0;

			this.spriteID = 0;
			this.charSprite.play(this.spriteID);
			this.facing = 'down';
		}

		if (control.right === false && control.left === false) {
			this.velocity.x = 0;

			this.charSprite.stop(1);
			this.charSprite.stop(2);
		}
		
		if (control.down  === false && control.up === false) {
			this.velocity.y = 0;

			this.charSprite.stop(3);
			this.charSprite.stop(0);
		}
	}

	checkCollision() {
		objects.data.forEach(obj => {
			if (obj !== this && obj.type === 'default') {
				const x1 = this.x + this.offset.x1;
				const x2 = this.x + this.width - this.offset.x2;
				const y1 = this.y + this.head + this.offset.y1;
				const y2 = this.y + this.height - this.offset.y2

				const ox1 = obj.x + obj.offset.x1;
				const ox2 = obj.x + obj.width - obj.offset.x2;
				const oy1 = obj.y + obj.head + obj.offset.y1;
				const oy2 = obj.y + obj.height - obj.offset.y2;

				const collideX = (x1 < ox2 && x2 > ox1);
				const collideY = (y1 < oy2 && y2 > oy1);

				const interacting = ((this.facing === 'left' && x1 === ox2 && collideY) || (this.facing === 'up' && y1 === oy2 && collideX) || (this.facing === 'right' && x2 === ox1 && collideY) || (this.facing === 'down' && y2 === oy1 && collideX));

				if (collideX && collideY) {
					if (this.velocity.x != 0) this.x -= this.velocity.x;
					if (this.velocity.y != 0) this.y -= this.velocity.y;
				}
				else if (this.interactingTo === null) {
					if (interacting) {
						if (control.talk) {
							control.enable = false;
							dialog.visible = true;
							dialog.text = obj.message;
							this.interactingTo = obj;
							obj.interactingTo = this;
						}
					}
				}
				else if (this.interactingTo === obj) {
					if (interacting) {
						if (!control.talk) {
							control.enable = true;
							dialog.visible = false;
							dialog.text = "";
							this.interactingTo = null;
							obj.interactingTo = null;
						}
					}
				}
			}
		});
	}

	checkBoundaries() {
		const x1 = this.x + this.offset.x1;
		const x2 = this.x + this.width - this.offset.x2;
		const y1 = this.y + this.offset.y1;
		const y2 = this.y + this.height - this.offset.y2

		if (x1 < 0) this.x = -this.offset.x1;
		else if (x2 > mapW) this.x = mapW - this.width + this.offset.x2;

		if (y1 < 0) this.y = -this.offset.y1;
		else if (y2 > mapH) this.y = mapH - this.height + this.offset.y2;
	}
}