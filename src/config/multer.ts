import { Request } from 'express';
import multer, { diskStorage } from 'multer';
import path from 'path';
import crypto from 'crypto';
import { Express } from 'express-serve-static-core';

interface IParamsMulter {
  request: Request;
  file: Express.Multer.File;
  cb: (error: Error | null, destination: boolean | undefined) => void;
}

const multerConfig = {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),

  storage: diskStorage({
    destination: (request, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
    },
    filename: (request, file, cb) => {
      crypto.randomBytes(16, (error, hash) => {
        if (error) {
          cb(error, '');
        }
        const fileName = `${hash.toString('hex')}-${file.originalname}`;

        cb(null, fileName);
      });
    },
  }),

  limits: {
    fileSize: 2 * 1024 * 1024,
  },

  fileFilter: ( request:any, file:any, cb:any ) => {
    const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid'), false);
    }
  },
};

const upload = multer(multerConfig);

export default upload;
