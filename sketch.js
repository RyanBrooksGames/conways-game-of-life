let button;
let rowsAndCols;
let cellsToStart;
let generationCounter;
let prompt1;
let prompt2;
let h1;
let canvas;

let grid;
let next;
let cols;
let rows;
let generation = 0;

function setup() {
  canvas = createCanvas(500, 500);
  canvas.position(windowWidth / 4, 50);

  h1 = createElement("h1", "Conway's Game of Life");

  generationCounter = createP("");

  button = createButton("Start the Game of Life");
  button.mousePressed(SetupGrid);
  createP();

  prompt1 = createSpan("Enter number of dimensions ");
  rowsAndCols = createInput("20");
  createP();

  prompt2 = createSpan("Enter number of starting cells ");
  cellsToStart = createInput("50");
}

function draw() {
  background(255);

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}

function NextGeneration() {
  generation++;
  next = grid;
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      next[i][j].age();
    }
  }
  grid = next;

  console.log("Generation " + generation);
  generationCounter.html("Generation " + generation);
}

function CreateLife(startingAlive) {
  for (var i = 0; i < startingAlive; i++) {
    var spawned = -1;
    do {
      spawned = -1;
      var randX = floor(random(cols - 1));
      var randY = floor(random(rows - 1));

      if (!grid[randX][randY].alive) {
        grid[randX][randY].alive = true;
        spawned = 0;
      }
    } while (spawned == -1);
  }
}

function SetupGrid() {
  cols = int(rowsAndCols.value());
  rows = int(rowsAndCols.value());

  grid = Create2DArray(cols, rows);

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, width / cols - 1);
    }
  }

  generationCounter.html("Generation " + generation);

  button.html("Next Generation");
  button.mousePressed(NextGeneration);

  rowsAndCols.remove();
  cellsToStart.remove();
  prompt1.remove();
  prompt2.remove();

  var rules = createP(
    "Conway's Game of Life takes place on a grid of " +
      rowsAndCols.value() +
      " x " +
      rowsAndCols.value() +
      " cell(s). " +
      "Each cell has a state of either being alive, a white cell, or dead, a black cell. After starting the game, " +
      cellsToStart.value() +
      " cell(s) will come to life on the grid. Each time the Next Generation button is pressed, the grid will change according to the rules" +
      " as laid out by Conway:"
  );
  rules.position(0, 50 + height);

  rules = createP(
    "Every cell interacts with its eight neighbors, which are cells that are horizontally, vertically, or diagonally " +
      "adjacent. At each step in time, or Generation, the following transitions occur:"
  );
  rules.position(0, 100 + height);

  rules = createP(
    "1. Any live cell with fewer than two live neighbors dies, as if by underpopulation."
  );
  rules.position(50, 125 + height);

  rules = createP(
    "2. Any live cell with two or three live neighbors lives on to the next generation."
  );
  rules.position(50, 150 + height);

  rules = createP(
    "3. Any live cell with more than three live neighbors dies, as if by overpopulation."
  );
  rules.position(50, 175 + height);

  rules = createP(
    "4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction."
  );
  rules.position(50, 200 + height);

  rules = createP(
    "The game 'ends' once either all the cells die, or the cells reach 'homeostasis' in which the cells remain in a constant pattern of birth" 
    + "and death."
  );
  rules.position(0, 225 + height);

  CreateLife(int(cellsToStart.value()));
}

function Create2DArray(cols, rows) {
  let array = new Array(cols);
  for (var i = 0; i < array.length; i++) {
    array[i] = new Array(rows);
  }

  return array;
}
