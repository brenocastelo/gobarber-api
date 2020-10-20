import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpFolderPath = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpFolderPath,
  uploadFolderPath: path.resolve(tmpFolderPath, 'uploads'),

  // where file will be save
  storage: multer.diskStorage({
    // directory
    destination: tmpFolderPath,
    // save filename
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
