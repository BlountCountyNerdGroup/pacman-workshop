var grid = {
    dimensions: {
        rows: 9,
        cols: 15
    },
    foodRadius: 5,
    squareColor: "#003fa5",
    gridCoordsToAbsCoords(gridCoords) {
        return new Coords(
            gridCoords.x * this.squareWidth + this.squareWidth / 2,
            gridCoords.y * this.squareHeight + this.squareHeight / 2
        );
    },
    drawFood() {
        var rows = this.dimensions.rows;
        var cols = this.dimensions.cols;

        for (var x = 0; x < cols; x++) {
            for (var y = 0; y < rows; y++) {
                var absY = y * this.squareHeight + this.squareHeight / 2;
                var absX = x * this.squareWidth + this.squareWidth / 2;                 

                if (this.food.map[y][x] == this.food.key.food) {
                    ctx.beginPath();
                    ctx.arc(absX, absY, this.foodRadius, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }
    },
    drawSquares() {
        var rows = this.dimensions.rows;
        var cols = this.dimensions.cols;

        for (var x = 0; x < cols; x++) {
            for (var y = 0; y < rows; y++) {
                var absY = y * this.squareHeight;
                var absX = x * this.squareWidth;
                
                if (this.blocks.map[y][x] == this.blocks.key.block) {
                    ctx.beginPath();
                    ctx.fillStyle = "#003fa5";
                    ctx.fillRect(absX, absY, this.squareWidth, this.squareHeight);
                }
            }
        }
    },
    blocks: {
        map: [
            [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0],
            [1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
            [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1]
        ],
        key: {
            block: 1,
            freeSpace: 0,
            collidableBlockTypes: [1]
        }
    },
    food: {
        map: [], // to be populated
        key: {
            food: 1,
            emptySpace: 0
        },
        totalFoodLeft: 0,
        eatFood(x, y) {
            if (this.map[y][x] == this.key.food) {
                this.map[y][x] = this.key.emptySpace;

                this.totalFoodLeft--;

                if (this.totalFoodLeft == 0) {
                    alert(`You won in ${timer.getTotalSeconds()} seconds!`);
                    location.reload();
                }
            }
        }
    },
    setupFoodMap() {
        var rows = this.dimensions.rows;
        var cols = this.dimensions.cols;

        for (var y = 0; y < rows; y++) {
            // add new row
            this.food.map.push([]);

            for (var x = 0; x < cols; x++) {  
                if (this.isNonBlockingSpace(x, y)) {
                    this.food.map[y].push(this.food.key.food);
                    this.food.totalFoodLeft++;
                } else {
                    this.food.map[y].push(this.food.key.emptySpace);
                }
            }
        }
    },
    isNonBlockingSpace(x, y) {
        // square that pacman will move to if nothing to collide with
        var requestedMovement = this.blocks.map[y][x];
        var valid = grid.blocks.key.collidableBlockTypes.indexOf(requestedMovement) == -1;

        return valid;
    },
}

grid.setupFoodMap();
grid.squareHeight = canvas.height / grid.dimensions.rows;
grid.squareWidth = canvas.width / grid.dimensions.cols;