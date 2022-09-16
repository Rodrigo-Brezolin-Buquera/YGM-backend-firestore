import { IAuthPasswordService } from "../../../../../src/modules/auth/application/auth.ports";

export class AuthPasswordServiceMock implements IAuthPasswordService {
  passwordGenerator = (): string => {
    return "password";
  };
}
