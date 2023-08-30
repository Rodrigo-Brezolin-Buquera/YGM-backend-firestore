export interface IDateService {
  adjustDate(date: string): string;
  addOneWeek(date: string): string;
  calculateEndDate(date: string, durationInMonths: number): string;
  getToday(): string;
}

export interface IIdService {
  generateId(): string;
}


export interface ITokenService {
  generateToken(payload: any): string;
  verifyUserPermission(token: string):any;
  verifyAdminPermission(token: string):any;
}