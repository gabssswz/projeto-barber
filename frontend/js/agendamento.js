const filtros = document.querySelectorAll('.filtro-btn');
const cards = document.querySelectorAll('.servico-item');

filtros.forEach(btn => {
    btn.addEventListener('click', () => {
        filtros.forEach(b => b.classList.remove('ativo'));
        btn.classList.add('ativo');

        const categoria = btn.dataset.categoria;

        cards.forEach(card => {
            if (card.dataset.categoria === categoria) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

document.querySelectorAll('.servico-item').forEach(card => {
    card.addEventListener('click', function() {
        const input = this.querySelector('input[type="radio"]');
        input.checked = true;
    });
});

/*
document.getElementById('formAgendamento').addEventListener('submit', async (e) => {
    e.preventDefault()

    try {
        const dados = {
            nome: document.getElementById('nome').value,
            barber: document.getElementById('barbeiro').value,
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
})          */