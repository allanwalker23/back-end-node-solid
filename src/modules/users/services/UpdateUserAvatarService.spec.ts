import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
        name:'John Doe',
        email:'johndoe@jsd.com',
        password:'123456'
    })

    const updateUserAvatar = await updateUserAvatarService.execute({
        user_id:user.id,
        avatarFilename:'avatar.jpg'
    });

    expect(user.avatar).toBe('avatar.jpg')
   
  });

  it('should not be able to update avatar from no existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    expect(updateUserAvatarService.execute({
        user_id:'no-existing-user',
        avatarFilename:'avatar.jpg'
    })).rejects.toBeInstanceOf(AppError)
   
  });

  it('should delete old avatar when update new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile=jest.spyOn(fakeStorageProvider,'deleteFile');

    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
        name:'John Doe',
        email:'johndoe@jsd.com',
        password:'123456'
    })

    await updateUserAvatarService.execute({
        user_id:user.id,
        avatarFilename:'avatar.jpg'
    });

    await updateUserAvatarService.execute({
        user_id:user.id,
        avatarFilename:'avatar2.jpg'
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg')

    expect(user.avatar).toBe('avatar2.jpg')
   
  });

})