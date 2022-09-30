import { v4 as uuid } from 'uuid';
export const fileName = (req: Express.Request, file: Express.Multer.File, callback: Function) => {
    
    const fileExtension = file.mimetype.split('/')[1];
    // const name = file.originalname.split('.')[0];
    const fileName = `${ uuid() }.${ fileExtension }`
    
    callback(null, fileName);
}