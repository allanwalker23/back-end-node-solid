export default interface IStorageProvider{
    saveFile(file:String):Promise<string>;
    deleteFile(file:string):Promise<void>;
}