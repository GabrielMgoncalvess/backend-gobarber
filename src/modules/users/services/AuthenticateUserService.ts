import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface Request {
    email: string;
    password: string;
}

class AuthenticareUserService {
    public async execute({ email, password }:Request): Promise <{ user: User, token:string}> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({ where: { email } });

        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched) {
            throw new AppError('Incorrect email/password combination.', 401);
        };

        const token = sign({}, authConfig.jwt.secret, { 
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        });
        
        return {
            user,
            token
        };
    }
}
export default AuthenticareUserService;