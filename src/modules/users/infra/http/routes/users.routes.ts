import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import ensureAuthenticanted from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

 
usersRouter.post('/', async (request, response) => {

    try {
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password
        });

        return response.json(user);
    } catch (err) {
        return response.status(400).json({ error: err.message})
    }
});

usersRouter.patch('/avatar', ensureAuthenticanted, upload.single('avatar'), async (request, response) => {
    try {
      const updateUserAvater = new UpdateUserAvatarService();

      const user = await updateUserAvater.execute({
        user_id: request.user.id,
        avatarFilename: request?.file?.filename,
      });

      return response.json(user)

    } catch (err) {
        return response.status(400).json({ error: err.message})
    }
});

export default usersRouter;




