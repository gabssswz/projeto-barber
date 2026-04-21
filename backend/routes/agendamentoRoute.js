import { Router } from "express"
import { db } from "../database/db.js";
import { agendamento } from "../database/schema.js";
import { eq, and } from "drizzle-orm";

export const router = Router();

const HORARIO_ABERTURA = 9 * 60;
const HORARIO_FECHAMENTO = 20 * 60;
const HORARIO_SABADO_FECHAMENTO = 18 * 60;

router.post("/", async(req,res) => {
    try{
        const { nome,barber,telefone,servico,dataAgendamento,horaAgendamento,observacoes } = req.body;

        //DEBUG NO SERVER
        console.log(req.body)

        if(!nome || !barber || !dataAgendamento || !horaAgendamento || !telefone || !servico ) {
            return res.status(400).json({message: "O conteudo esta vazio!"});
        }

        const telefoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/;
        if(!telefoneRegex.test(telefone)) {
            return res.status(400).json({message: "Telefone Invalido!"});
        }

        const agora = new Date();
        const dataHoraAgendamento = new Date(`${dataAgendamento}T${horaAgendamento}`)

        if (isNaN(dataHoraAgendamento.getTime())) {
            return res.status(400).json({message: "Data ou Hora inválida!"});
        }

        if (dataHoraAgendamento < agora) {
            return res.status(400).json({message: "Não é possivel agendar em uma data/hora passada!"});
        }

       const diaDaSemana = dataHoraAgendamento.getDay();

       if(diaDaSemana === 0) {
        return res.status(400).json({message: "Não funcionamos aos Domingos!"});
       }

       const horarioFechamento = diaDaSemana === 6 ? HORARIO_SABADO_FECHAMENTO : HORARIO_FECHAMENTO;

       const [hora, minuto] = horaAgendamento.split(":").map(Number);
       const horarioEmMinutos = hora * 60 + minuto;

       if(horarioEmMinutos < HORARIO_ABERTURA || horarioEmMinutos >= horarioFechamento) {
        const fechamentoTexto = diaDaSemana === 6 ? "20:00" : "18:00";
        return res.status(400).json({message: `Fora do horario de funcionamento (09:00 - ${fechamentoTexto}!`})
       }

       const horarioOcupado = await db 
       .select() 
       .from(agendamento) 
       .where(
        and( 
            eq(agendamento.barber,barber),
            eq(agendamento.dataAgendamento, dataAgendamento),
            eq(agendamento.horaAgendamento, horaAgendamento)
        )
    );

        if(horarioOcupado.length > 0) {
            return res.status(400).json({message: "Horario já reservado com este barbeiro!"})
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