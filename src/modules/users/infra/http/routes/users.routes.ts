import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import {container} from 'tsyringe';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UsersRepository from '../../typeorm/repositories/UsersRepository';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig);

const usersController= new UsersController();
const userAvatarController= new UserAvatarController()
usersRouter.post('/',usersController.create)

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update
);
export default usersRouter;
