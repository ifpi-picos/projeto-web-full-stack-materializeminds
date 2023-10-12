import express,{Request,Response,NextFunction} from 'express'
import 'express-async-errors'
import swaggerUi from 'swagger-ui-express'


import router from './routes/Routes'
import swaggerDocs from './swagger.json'

const app = express()

app.use(express.json())
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
