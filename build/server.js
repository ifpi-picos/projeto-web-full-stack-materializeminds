"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const morgan_1 = __importDefault(require("morgan"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const fs = __importStar(require("fs"));
const Routes_1 = __importDefault(require("./routes/Routes"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
// Carregar variáveis de ambiente a partir do arquivo .env
dotenv_1.default.config();
// Configurar o Firebase Admin SDK
const configPath = process.env.FIREBASE_CONFIG_PATH;
if (!configPath) {
    console.error('Variável de ambiente FIREBASE_CONFIG_PATH não definida.');
    process.exit(1);
}
// Crie o caminho absoluto para o arquivo de configuração JSON
const absoluteConfigPath = path_1.default.resolve(__dirname, configPath);
// Carrega o arquivo de configuração JSON usando fs.readFileSync
const configData = fs.readFileSync(absoluteConfigPath, 'utf8');
const serviceAccount = JSON.parse(configData);
const BUCKET = process.env.FIREBASE_STORAGE_BUCKET;
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
    storageBucket: BUCKET
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.use(Routes_1.default);
app.use((error, request, response, next) => {
    return response.json({
        status: "error",
        message: error.message
    });
    next();
});
app.listen(3333, () => {
    console.log("Aplicação rodando na porta 3333");
});
