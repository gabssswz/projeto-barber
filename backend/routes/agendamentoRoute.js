import { Router } from "express"
import { db } from "../database/db";
import { agendamento } from "../database/schema";

const router = Router()

router.post("/", async(req,res) => {
    try{
        const { content } = req.body;

        if(!content) {
            return res.status(400).json({message: "O conteudo esta vazio!"});
        }

        const { novoAgendamento } = await db.insert(agendamento).values({content})
    }catch(error){
        console.error(error)
        res.status(500).json({message: "Servidor não funcionou!"})
    }
})