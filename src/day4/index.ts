import { Day } from "../day";

const directionMap: { [key: string]: [number, number] } = {
  N: [-1, 0],
  S: [1, 0],
  W: [0, -1],
  E: [0, 1],
  NE: [-1, 1],
  SE: [1, 1],
  SW: [1, -1],
  NW: [-1, -1],
};

class Day4 extends Day {
  constructor() {
    super(4);
  }

  createGrid(input: string): string[][] {
    return input.split("\n").map((line) => line.replace("\r", "").split(""));
  }

  search(
    grid: string[][],
    rowIndex: number,
    columnIndex: number,
    searchTerm: string,
    rowDelta: number,
    colDelta: number
  ): boolean {
    for (let i = 0; i < searchTerm.length; i++) {
      const newRow = rowIndex + i * rowDelta;
      const newCol = columnIndex + i * colDelta;

      if (
        newRow < 0 ||
        newRow >= grid.length ||
        newCol < 0 ||
        newCol >= grid[0].length ||
        grid[newRow][newCol] !== searchTerm[i]
      ) {
        return false;
      }
    }
    return true;
  }

  solveForPartOne(input: string): string {
    const searchTerm = "XMAS";
    const grid = this.createGrid(input);
    let result = 0;

    grid.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        Object.values(directionMap).forEach(([rowDelta, colDelta]) => {
          if (
            this.search(
              grid,
              rowIndex,
              columnIndex,
              searchTerm,
              rowDelta,
              colDelta
            )
          ) {
            result++;
          }
        });
      });
    });

    return result.toString();
  }

  solveForPartTwo(input: string): string {
    const grid = this.createGrid(input);
    let result = 0;

    grid.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        if (column === "A") {
          if (
            rowIndex > 0 &&
            rowIndex < grid.length - 1 &&
            columnIndex > 0 &&
            columnIndex < grid[0].length - 1
          ) {
            if (
              (grid[rowIndex - 1][columnIndex - 1] === "M" &&
                grid[rowIndex + 1][columnIndex - 1] === "M" &&
                grid[rowIndex - 1][columnIndex + 1] === "S" &&
                grid[rowIndex + 1][columnIndex + 1] === "S") ||
              (grid[rowIndex - 1][columnIndex - 1] === "S" &&
                grid[rowIndex + 1][columnIndex - 1] === "M" &&
                grid[rowIndex - 1][columnIndex + 1] === "S" &&
                grid[rowIndex + 1][columnIndex + 1] === "M") ||
              (grid[rowIndex - 1][columnIndex - 1] === "M" &&
                grid[rowIndex + 1][columnIndex - 1] === "S" &&
                grid[rowIndex - 1][columnIndex + 1] === "M" &&
                grid[rowIndex + 1][columnIndex + 1] === "S") ||
              (grid[rowIndex - 1][columnIndex - 1] === "S" &&
                grid[rowIndex + 1][columnIndex - 1] === "S" &&
                grid[rowIndex - 1][columnIndex + 1] === "M" &&
                grid[rowIndex + 1][columnIndex + 1] === "M")
            ) {
              result++;
            }
          }
        }
      });
    });

    return result.toString();
  }
}

export default new Day4();
