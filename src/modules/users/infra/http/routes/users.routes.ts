import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ensureAuthenticanted from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController';
import UsersAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();

 
usersRouter.post('/', usersController.create);

usersRouter.patch('/avatar', ensureAuthenticanted, upload.single('avatar'), usersAvatarController.update) 

export default usersRouter;




