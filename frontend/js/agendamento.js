/* Alterar entre as abas de filtro */
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
/* Adiciona o checkbox e o card fica laranja */
document.querySelectorAll('.servico-item').forEach(card => {
    card.addEventListener('click', function(e) {
        if (e.target.tagName === 'INPUT') return;

        const input = this.querySelector('input[type="checkbox"]');
        input.checked = !input.checked;

        if (input.checked) {
            this.classList.add('selecionado');
        } else {
            this.classList.remove('selecionado');
        }

        atualizarResumo();
    });
});
/* Marcar o chebox do barbeiro */
document.querySelectorAll('.barbeiro-info').forEach(card => {
    card.addEventListener('click', function() {
        // Remove selecionado de todos
        document.querySelectorAll('.barbeiro-info').forEach(c => {
            c.classList.remove('selecionado');
            c.querySelector('.radio-custom').classList.remove('marcado');
        });

        // Marca o clicado
        const input = this.querySelector('input[type="radio"]');
        input.checked = true;
        this.classList.add('selecionado');
        this.querySelector('.radio-custom').classList.add('marcado');
    });
});

/* Muda os steps quando apertar o botão continuar */
const botao = document.querySelector('.btn-continuar');
const servicos = document.querySelector('.servicos');
const barbeiro = document.querySelector('.section-barbeiro');
const circulos = document.querySelectorAll('.step-circulo');
const steps = document.querySelectorAll('.step-ativo, .step');

botao.addEventListener('click', function() {
    servicos.style.display = 'none';
    barbeiro.style.display = 'block';
    
    steps[0].classList.remove('step-ativo');
    steps[0].classList.add('step-concluido');
    steps[1].classList.remove('step');
    steps[1].classList.add('step-ativo');
    
    circulos[0].textContent = '✓';
});

/* Voltar steps */
const btnVoltar = document.querySelector('.btn-voltar');

btnVoltar.addEventListener('click', function() {
    barbeiro.style.display = 'none';
    servicos.style.display = 'block';
    
    steps[0].classList.remove('step-concluido');
    steps[0].classList.add('step-ativo');
    steps[1].classList.remove('step-ativo');
    steps[1].classList.add('step');
    
    circulos[0].textContent = '1';
});

/* Rodape do agentamento para ver o valor total*/
function atualizarResumo() {
    const marcados = document.querySelectorAll('input[type="checkbox"]:checked');

    let total = 0;
    let minutos = 0;

    marcados.forEach(input => {
        const card = input.closest('.servico-item');

        // Pega o preço — você vai precisar adicionar data-preco e data-tempo no HTML
        total += Number(card.dataset.preco);
        minutos += Number(card.dataset.tempo);
    });

    // Atualiza o rodapé na tela
    document.getElementById('resumo-qtd').textContent =
        `${marcados.length} serviço(s) · ${minutos} min`;
    document.getElementById('resumo-total').textContent =
        `R$ ${total.toFixed(2).replace('.', ',')}`;

/* Invisivel até selecionar um serviço */

const rodape = document.getElementById('rodape-resumo');

if (marcados.length > 0) {
    rodape.style.display = 'flex';
} else {
    rodape.style.display = 'none';
}

const btnContinuar = document.querySelector('.btn-continuar');

if (marcados.length > 0) {
    btnContinuar.disabled = false;
} else {
    btnContinuar.disabled = true;
}
}

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