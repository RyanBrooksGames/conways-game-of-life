class Cell {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.alive = false;
  }

  show() {
    if (!this.alive) {
      noFill();
      stroke(0);
      strokeWeight(5);
      rect(this.x * this.size, this.y * this.size, this.size, this.size);
    } else {
      noStroke();
      if(this.x == cols-1 || this.y == rows-1) {
          stroke(0);
      }
      fill(0);
      rect(this.x * this.size, this.y * this.size, this.size, this.size);
    }
  }

  age() {
    //check number of neighbors
    var neighborCount = 0;

    for (var i = -1; i <= 1; i++) {
      for (var j = -1; j <= 1; j++) {
        if (
          this.x + i >= 0 &&
          this.x + i < cols &&
          this.y + j >= 0 &&
          this.y + j < rows
        ) {
          if (abs(i) + abs(j) != 0) {
            if (grid[this.x + i][this.y + j].alive) {
              neighborCount++;
            }
          }
        }
      }
    }

    //determine if cell should live or die based on rules
    if (this.alive) {
      if (neighborCount >= 2 && neighborCount <= 3) { //any live cell with 2 or 3 live neightbors survives
        this.alive = true;
      } else { //all other live cells die in the next generation
        this.alive = false;
      }
    } else {
        if(neighborCount == 3) { //any dead cell with 3 live neighbors becomes a live cell
            this.alive = true;
        } else { //all dead cells remain dead
            this.alive = false;
        }
    }
  }
}
