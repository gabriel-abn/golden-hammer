export interface IDateFormater {
  format(date: Date): string;
  parse(date: string): Date;
}
