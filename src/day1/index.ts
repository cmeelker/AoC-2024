import { Day } from "../day";

class Day1 extends Day {
  constructor() {
    super(1);
  }

  getLists(lines: string[]): [number[], number[]] {
    const left: number[] = [];
    const right: number[] = [];

    lines.forEach((line) => {
      const [l, r] = this.getNumbers(line);
      left.push(l);
      right.push(r);
    });

    return [this.sortList(left), this.sortList(right)];
  }

  sortList(list: number[]): number[] {
    return list.sort((a, b) => a - b);
  }

  getNumbers(line: string): [number, number] {
    const [left, right] = line.split("   ");
    return [parseInt(left), parseInt(right)];
  }

  getDifference(left: number[], right: number[]): number[] {
    return left.map((num, i) => Math.abs(right[i] - num) || 0);
  }

  getSum(numbers: number[]): number {
    return numbers.reduce((acc, curr) => acc + curr, 0);
  }

  solveForPartOne(input: string): string {
    const lines = input.split("\n");
    const [left, right] = this.getLists(lines);

    const differences = this.getDifference(left, right);

    return this.getSum(differences).toString();
  }

  solveForPartTwo(input: string): string {
    const lines = input.split("\n");
    const [left, right] = this.getLists(lines);

    const result = left.map(
      (leftNumber) =>
        right.filter((rightNumber) => rightNumber === leftNumber).length *
          leftNumber || 0
    );

    return this.getSum(result).toString();
  }
}

export default new Day1();
