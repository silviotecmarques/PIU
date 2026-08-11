const barra =
    document.getElementById("barraAtualizacao");

const texto =
    document.getElementById("textoAtualizacao");


window.updater.onStatus((mensagem) => {

    texto.textContent =
        mensagem;

});


window.updater.onProgress((porcentagem) => {

    barra.value =
        porcentagem;

});