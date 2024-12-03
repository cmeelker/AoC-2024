import { Day } from "../day";

class Day3 extends Day {
  constructor() {
    super(3);
  }

  calculateMultiplier(multiplier: string): number {
    const str = multiplier.substring(4);
    const [a, b] = str.substring(0, str.length - 1).split(",");

    return (parseInt(a) || 0) * (parseInt(b) || 0);
  }

  addValues(value: number[]): number {
    return value.reduce((acc, val) => acc + val, 0);
  }

  solveForPartOne(input: string): string {
    const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
    const multipliers = input.match(regex) || [];
    const results = multipliers.map((multiplier) =>
      this.calculateMultiplier(multiplier)
    );
    return this.addValues(results).toString();
  }

  solveForPartTwo(input: string): string {
    const regex = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g;
    const matches = input.match(regex) || [];
    let multiplyNext = true;
    const results: number[] = [];

    matches.forEach((match) => {
      if (match === "do()") {
        multiplyNext = true;
      } else if (match === "don't()") {
        multiplyNext = false;
      } else if (multiplyNext) {
        results.push(this.calculateMultiplier(match));
      }
    });

    return this.addValues(results).toString();
  }
}

export default new Day3();
