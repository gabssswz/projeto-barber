//ARQUIVO PARA LISTAR AGENDAMENTOS FUTURAMENTE NA PAGINA DO *BARBEIRO*!!!

const listarAgendamento = async() => {
     try {
        const res = await fetch("http://localhost:3000/api/agendamento");

        const dados = await res.json();
        
        if(!res.ok){
            throw new Error(data.message);
        }

        console.log(dados)

        renderizarAgendamentos(dados);

     } catch (error) {
        console.error("Erro: ", error)
     }
};

const renderizarAgendamentos = (lista) => {
    const container = document.getElementById('listaAgendamento')

    lista.forEach((item) => {
        const div = document.createElement('div')
        div.innerHTML = `
            <p><strong>Nome: </strong> ${item.nome} </p>
            <p><strong>Barbeiro: </strong> ${item.barber} </p>   
            <p><strong>Servico: </strong> ${item.servico} </p>   
            <p><strong>Data: </strong> ${item.dataAgendamento} </p>   
            <p><strong>Hora: </strong> ${item.horaAgendamento} </p> 
            <hr>  
    `;
    container.appendChild(div);
});

}

listarAgendamento();
