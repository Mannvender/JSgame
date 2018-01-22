function init() {
    console.log("init");

    // to clean local storage
    // localStorage.clear();


    // loading scores from local-storage if supported
    if (storageAvailable('localStorage')) {
        // Yippee! We can use localStorage awesomeness
        if (localStorage.getItem("ScoresArray") == null) {
            let array = [];
            array.push("firstHuman - 0, ");
            // local storage only supports strings
            localStorage.setItem("ScoresArray", JSON.stringify(array));
        } else {
            // converting string to array
            let scores = JSON.parse(localStorage.getItem("ScoresArray"));
            console.log(scores);
            scoreDiv.innerHTML = "";
            scores.forEach((element) => {
                scoreDiv.innerHTML += element;
            })
        }


    }
    else {
        // Too bad, no localStorage for us
    }


    canvas = document.getElementById('myCanvas');
    pen = canvas.getContext('2d');
    W = canvas.width;
    H = canvas.height;
    game_over = false;
    score = 0;
    scoreDiv = document.getElementById("scoreDiv");


    food = {
        x: 0,
        y: 0,
        colour: "",
        colours: ["white", "red", "green", "aqua", "blue"],
        getRandomFood: function () {
            this.y = Math.round(Math.random() * (H - 10) / 10);
            this.x = Math.round(Math.random() * (W - 10) / 10);
            this.colour = this.colours[Math.round(Math.random() * this.colours.length)];
            return this;
        },
        drawFood: function () {
            pen.fillStyle = this.colour;
            pen.fillRect(this.x * 10, this.y * 10, 10, 10)
        }
    };

    food.getRandomFood();


    snake = {
        initial_length: 5,
        color: "white",
        direction: "right",
        cells: [],
        createSnake: function () {
            for (let i = this.initial_length - 1; i >= 0; i--) {
                this.cells.push({x: i, y: 0});
            }
        },
        drawSnake: function () {
            for (let i = 0; i < this.cells.length; i++) {
                pen.fillStyle = this.color;
                pen.strokeStyle = "golden";
                pen.strokeRect(this.cells[i].x * 10, this.cells[i].y * 10, 10, 10);
                pen.fillRect(this.cells[i].x * 10, this.cells[i].y * 10, 10, 10);
            }
        },
        updateSnake: function () {
            let headX = this.cells[0].x;
            let headY = this.cells[0].y;

            //boundary condition
            if (this.cells[0].y < 0 || this.cells[0].x < 0 || this.cells[0].y > Math.round(H / 10) || this.cells[0].x > Math.round(W / 10)) {
                //alert(`Game Over. Your Score : ` + score);
                game_over = true;
            }


            // when snake eats food
            if (headX == food.x && headY == food.y) {
                score++;

                //updating score in div
                // scoreDiv.innerHTML = score;

                food.getRandomFood();

            } else {
                this.cells.pop();
            }


            //for snake moving right
            /*nextHead = headX + 1;
            this.cells.pop();
            this.cells.unshift({x: nextHead, y: headY})*/

            if (this.direction == "right") {
                nextX = headX + 1;
                nextY = headY;
            } else if (this.direction == "left") {
                nextX = headX - 1;
                nextY = headY;
            } else if (this.direction == "down") {
                nextX = headX;
                nextY = headY + 1;
            } else {
                nextX = headX;
                nextY = headY - 1;
            }
            this.cells.unshift({x: nextX, y: nextY})

        }
    };

    snake.createSnake();

    //event listener
    document.addEventListener('keydown', (event) => {
        // console.log(event);
        if (event.key == "ArrowRight") {
            snake.direction = "right";
        }
        else if (event.key == "ArrowLeft") {
            snake.direction = "left";
        }
        else if (event.key == "ArrowUp") {
            snake.direction = "up";
        }
        else {
            snake.direction = "down";
        }
    })

}

function draw() {
    pen.clearRect(0, 0, W, H);
    snake.drawSnake();

    food.drawFood();

    //updating score on canvas
    pen.fillStyle = "white";
    pen.font = "8px Roboto";
    pen.fillText("score : " + score, 10, 10);
}

function update() {
    snake.updateSnake();

}

function gameLoop() {
    draw();
    update();

    if (game_over) {
        player = prompt("your score - " + score + " .enter your Name below");
        if (player === "") {
            player = "unknown";
        }

        // saving scores in html local storage
        // storage available is function in localStorage.js
        if (storageAvailable('localStorage')) {
            let scores = JSON.parse(localStorage.getItem("ScoresArray"));

            scores.push(player + " - " + score + ", ");
            console.log(scores);
            localStorage.setItem("ScoresArray", JSON.stringify(scores));
        }
        else {
            //scoreDiv.innerHTML += player + " - " + score + ", ";
        }


        let restart = window.confirm("Press OK to restart");
        if (restart) {
            clearInterval(game);
            init();
            game = setInterval(gameLoop, 100);
        } else {
            clearInterval(game);
        }

    }
}

init();

//runs gameLoop after each 100ms
let game = setInterval(gameLoop, 100);