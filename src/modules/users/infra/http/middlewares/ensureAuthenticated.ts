import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

function ensureAuthenticanted (request: Request, response: Response, next: NextFunction): void {

   //VALIDAÇÃO DO TOKEN
   
    //coletar o token de dentro do header
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new AppError('JWT token is missing', 401);
    };
    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);
        console.log(decoded);

        // sub é o que é retornado com o id do usuario
        const { sub } = decoded as TokenPayload;

        request.user = {
            id: sub, 
        } 
        
        return next();
    } catch {
        throw new AppError('Invalid JWT token', 401);
    }
}
export default ensureAuthenticanted