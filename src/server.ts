import express,{Request,Response,NextFunction} from 'express'
import 'express-async-errors'
import swaggerUi from 'swagger-ui-express'
import morgan from 'morgan'
import admin from "firebase-admin";
import dotenv from "dotenv";
import path from"path";
import * as fs from 'fs';
import cors from 'cors';

import router from './routes/Routes'
import swaggerDocs from './swagger.json'

dotenv.config();

// Configurar o Firebase Admin SDK
const configPath = process.env.FIREBASE_CONFIG_PATH;

if (!configPath) {
  console.error('Variável de ambiente FIREBASE_CONFIG_PATH não definida.');
  process.exit(1);
}

// Crie o caminho absoluto para o arquivo de configuração JSON
const absoluteConfigPath = path.resolve(__dirname, configPath);

// Carrega o arquivo de configuração JSON usando fs.readFileSync
const configData = fs.readFileSync(absoluteConfigPath, 'utf8');

const serviceAccount = JSON.parse(configData) as admin.ServiceAccount;

const BUCKET = process.env.FIREBASE_STORAGE_BUCKET;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET
});

const app = express()
const port = process.env.PORT || 3333;

app.use(cors());

app.options('*', cors());


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
app.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs))

app.use(router)

app.use((error:Error,request:Request,response:Response,next:NextFunction)=>{
  response.json({
    status:"error",
    message:error.message
  });
  next()
})

app.listen(port,()=>{
  console.log(`Aplicação online na porta ${port}`)
})
