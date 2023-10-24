import express,{Request,Response,NextFunction} from 'express'
import 'express-async-errors'
import swaggerUi from 'swagger-ui-express'
import morgan from 'morgan'
import admin from "firebase-admin";
import dotenv from "dotenv";
import path from"path";
import * as fs from 'fs';


import router from './routes/Routes'
import swaggerDocs from './swagger.json'

// Carregar variáveis de ambiente a partir do arquivo .env
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

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
app.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs))

app.use(router)

app.use((error:Error,request:Request,response:Response,next:NextFunction)=>{
  return response.json({
    status:"error",
    message:error.message
  })
  next()
})

app.listen(3333,()=>{
  console.log("Aplicação rodando na porta 3333")
})
