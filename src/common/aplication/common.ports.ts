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
  getTokenId(token: string): string;
  verifyUserPermission(token: string): ITokenService;
  verifyAdminPermission(token: string): ITokenService;
}
