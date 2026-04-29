import {defineConfig} from 'drizzle-kit'

export default defineConfig({
    agendamento: "./database/schema.js",
    schema: "./database/schema.js",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials : {
        url: process.env.DATABASE_URL
    }
})