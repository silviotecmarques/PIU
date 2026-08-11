const somCampainha =
    new Audio("sounds/campainha.mp3");

const somAtendido =
    new Audio("sounds/atendido.mp3");

const somErro =
    new Audio("sounds/erro.mp3");

function tocarCampainha() {

    somCampainha.currentTime = 0;

    somCampainha.play();

}

function tocarAtendido() {

    somAtendido.currentTime = 0;

    somAtendido.play();

}

function tocarErro() {

    somErro.currentTime = 0;

    somErro.play();

}