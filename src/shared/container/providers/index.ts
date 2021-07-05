import {container} from 'tsyringe';
import DiskStorageProvider from './StorageProvider/implementantios/DiskStorageProvider';
import IStorageProvider from './StorageProvider/models/IStorageProvider';


container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    DiskStorageProvider
)