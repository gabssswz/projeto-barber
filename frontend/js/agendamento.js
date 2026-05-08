const agendamento = {
    servicos: [],
    barber: null,
    data: null,
    dataFormatada: null,
    hora: null,
    nome: '',
    telefone: ''
};


const meses = ['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'];
const diasSemana = ['DOM','SEG','TER','QUA','QUI','SEX','SÁB'];

/* Gera os próximos 14 dias dinamicamente no calendário */
const grid = document.querySelector('.grid-datas');


for (let i = 0; i < 14; i++) {
    // 1. Cria a data de cada dia
    const dia = new Date();
    dia.setDate(dia.getDate() + i);

    // 2. Cria o card
    const diaSemanaNum = dia.getDay();
    const card = document.createElement('button');
    card.classList.add('dia-card');
    card.setAttribute('role','listitem');
    card.setAttribute('type','button');

    // 3. Verifica se é e domingo
    if (diaSemanaNum === 0) {
    card.classList.add('domingo');
    card.disabled = true;
    card.setAttribute('aria-disabled','true');
    card.innerHTML = `
        <span class="dia-semana">DOM</span>
        <span class="dia-numero">${dia.getDate()}</span>
        <span class="dia-mes">FECHADO</span>
    `;
    } else { // 4. Cria os outros cards do mês
        const ano = dia.getFullYear();
        const mes = String(dia.getMonth() + 1).padStart(2,'0');
        const diaNum = String(dia.getDate()).padStart(2,'0');
        const dataISO = `${ano}-${mes}-${diaNum}`;
        const dataDisplay = `${diasSemana[diaSemanaNum]}, ${dia.getDate()} ${meses[dia.getMonth()]}`;

        card.dataset.data = dataISO;
        card.dataset.display = dataDisplay;
        card.dataset.diaSemana = diaSemanaNum;
        card.setAttribute('aria-label',dataDisplay);

        card.innerHTML = `
            <span class="dia-semana">${diasSemana[diaSemanaNum]}</span>
            <span class="dia-numero">${dia.getDate()}</span>
            <span class="dia-mes">${meses[dia.getMonth()]}</span>
        `;
        card.addEventListener('click', () => selecionarData(card))
    }

    // 5. Adiciona o card no grid
    grid.appendChild(card);
}

function selecionarData(card){
    document.querySelectorAll('.dia-card').forEach(c =>
         c.classList.remove('selecionado'));
         card.classList.add('selecionado');

         agendamento.data = card.dataset.data;
         agendamento.dataFormatada = card.dataset.display;

         const isSabado = Number(card.dataset.diaSemana) === 6;
         gerarHorarios(isSabado ? 18 : 20);

         agendamento.hora = null;
         atualizarBtnData();
}

function gerarHorarios(horaFim) {
    const gridHorarios = document.getElementById('grid-horarios');
    const secaoHorarios = document.getElementById('secao-horarios');
    gridHorarios.innerHTML = '';

    const horaInicio = 9;
    const intervalo = 30;

    for(let h = horaInicio; h < horaFim; h++) {
        for(let m = 0; m < 60; m+= intervalo) {
            const hh = String(h).padStart(2,'0');
            const mm = String(m).padStart(2,'0');
            const horario = `${hh}:${mm}`;

            const btn = document.createElement('button');
            btn.classList.add('horario-btn');
            btn.textContent = horario;
            btn.type='button';
            btn.setAttribute('aria-label', `Horario ${horario}`);

            btn.addEventListener('click', () => {
                document.querySelectorAll('.horario-btn').forEach(b => b.classList.remove('selecionado'));
                btn.classList.add('selecionado');
                agendamento.hora = horario;
                atualizarBtnData();
            });
            gridHorarios.appendChild(btn);
        }
    }secaoHorarios.style.display = 'block';
}

function atualizarBtnData() {
    const btn = document.querySelector('#section-data .avancar-step');
    btn.disabled = !(agendamento.data && agendamento.hora);
}

/* Alterar entre as abas de filtro */
const filtros = document.querySelectorAll('.filtro-btn');
const todosServicosCards = document.querySelectorAll('.servico-item');

filtros.forEach(btn => {
    btn.addEventListener('click', () => {
        filtros.forEach(b => {
            b.classList.remove('ativo');
            b.setAttribute('aria-selected','false');
        });
        btn.classList.add('ativo');
        btn.setAttribute('aria-selected','true');

        const categoria = btn.dataset.categoria;
        todosServicosCards.forEach(card => {
            card.style.display = card.dataset.categoria === categoria ? 'flex' : 'none';
        });
    });
});

todosServicosCards.forEach(card => {
    card.addEventListener('click', function () {

        const input = this.querySelector('input');
        const nome = this.dataset.nome;
        const preco = Number(this.dataset.preco);
        const tempo = Number(this.dataset.tempo);

        if (input.checked) {
            // desmarca
            input.checked = false;
            this.classList.remove('selecionado');
            agendamento.servicos = agendamento.servicos.filter(s => s.nome !== nome);

        } else {
            // marca
            input.checked = true;
            this.classList.add('selecionado');

            const existe = agendamento.servicos.some(s => s.nome === nome);
            if (!existe) {
                agendamento.servicos.push({ nome, preco, tempo });
            }
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

        agendamento.barber = {
            id:this.dataset.id,
            nome:this.dataset.nome
        };

        // ← ADICIONA AQUI ↓
        const btnAvancar = document.querySelector('.section-barbeiro .avancar-step');
        btnAvancar.disabled = false;
    });
});

const btnVoltar = document.querySelector('.btn-voltar');
const stepEls = document.querySelectorAll('.step-ativo, .step');
const circulos = document.querySelectorAll('.step-circulo');
const steps = document.querySelectorAll('.step-ativo, .step');

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

        if(proxima == '#section-dados') {
            preencherResumoFinal();
        }

        window.scrollTo({top: 0, behavior: 'smooth'})

    });
});

/* Voltar steps */
document.querySelectorAll('.btn-voltar').forEach(btn => {
    btn.addEventListener('click', function () {
        const voltarPara = this.dataset.voltar;
        const step = Number(this.dataset.step); // step atual
 
        this.closest('section').style.display = 'none';
        document.querySelector(voltarPara).style.display = 'block';
 
        stepEls[step - 1].classList.remove('step-ativo');
        stepEls[step - 1].classList.add('step');
        stepEls[step - 2].classList.remove('step-concluido');
        stepEls[step - 2].classList.add('step-ativo');
        circulos[step - 2].textContent = step - 1;
 
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

function preencherResumoFinal() {
    const total = agendamento.servicos.reduce((acc,s) => acc + s.preco, 0);

    document.getElementById('resumo-servicos-lista').textContent = 
        agendamento.servicos.map(s => s.nome).join(', ') || '-';

    document.getElementById('resumo-barbeiro-nome').textContent =
        agendamento.barber ? agendamento.barber.nome : '-';

    const dataFormatada = agendamento.data.split('-').reverse().join('/');
    document.getElementById('resumo-data-hora').textContent =
        agendamento.data ? `${dataFormatada} às ${agendamento.hora}` : '-';
    
    document.getElementById('resumo-valor-final').textContent = 
        `R$ ${total.toFixed(2).replace('.',',')}`;
}
const inputTelefone = document.getElementById('input-telefone');
inputTelefone.addEventListener('input', function() {
    let v = this.value.replace(/\D/g,'').slice(0,11);
    if(v.length >= 7) {
        v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
    } else if (v.length >= 3) {
        v = `(${v.slice(0,2)}) ${v.slice(2)}`;
    } else if (v.length > 0) {
        v = `(${v})`;
    }
    this.value = v;
    validarFormDados();
})

const inputNome = document.getElementById('input-nome');
inputNome.addEventListener('input', validarFormDados);

function validarFormDados() {
    const nome = inputNome.value.trim();
    const telefone = inputTelefone.value.replace(/\D/g, '');
    const btnConfirmar = document.getElementById('btn-confirmar');
    btnConfirmar.disabled = !(nome.length >= 3 && telefone.length >= 10);
}

/* Rodape do agentamento para ver o valor total*/
function atualizarResumo() {
    const total = agendamento.servicos.reduce((acc, s) => acc + s.preco, 0);
    const minutos = agendamento.servicos.reduce((acc, s) => acc + s.tempo, 0);
    const qtd = agendamento.servicos.length;

    document.getElementById('resumo-qtd').textContent =
        `${qtd} serviço(s) · ${minutos} min`;

    document.getElementById('resumo-total').textContent =
        `R$ ${total.toFixed(2).replace('.', ',')}`;

    const rodape = document.getElementById('rodape-resumo');
    rodape.style.display = qtd > 0 ? 'flex' : 'none';

    const btnContinuar = document.querySelector('#section-servicos .avancar-step');
    btnContinuar.disabled = qtd === 0;
}


document.getElementById('btn-confirmar').addEventListener('click',async () => {
    agendamento.nome = inputNome.value.trim();
    agendamento.telefone = inputTelefone.value;

    const btnConfirmar = document.getElementById('btn-confirmar');
    btnConfirmar.disabled = true;
    btnConfirmar.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Aguarde...';

    try {
        const payload = {
            nome: agendamento.nome,
            barber: agendamento.barber.nome,
            telefone: agendamento.telefone,
            servico: agendamento.servicos.map(s => s.nome).join(', '),
            dataAgendamento: agendamento.data,
            horaAgendamento: agendamento.hora
        };
        const res = await fetch ('http://localhost:3000/api/agendamento', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Erro ao Agendar!');

        mostrarModalSucesso();
    } catch(err) {
        console.error('Erro ao agendar: ', err)
        mostrarErro(err.message);

        btnConfirmar.disabled = false;
        btnConfirmar.innerHTML = '<i class="fa-solid fa-check"></i> Confirmar Agendamento';

    }
});

function mostrarModalSucesso() {
    const total = agendamento.servicos.reduce((acc,s) => acc + s.preco, 0);
    const servicos = agendamento.servicos.map(s => s.nome).join(', ');

    document.getElementById('modal-nome').textContent = agendamento.nome;
    document.getElementById('modal-servicos').textContent = servicos;
    document.getElementById('modal-barbeiro').textContent = agendamento.barber.nome;
    document.getElementById('modal-data').textContent = `${agendamento.dataFormatada} às ${agendamento.hora}`;
    document.getElementById('modal-total').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
 
    const msg = encodeURIComponent(
        `Ola! Acabei de agendar um horario na Elite Barbearia \n \n` + `Nome: ${agendamento.nome} \n` + `Serviço(s): ${servicos} \n` + `Barbeiro: ${agendamento.barber.nome} \n` + `Data: ${agendamento.dataFormatada} as ${agendamento.hora} \n` + `Total: ${total.toFixed(2).replace('.',',')}`
    )

    //TODO: trocar o numero pro numero real da elite barbearia
    document.getElementById('btn-whatsapp').href = `https://wa.me/559999999999?text=${msg}`
    
    const modal = document.getElementById('modal-sucesso');
    modal.style.display = 'flex';

    modal.querySelector('h2').focus();

}

function fecharModal() {
    document.getElementById('modal-sucesso').style.display = 'none';
    document.body.style.overflow = '';

    window.location.href = 'index.html';
}

document.getElementById('modal-overlay').addEventListener('click',fecharModal);

document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && document.getElementById('modal-sucesso').style.display === 'flex') {
        fecharModal();
    }
})

function mostrarErro(mensagem) {
    // 1. Cria um div dinamicamente
    const toast = document.createElement('div');
    toast.id = 'toast-error';
    toast.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${mensagem}`;
    
    // 2. Adiciona na página
    document.body.appendChild(toast);

    // 3. Adiciona classe 'visivel' para animar a entrada
    toast.classList.add('visivel');

    // 4. Depois de 4 segundos, remove a classe (anima saída) e deleta o elemento
    setTimeout(() => {
        toast.classList.remove('visivel');
        setTimeout(() => toast.remove(), 400); // espera a animação terminar
    }, 4000);
}