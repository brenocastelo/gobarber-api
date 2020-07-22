import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

export default {
  // where file will be save
  storage: multer.diskStorage({
    // directory
    destination: path.resolve(__dirname, '..', '..', 'tmp'),
    // save filename
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
