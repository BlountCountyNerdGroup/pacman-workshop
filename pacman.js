function PacMan(x, y) {
    var data = {
        movement: -1,
        position: {
            grid: new Coords(x, y) // tracks "desired" position
        },
        speed: pacmanSpeed, // arbitrary
        size: 30,
        color: "#ffd530",

        inGridSquare() {
            var targetAbs = grid.gridCoordsToAbsCoords(this.position.grid);
            var diffX = Math.abs(targetAbs.x - this.position.absolute.x);
            var diffY = Math.abs(targetAbs.y - this.position.absolute.y);
            var allowance = 5;
            var approxInSquare = diffX <= allowance && diffY <= allowance;

            if (approxInSquare) this.position.absolute = targetAbs;

            return approxInSquare;
        },

        update(keysDown) {
            if (this.inGridSquare()) {
                grid.food.eatFood(this.position.grid.x, this.position.grid.y);

                // set movement to latest key pressed
                this.movement = keysDown.length > 0 ? keysDown[keysDown.length - 1] : -1;
                
                if (this.movement == directions.up) {
                    var pastPosition = this.position.grid.y;
                    this.position.grid.y--;

                    // if goes above screen
                    if (this.position.grid.y < 0) {
                        this.position.grid.y = grid.dimensions.rows - 1;
                        this.position.absolute.y = grid.dimensions.rows * grid.squareHeight;
                    }

                    // undo if there's a block in the way
                    if (!grid.isNonBlockingSpace(this.position.grid.x, this.position.grid.y)) {
                        this.position.grid.y = pastPosition;
                        this.movement = -1;
                    }
                } else if (this.movement == directions.down) {
                    var pastPosition = this.position.grid.y;
                    this.position.grid.y++;

                    // if goes below screen
                    if (this.position.grid.y > grid.dimensions.rows - 1) {
                        this.position.grid.y = 0;
                        this.position.absolute.y = -grid.squareHeight;
                    }

                    // undo if there's a block in the way
                    if (!grid.isNonBlockingSpace(this.position.grid.x, this.position.grid.y)) {
                        this.position.grid.y = pastPosition;
                        this.movement = -1;
                    }
                } else if (this.movement == directions.left) {
                    var pastPosition = this.position.grid.x;
                    this.position.grid.x--;

                    // if goes to left of screen
                    if (this.position.grid.x < 0) {
                        this.position.grid.x = grid.dimensions.cols - 1;
                        this.position.absolute.x = grid.dimensions.cols * grid.squareWidth;
                    }

                    // undo if there's a block in the way
                    if (!grid.isNonBlockingSpace(this.position.grid.x, this.position.grid.y)) {
                        this.position.grid.x = pastPosition;
                        this.movement = -1;
                    }
                } else if (this.movement == directions.right) {
                    var pastPosition = this.position.grid.x;
                    this.position.grid.x++;

                    // if goes to the right of screen
                    if (this.position.grid.x > grid.dimensions.cols - 1) {
                        this.position.grid.x = 0;
                        this.position.absolute.x = -grid.squareWidth;
                    }

                    // undo if there's a block in the way
                    if (!grid.isNonBlockingSpace(this.position.grid.x, this.position.grid.y)) {
                        this.position.grid.x = pastPosition;
                        this.movement = -1;
                    }
                }
            }

            // if pac-man should be moving
            if (this.movement != -1) {
                if (this.movement == directions.up) {
                    this.position.absolute.y -= this.speed;
                } else if (this.movement == directions.down) {
                    this.position.absolute.y += this.speed;
                } else if (this.movement == directions.left) {
                    this.position.absolute.x -= this.speed;
                } else if (this.movement == directions.right) {
                    this.position.absolute.x += this.speed;
                }
            }

            this.render();
        },

        render() {
            ctx.beginPath();
            ctx.arc(this.position.absolute.x, this.position.absolute.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    // add absolute position to object
    data.position.absolute = grid.gridCoordsToAbsCoords(data.position.grid);

    return data;
}