import express from 'express'
import swaggerUi from 'swagger-ui-express'

import router from './routes/Routes'
import swaggerDocs from './swagger.json'

const app = express()

app.use(express.json())
app.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs))

app.use('/',router)

app.listen(3333,()=>{
  console.log("Aplicação rodando na porta 3333")
})
