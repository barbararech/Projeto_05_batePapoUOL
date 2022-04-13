let dadosCarregados = [];
//Nome do usuário
nomeusuario = prompt("Qual o seu nome?");

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
    console.log(mensagens);
    mostrarultimamsg();
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



