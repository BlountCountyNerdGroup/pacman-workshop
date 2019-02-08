var timer = {
    totalMillis: 0,
    color: "#ffffff",
    fontSize: 30,
    font: "Arial",
    position: {
        grid: new Coords(7, 0)
    },
    addMillis(delta) {
        this.totalMillis += delta;
    },
    getTotalSeconds() {
        return (this.totalMillis / 1000).toFixed(1);
    },
    draw() {
        ctx.beginPath();
        ctx.font = `${this.fontSize}px ${this.font}`;
        ctx.fillStyle = this.color;

        ctx.fillText(this.getTotalSeconds(), this.position.absolute.x - 20, this.position.absolute.y);
    }
}

timer.position.absolute = grid.gridCoordsToAbsCoords(timer.position.grid);