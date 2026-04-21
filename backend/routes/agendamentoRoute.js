import { Router } from "express"
import { db } from "../database/db.js";
import { agendamento } from "../database/schema.js";

export const router = Router()

router.post("/", async(req,res) => {
    try{
        const { nome,barber,telefone,servico,dataAgendamento,horaAgendamento,observacoes } = req.body;

        //DEBUG NO SERVER
        console.log(req.body)

        if(!nome || !barber || !dataAgendamento || !horaAgendamento || !telefone || !servico ) {
            return res.status(400).json({message: "O conteudo esta vazio!"});
        }

        const [novoAgendamento] = await db
        .insert(agendamento)
        .values({nome,barber, telefone, servico, dataAgendamento, horaAgendamento, observacoes})
        .returning();

        res.status(201)
        .json({message: "Novo Agendamento Criado!", agendamento: novoAgendamento});
    }catch(error){
        console.error(error)
        res.status(500).json({message: "Servidor não funcionou!"})
    }
})

router.get('/', async(req,res) => {
    try {
        const getAgendamento = await db.select().from(agendamento)

        res.status(200).json(getAgendamento);
    } catch (error) {
        console.error("Erro: ", error)
        res.status(500).json({message: "Erro interno no servidor wow wow"});
    }
})