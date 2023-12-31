game.board = {
  game: game,
  size: 15,
  cells: [],
  create() {
    this.createCells();
  },
  createCells() {
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        this.cells.push(this.createCell(row, col));
      }
    }
  },
  createCell(row, col) {
    let cellSize = this.game.sprites.cell.width + 1;
    let offsetX = (this.game.width - cellSize * this.size) / 2;
    let offsetY = (this.game.height - cellSize * this.size) / 2;
    return {
      row: row,
      col: col,
      x: offsetX + cellSize * col,
      y: offsetY + cellSize * row,
    };
  },
  getRandomAvailableCell() {
    let pool = this.cells.filter((cell) => !cell.type && !this.game.snake.hasCell(cell)
    );
    let index = this.game.random(0, pool.length - 1);
    return pool[index];
  },
  createCellObject(type) {
    let cell = this.cells.find((cell) => cell.type === type);
    if (cell) {
      cell.type = false;
    }
    cell = this.getRandomAvailableCell();

    cell.type = type;
  },
  createFood() {
    this.createCellObject("food");
  },
  createBomb() {
    this.createCellObject("bomb");
  },
  isFoodCell(cell) {
    return cell.type === "food";
  },
  isBombCell(cell) {
    return cell.type === "bomb";
  },
  getCell(row, col) {
    return this.cells.find((cell) => cell.row === row && cell.col === col);
  },
  render() {
    this.cells.forEach((cell) => {
      this.game.ctx.drawImage(this.game.sprites.cell, cell.x, cell.y);
      if (cell.type) {
        this.game.ctx.drawImage(this.game.sprites[cell.type], cell.x, cell.y);
      }
    });
  },
};
