export interface IDateService {
  adjustDate(date: string): string;
  addOneWeek(date: string): string;
  calculateEndDate(date: string, durationInMonths: number): string;
  getToday(): string;
}

export interface IIdService {
  generateId(): string;
}

