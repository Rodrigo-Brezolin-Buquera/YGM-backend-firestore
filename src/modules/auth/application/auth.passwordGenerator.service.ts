import generator from 'generate-password-ts';
import { IAuthPasswordService } from './auth.ports';

export class AuthPasswordService implements IAuthPasswordService {
    passwordGenerator = (): string => {
        return generator.generate({
           length: 8,
           numbers: true,
           uppercase: true,
           symbols: true
       });
} 


}
