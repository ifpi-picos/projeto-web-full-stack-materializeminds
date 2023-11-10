// service.ts
import admin from "firebase-admin";
import { Request, Response, NextFunction } from "express";



export function uploadImage (req: Request, res: Response, next: NextFunction) {
  const bucket = admin.storage().bucket();
  

  if (!req.file) {
    return next();
  }

  const imagem = req.file;

  const fullNamefile = Date.now() + "." + imagem.originalname.split(".").pop();

  const file = bucket.file(fullNamefile);

  const stream = file.createWriteStream({
    metadata: {
      contentType: imagem.mimetype,
    },
  });

  stream.on("error", (e) => {
    console.log(e);
    next(e); // Encaminhe o erro para o próximo middleware de erro, se necessário.
  });

  stream.on("finish", async () => {
    await file.makePublic();
    
    req.headers.filebaseUrl =`https://firebasestorage.googleapis.com/v0/b/${process.env.FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(fullNamefile)}?alt=media`; 

    next();
  });

  stream.end(imagem.buffer);
}