document.getElementById('formAgendamento').addEventListener('submit', async (e) => {
    e.preventDefault()

    try {
        const dados = {
            nome: document.getElementById('nome').value,
            barber: document.getElementById('barber').value,
            telefone: document.getElementById('telefone').value,
            servico: document.getElementById('servico').value,
            dataAgendamento: document.getElementById('dataAgendamento').value,
            horaAgendamento: document.getElementById('horaAgendamento').value,
            observacoes: document.getElementById('observacoes').value
        };


        const res = await fetch('http://localhost:3000/api/agendamento', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        const data = await res.json();

        if(!res.ok) {
            throw new Error(data.message);
        }
        
        console.log("Agendado com sucesso!: ", data)

    } catch (error) {
        console.log("Erro: ", error)
    }
})