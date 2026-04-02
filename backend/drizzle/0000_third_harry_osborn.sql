CREATE TABLE "agendamento" (
	"id_agendamento" serial PRIMARY KEY NOT NULL,
	"nome" text NOT NULL,
	"barbeiro" text NOT NULL,
	"barbeiro_id" serial NOT NULL,
	"telefone" varchar(20),
	"servico" text NOT NULL,
	"data_agendamento" date NOT NULL,
	"hora_agendamento" time NOT NULL,
	"observacoes" text,
	"status" varchar(20) DEFAULT 'pendente',
	"criado_em" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "barbeiros" (
	"id_barbeiro" serial PRIMARY KEY NOT NULL,
	"nome" text NOT NULL,
	"email" varchar(150) NOT NULL,
	"senha" text NOT NULL,
	"telefone" text,
	"criado_em" timestamp DEFAULT now(),
	CONSTRAINT "barbeiros_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "agendamento" ADD CONSTRAINT "agendamento_barbeiro_id_barbeiros_id_barbeiro_fk" FOREIGN KEY ("barbeiro_id") REFERENCES "public"."barbeiros"("id_barbeiro") ON DELETE no action ON UPDATE no action;