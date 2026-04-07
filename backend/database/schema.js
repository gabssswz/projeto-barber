import { pgTable, varchar, timestamp, date, time, serial,text } from "drizzle-orm/pg-core";

export const agendamento = pgTable("agendamento", {
    id_agendamento: serial("id_agendamento").primaryKey(),
    nome: text("nome").notNull(),
    barber: text("barbeiro").notNull(),
    telefone: varchar("telefone", {length: 20}),
    servico: text("servico").notNull(),
    dataAgendamento: date("data_agendamento").notNull(),
    horaAgendamento: time("hora_agendamento").notNull(),
    observacoes: text("observacoes"),
    status: varchar("status", {length: 20 }).default("pendente"),
    criadoEm: timestamp("criado_em").defaultNow()

})

export const barbeiros = pgTable("barbeiros", {
    id_barbeiro: serial("id_barbeiro").primaryKey(),
    nome: text("nome").notNull(),
    email: varchar("email", {length: 150}).notNull().unique(),
    senha: text("senha").notNull(),
    telefone: text("telefone", {length: 20}),
    criadoEm: timestamp("criado_em").defaultNow()
})