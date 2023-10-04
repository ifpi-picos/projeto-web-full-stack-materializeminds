import express from 'express'

import router from './routes/Routes'


const app = express()

app.use(express.json())

app.use('/',router)

app.listen(3333,()=>{
  console.log("Aplicação rodando na porta 3333")
})
