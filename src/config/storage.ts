import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';

interface StorageConfig {
  driver: 's3' | 'disk';
  tmpFolderPath: string;
  uploadFolderPath: string;
  multer: {
    storage: StorageEngine;
  };
  configs: {
    disk: Record<string, unknown>;
    s3: {
      bucket: string;
    };
  };
}

const tmpFolderPath = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  driver: process.env.STORAGE_DRIVER,

  tmpFolderPath,
  uploadFolderPath: path.resolve(tmpFolderPath, 'uploads'),
  multer: {
    // where file will be     save
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
  },
  configs: {
    disk: {},
    s3: {
      bucket: 'gobarber-users-profile-picture',
    },
  },
} as StorageConfig;
