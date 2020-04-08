class Projectile extends DynamicEntity {
	constructor(from, name, x, y, w, h, mainSprite, shadowSprite, mainOffset, shadowOffset,
		facing, speed, delayPerFrame, hasD2SCollision=true, hasD2DCollision=true) {
		super(name, x, y, w, h, mainSprite, shadowSprite, mainOffset, shadowOffset,
			hasD2SCollision, hasD2DCollision, delayPerFrame, null);

		this.from = from;
		this.speed = speed;
		this.spriteID = 0;
		this.dmg = 10;

		if (facing === 'left') this.vx = -this.speed;
		else if (facing === 'up') this.vy = -this.speed;
		else if (facing === 'right') this.vx = this.speed;
		else if (facing === 'down') this.vy = this.speed;
	}

	update() {
		this.updateOldPos();

		this.cx += this.vx;
		this.cy += this.vy;

		this.updateMapPos();

		if (this.vx < 0) {
			this.spriteID = 1;
			this.mainSprite.play(1);
		}
		else if (this.vx > 0) {
			this.spriteID = 2;
			this.mainSprite.play(2);
		}
		else if (this.vy < 0) {
			this.spriteID = 3;
			this.mainSprite.play(3);
		}
		else if (this.vy > 0) {
			this.spriteID = 0;
			this.mainSprite.play(0);
		}

		this.updateCurrPos();

		this.d2sCollision();
		this.d2dCollision();

		this.checkBoundaries();
	}

	draw() {
		this.update();

		if (!this.redundant) {
			if (this.x < camera.x + camera.cw && this.x + this.w > camera.x &&
				this.y < camera.y + camera.ch && this.y + this.h > camera.y) {
				
				this.shadowSprite.draw(c, Math.round(this.cx + this.shadowOffset.x), Math.round(this.cy + this.shadowOffset.y));
				this.mainSprite.draw(this.spriteID, Math.round(this.cx), Math.round(this.cy));
			}
		}
	}

	checkBoundaries() {
		if ((this.x < 0) || (this.x + this.w > map.width) ||
			(this.y < 0) || (this.y + this.h > map.height)) {
			this.redundant = true;
		}
	}

	d2sCollision() {
		if (this.hasD2SCollision) {
			for (let y = 0; y < map.rows; y++) {
				for (let x = 0; x < map.cols; x++) {
					if (map.collisions[y][x] === 1) {
						const el = x * TILE_SIZE;
						const er = x * TILE_SIZE + TILE_SIZE;
						const et = y * TILE_SIZE;
						const eb = y * TILE_SIZE + TILE_SIZE;

						const other = {
							l: el, r: er, t: et, b: eb,
							ol: el, or: er, ot: et, ob: eb
						};

						if (checkCollision(this, other, false)) {
							this.redundant = true;
							return;
						}
					}
				}
			}
		}
	}

	d2dCollision() {
		if (this.hasD2DCollision) {
			map.entities.data.forEach(other => {
				if (other !== this && !(other instanceof Player) && !(other instanceof Projectile)) {
					if (checkCollision(this, other, false)) {
						this.redundant = true;
						other.hp -= this.dmg;
						if (other.hp <= 0) other.redundant = true;
						return;
					}
				}
			});
		}
	}
}