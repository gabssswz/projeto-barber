/* Gera os próximos 14 dias dinamicamente no calendário */
const grid = document.querySelector('.grid-datas');

const meses = ['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'];
const diasSemana = ['DOM','SEG','TER','QUA','QUI','SEX','SÁB'];

for (let i = 0; i < 14; i++) {
    // 1. Cria a data de cada dia
    const dia = new Date();
    dia.setDate(dia.getDate() + i);

    // 2. Cria o card
    const card = document.createElement('div');
    card.classList.add('dia-card');

    // 3. Verifica se é e domingo
    if (dia.getDay() === 0) {
    card.classList.add('domingo');
    card.innerHTML = `
        <span class="dia-semana">DOM</span>
        <span class="dia-numero">${dia.getDate()}</span>
        <span class="dia-mes">FECHADO</span>
    `;
    } else { // 4. Cria os outros cards do mês
    card.innerHTML = `
        <span class="dia-semana">${diasSemana[dia.getDay()]}</span>
        <span class="dia-numero">${dia.getDate()}</span>
        <span class="dia-mes">${meses[dia.getMonth()]}</span>
    `;
    }

    // 5. Adiciona o card no grid
    grid.appendChild(card);
}

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
    card.addEventListener('click', function (e) {
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
/* Marcar o radio do barbeiro */
document.querySelectorAll('.barbeiro-info').forEach(card => {
    card.addEventListener('click', function () {
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

        // ← ADICIONA AQUI ↓
        const btnAvancar = document.querySelector('.section-barbeiro .avancar-step');
        btnAvancar.disabled = false;
    });
});

/* Avança entre as seções */
document.querySelectorAll('.avancar-step').forEach(btn => {
    btn.addEventListener('click', function () {
        const proxima = this.dataset.proxima;
        const step = Number(this.dataset.step);

        this.closest('section').style.display = 'none';
        document.querySelector(proxima).style.display = 'block';

        steps[step - 1].classList.remove('step-ativo');
        steps[step - 1].classList.add('step-concluido');
        steps[step].classList.remove('step');
        steps[step].classList.add('step-ativo');

        circulos[step - 1].textContent = '✓';
    });
});

/* Voltar steps */
const btnVoltar = document.querySelector('.btn-voltar-steps');
const circulos = document.querySelectorAll('.step-circulo');
const steps = document.querySelectorAll('.step-ativo, .step');

btnVoltar.addEventListener('click', function () {
    document.querySelector('.section-barbeiro').style.display = 'none';
    document.querySelector('.servicos').style.display = 'block';

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

    const btnContinuar = document.querySelector('.servicos .avancar-step');

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
})          */