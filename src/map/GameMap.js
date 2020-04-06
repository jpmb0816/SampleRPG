class GameMap {
	constructor() {
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.done = true;

		this.status = "Loading...";
		this.name = "";

		this.width = 0;
		this.height = 0;

		this.rows = 0;
		this.cols = 0;

		this.background = [];
		this.foreground = [];
		this.collisions = [];

		this.entities = null;

		this.loadingScreen = new LoadingScreen(this);
	}

	load(path, status="Loading...") {
		if (this.done) {
			this.done = false;
			this.status = status;

			this.loadingScreen.reset(c);

			setTimeout(() => {
				this.ctx.clearRect(0, 0, this.width, this.height);

				loadJSON(path)
				.then(json => {
					this.canvas.width = json.width;
					this.canvas.height = json.height;

					this.name = json.name;

					this.width = json.width;
					this.height = json.height;

					this.rows = json.rows;
					this.cols = json.rows;

					this.background = json.background;
					this.foreground = json.foreground;
					this.collisions = json.collisions;

					for (let y = 0; y < this.rows; y++) {
						for (let x = 0; x < this.cols; x++) {
							const valBG = this.background[y][x] - 1;
							const valFG = this.foreground[y][x] - 1;

							if (valBG > -1) sm.draw(this.ctx, 'grass', x * TILE_SIZE, y * TILE_SIZE); //
							if (valFG > -1) sm.drawMultiSprite(this.ctx, 'props', valFG,
								TILE_SIZE, TILE_SIZE,x * TILE_SIZE, y * TILE_SIZE);
						}
					}

					const list = [];

					if (json.npc !== undefined) json.npc.forEach(n => list.push(n));
					if (json.objects !== undefined)json.objects.forEach(o => list.push(o));

					this.entities = new EntityCollection();
					loadAllJSON(list, (e) => {
						switch (e.entityType) {
							case "dynamic":
								this.entities.add(new DynamicEntity(e.name, gridToCoordinate(e.startCol),
									gridToCoordinate(e.startRow), e.width, e.height,
									sm.getImage(e.mainSprite), sm.getSprite(e.shadowSprite),
									e.mainOffset, e.shadowOffset, e.instructions,
									e.delayPerFrame, e.sequences, e.messages));
								break;
							case "static":
								this.entities.add(new StaticEntity(e.name, gridToCoordinate(e.startCol),
									gridToCoordinate(e.startRow), e.width, e.height,
									sm.getSprite(e.mainSprite), sm.getSprite(e.shadowSprite),
									e.mainOffset, e.shadowOffset, e.spriteIDs, e.messages, e.isChanging));
								break;
						}
					})
					.then(() => {
						this.entities.add(player);

						player.x = json.startX;
						player.y = json.startY;

						camera.setMapSize(this.canvas.width, this.canvas.height);
						this.done = true;
					});
				});
			}, 1000);
		}
	}
}