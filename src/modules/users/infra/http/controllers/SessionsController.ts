import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticareUserService from '@modules/users/services/AuthenticateUserService';


export default class SessionsController {
    public async create(request:Request, response:Response): Promise<Response> {
        try {
            const {email, password} = request.body;
    
            const autenticateUser = container.resolve(AuthenticareUserService);
    
            const { user, token } = await autenticateUser.execute({
                email,
                password,
            });
    
            return response.json({ user, token });
        } catch (err) {
            return response.status(err.statusCode).json({ error: err.message})
        }
    }
}