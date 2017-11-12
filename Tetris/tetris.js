// JavaScript canvas settings
const canv = document.getElementById("tetris");
const context = canv.	getContext("2d");

context.scale(20, 20); // Scale size of frame - change pixels size


const matrix = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
];


// Check player matrix collision
function collide(arena, player) {
    const m = player.matrix;
    const o = player.pos;
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
                (arena[y + o.y] &&
                    arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}


var isComplete = true;
var type = 4; // Default


// Draw all stuff
function draw() {
    context.fillStyle = "#000";
    context.fillRect(0, 0, canv.width, canv.height);

    drawMatrix(arena, {x: 0, y:0});
    drawMatrix(player.matrix, player.pos);
}


// Create matrix w x h
function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}


function swapCols(matrix, width) {
    var first = 0;
    var last = width - 1;


    for (var i = first; i <= last; i++) {
        var tmp = matrix[i][last];
        matrix[i][last] = matrix[i][first];
        matrix[i][first] = tmp;

    }
}

function size(ar){
    var row_count = ar.length;
    var row_sizes = []
    for(var i=0; i<row_count; i++){
        row_sizes.push(ar[i].length)
    }
    return [row_count, Math.min.apply(null, row_sizes)]
}

function reverseMatrix(matrix) {
    var str = size(matrix) + "";
    var height = parseInt(str.substring(0, 1));
    var width = parseInt(str.substring(2));
    matrix_t = createMatrix(height, width);

    // Transonent matrix
    for (var y = 0; y < height; ++y)
        for (var x = 0; x < width; ++x) {
            matrix_t[x][y] =  matrix[y][x];
        }


    // Swap first and last cols
    swapCols(matrix_t, x);

    matrix = matrix_t;
    return matrix;
}


function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
        if (value !== 0) {
        if (type === 1) {
            context.fillStyle = "green";
            context.fillRect(x + offset.x, y + offset.y, 1, 1);
        } else if (type === 2) {
            context.fillStyle = "blue";
            context.fillRect(x + offset.x, y + offset.y, 1, 1);
        } else if (type === 3) {
            context.fillStyle = "yellow";
            context.fillRect(x + offset.x, y + offset.y, 1, 1);
        } else if (type === 4) {
            context.fillStyle = "red";
            context.fillRect(x + offset.x, y + offset.y, 1, 1);
        }
    }
});
});
}


// Merge player matrix with arena matrix
// This function add to global (arena) matrix player matrix with current position (x and y)
function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
        if (value !== 0) {
        arena[y + player.pos.y][x + player.pos.x] = value;
    }
});
});
}

// This function wirks every "tick" of the game
function playerDrop() {
    player.pos.y++;
    if (collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        player.pos.y = 0;
    }
    dropCounter = 0;
}

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;


// Global matrix
const arena = createMatrix(12, 20);

console.log(arena);
console.table(arena)

// Player object
const player = {
    pos: {x: 5, y: 5},
    matrix: matrix,
    type: 4, //default block
}

// Generate random player matrix
function getRandomMatrix() {
    var rand = Math.floor( Math.random() * (7 - 1) + 1);
    if (rand === 1) {
        player.matrix = [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
        ];;
        player.type = 1;
        isComplete = false;
    }  if (rand === 2) {
        player.matrix = [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0],
        ];;
        player.type = 2;
        isComplete = false;
    }  if (rand === 3) {
        player.matrix = [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 1],
        ];;
        player.type = 3;
        isComplete = false;
    }   if (rand === 4) {
        player.matrix = [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
        ];;
        player.type = 4;
        isComplete = false;
    }
    type = player.type;
}


function update(time=0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
    }
    if (isComplete)
        getRandomMatrix();
    draw();
    requestAnimationFrame(update);
}

function getMatrix(arg, type) {
    if (type === 4) {
        if (arg === 1)
            return [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0],
            ];
        else if (arg === 2)
            return [
                [0, 1, 0],
                [1, 1, 0],
                [0, 1, 0],
            ];
        else if (arg === 3)
            return [
                [0, 1, 0],
                [1, 1, 1],
                [0, 0, 0],
            ];
        else if (arg === 4)
            return [
                [0, 1, 0],
                [0, 1, 1],
                [0, 1, 0],
            ];
    }
};

let curr = 1;

// Use Event Listeners to control player with keyboard
document.addEventListener("keydown", event => {
    if (event.keyCode === 37)
player.pos.x--;
else if (event.keyCode === 39)
    player.pos.x++;
else if (event.keyCode === 40)
    playerDrop();
else if (event.keyCode === 38) {
    player.matrix = reverseMatrix(player.matrix);
    /*
        if (curr < 4) {
            curr++;
    } else curr = 1;
    player.matrix = getMatrix(curr, player.type);
  */

}
});

update();
