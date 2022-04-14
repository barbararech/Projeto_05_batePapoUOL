let dadosCarregados = [];
let nomeusuario = null;

// Adicionar usuário
 novousuario();
function novousuario(){
    nomeusuario = prompt("Qual o seu nome?");

    const novousuario = {
        name: nomeusuario,
    }

    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", novousuario);
    promise.then(pegarMensagens);
    promise.catch(tratarErro);
    setInterval(manterconexao,5000);
}

// Tratar erro de usuaŕio
function tratarErro(error){
    console.log(error.response);
    if (error.response.status === 400){
        alert('Usuário inválido. Insira outro nome.');
        novousuario();
    }
}

// Manter conexão
function manterconexao(novousuario){
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", {name: nomeusuario});
    promise.then(function(){console.log('Usuário continua ativo');});
    promise.catch(function () {alert('Você não está mais conectado')});
}

// Pegar mensagens
setInterval(pegarMensagens,3000);
function pegarMensagens(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(carregarDados);
}

//Carregar dados
function carregarDados(resposta){
    mensagens = resposta.data;
    renderizarMensagens();
    mostrarultimamsg();
    console.log(mensagens);
}

//Renderizar mensagens
function renderizarMensagens(){
    const divMensagens = document.querySelector(".containerMensagens");
        
    for (let i=0; i<mensagens.length; i++){
        if (mensagens[i].type === "status"){
            divMensagens.innerHTML += `<div class="mensagem status">
            <span class="horario"> (${mensagens[i].time}) </span>
            <span class="pessoas"> <strong>  ${mensagens[i].from} </strong> </span>
            <span class="conteudo"> ${mensagens[i].text} </span>
        </div>` 
        }
        if (mensagens[i].type === "message"){
            divMensagens.innerHTML += `<div class="mensagem publica">
            <span class="horario"> (${mensagens[i].time}) </span>
            <span class="pessoas"> <strong>  ${mensagens[i].from} </strong> para <strong> ${mensagens[i].to}</strong>: </span>
            <span class="conteudo"> ${mensagens[i].text} </span>
        </div>`
        }
        if (mensagens[i].type === "private_message" && (mensagens[i].from == nomeusuario || mensagens[i].to == nomeusuario)){
            divMensagens.innerHTML += `<div class="mensagem reservada">
            <span class="horario"> (${mensagens[i].time}) </span>
            <span class="pessoas"> <strong>  ${mensagens[i].from} </strong> reservadamente para <strong> ${mensagens[i].to}</strong>: </span>
            <span class="conteudo"> ${mensagens[i].text} </span>
        </div>`
        }
    }
}

//Mostrar última mensagem automaticamente
function mostrarultimamsg(){
    const divMensagens = document.querySelector(".containerMensagens");
    const ultimamensagem = divMensagens.lastElementChild;
    ultimamensagem.scrollIntoView();
}

//Enviar mensagens

function enviarmensagem(){

    const destinatario = "Todos";
    const msgdigitada = document.querySelector(".rodape input").value;
    const typemsg = "message";
    
    const novamensagem = {
        from: nomeusuario,
        to: destinatario,
        text: msgdigitada,
        type: typemsg, // ou "private_message" para o bônus
    }

    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",novamensagem);
    promise.then(pegarMensagens);
    promise.catch(function () {window.location.reload(true)});
}
