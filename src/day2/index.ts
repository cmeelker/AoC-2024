import { Day } from "../day";

class Day2 extends Day {
  constructor() {
    super(2);
  }

  getReports(lines: string[]): number[][] {
    return lines.map((line) => line.split(" ").map((num) => parseInt(num)));
  }

  isSave(report: number[]): boolean {
    return (
      (this.isAllIncreasing(report) || this.isAllDecreasing(report)) &&
      this.hasAllowedDistance(report)
    );
  }

  isAllIncreasing(report: number[]): boolean {
    return report.every((num, i, arr) => i === 0 || num >= arr[i - 1]);
  }

  isAllDecreasing(report: number[]): boolean {
    return report.every((num, i, arr) => i === 0 || num <= arr[i - 1]);
  }

  hasAllowedDistance(report: number[]): boolean {
    const minDistance = 1;
    const maxDistance = 3;

    return report.every((num, i, arr) => {
      if (i === 0) {
        return true;
      }

      return (
        Math.abs(num - arr[i - 1]) >= minDistance &&
        Math.abs(num - arr[i - 1]) <= maxDistance
      );
    });
  }

  getSubsets(report: number[]): number[][] {
    // remove 1 number from report, on each position. create list of options
    const subsets = [report];
    report.forEach((option, i) => {
      subsets.push(report.filter((num, j) => j !== i));
    });
    return subsets;
  }

  solveForPartOne(input: string): string {
    const lines = input.split("\n");
    const reports = this.getReports(lines);

    const saveReports = reports.filter((report) => this.isSave(report));

    return saveReports.length.toString();
  }

  isSave2(report: number[]): boolean {
    const subsets = this.getSubsets(report);

    return subsets.some((subset) => this.isSave(subset));
  }

  solveForPartTwo(input: string): string {
    const lines = input.split("\n");
    const reports = this.getReports(lines);

    return reports.filter((report) => this.isSave2(report)).length.toString();
  }
}

export default new Day2();
