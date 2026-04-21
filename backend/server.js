import express from 'express';
import 'dotenv/config'
import { router } from './routes/agendamentoRoute.js';
import cors from "cors";

const app = express()
const port = process.env.PORT

app.use(express.json());
app.use(cors())

app.use('/api/agendamento', router);
app.listen(port, () => {
    console.log("Servidor ligado! na porta: ", port)
})