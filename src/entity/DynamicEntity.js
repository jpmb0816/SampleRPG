class DynamicEntity extends Entity {
	constructor(name, x, y, w, h, mainSprite, shadowSprite, mainOffset, shadowOffset,
		hasD2SCollision, hasD2DCollision, delayPerFrame=12, sequences=null) {
		super(x, y, w, h);

		this.name = name;

		this.mainSprite = new AnimationSprite(mainSprite, delayPerFrame, sequences, 1);
		this.shadowSprite = shadowSprite;
		this.mainOffset = (mainOffset === null || mainOffset === undefined) ?
			{ x1: 0, x2: 0, y1: 0, y2: 0 } : mainOffset;
		this.shadowOffset = (shadowOffset === null || shadowOffset === undefined) ?
			{ x: 0, y: 0 } : shadowOffset;
			
		this.hasD2SCollision = hasD2SCollision;
		this.hasD2DCollision = hasD2DCollision;

		this.vx = 0;
		this.vy = 0;
		this.speed = 2;
		this.canUpdateOldPos = true;
	}

	updateMapPos() {
		this.x = this.cx + this.mainOffset.x1;
		this.y = this.cy + this.mainOffset.y1;
	}

	updateOldPos() {
		if (this.canUpdateOldPos) {
			this.ol = this.l;
			this.or = this.r;
			this.ot = this.t;
			this.ob = this.b;
		}
	}

	updateCurrPos() {
		this.l = this.x;
		this.r = this.cx + this.w - this.mainOffset.x2;
		this.t = this.y;
		this.b = this.cy + this.h - this.mainOffset.y2;
		this.canUpdateOldPos = true;
	}

	checkBoundaries() {
		if (this.x < 0) this.setLeft(0);
		else if (this.x + this.w > map.width) this.setRight(map.width);

		if (this.y < 0) this.setTop(0);
		else if (this.y + this.h > map.height) this.setBottom(map.height);
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

						checkCollision(this, other);
					}
				}
			}
		}
	}

	d2dCollision() {
		if (this.hasD2DCollision) {
			map.entities.data.forEach(other => {
				if (other !== this) checkCollision(this, other);
			});
		}
	}

	setLeft(n) {
		this.cx = n - this.mainOffset.x1;
		this.updateMapPos();
		this.updateCurrPos();
	}

	setRight(n) {
		this.cx = n - this.w + this.mainOffset.x2;
		this.updateMapPos();
		this.updateCurrPos();
	}

	setTop(n) {
		this.cy = n - this.mainOffset.y1;
		this.updateMapPos();
		this.updateCurrPos();
	}

	setBottom(n) {
		this.cy = n - this.h + this.mainOffset.y2;
		this.updateMapPos();
		this.updateCurrPos();
	}
}