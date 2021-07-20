import path from 'path';
import fs from 'fs';
import uploadConfig from '../../../config/upload';
import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
import IStorageProvider from '@shared/container/Providers/StorageProvider/models/IStorageProvider';

interface IRequest {
    user_id: string;
    avatarFilename: any;
}

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {

        const user = await this.usersRepository.findById(user_id)

        if (!user) {
            throw new AppError('only authenticated can change avatar', 401);
        }

        if (user.avatar) {
            await this.storageProvider.deleteFile(user.avatar);
        }

        const fileName = await this.storageProvider.saveFile(avatarFilename)

        user.avatar = avatarFilename;

        await this.usersRepository.save(user);

        return user;
    }
}
export default UpdateUserAvatarService;