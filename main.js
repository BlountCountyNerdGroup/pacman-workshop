// store keyCodes currently down
var keysDown = [];

addEventListener("keydown", function(e) {
    if (keysDown.indexOf(e.keyCode) == -1) keysDown.push(e.keyCode);
});

addEventListener("keyup", function(e) {
    keysDown.splice(keysDown.indexOf(e.keyCode), 1);
});

var now;
var then = Date.now();

var pacman = new PacMan(startingX, startingY);

function mainLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (logCoords) console.log(pacman.position.grid)

    pacman.update(keysDown);

    grid.drawFood();
    grid.drawSquares();

    // timer code
    var now = Date.now();
    var delta = now - then; // in milliseconds
    then = now
    timer.addMillis(delta)
    timer.draw();

    requestAnimationFrame(mainLoop);
}

mainLoop();