import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';




export default class UsersAvatarController {
    public async update(request:Request, response:Response): Promise<Response> {
        try {
            const updateUserAvater = container.resolve(UpdateUserAvatarService);
      
            const user = await updateUserAvater.execute({
              user_id: request.user.id,
              avatarFilename: request?.file?.filename,
            });
      
            return response.json(user)
      
          } catch (err) {
              return response.status(400).json({ error: err.message})
          }
    }   
}