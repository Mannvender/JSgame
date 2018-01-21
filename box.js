function init() {
    console.log("init");

    canvas = document.getElementById('myCanvas');
    pen = canvas.getContext('2d');
    W = canvas.width;
    H = canvas.height;

    box = {
        x: 10,
        y: 20,
        w: 20,
        h: 20,
        speed: 8
    }
}

function draw() {
    pen.clearRect(0, 0, W, H);
    console.log("draw");
    pen.fillStyle = "green";
    pen.fillRect(box.x, box.y, box.w, box.h)
}

function update() {
    console.log("update");
    box.x += box.speed;

    if (box.x > W - box.w) {
        box.speed *= -1;
    }
}

function gameLoop() {
    draw();
    update();
}

init();

//runs gameLoop after each 100ms
setInterval(gameLoop, 100);