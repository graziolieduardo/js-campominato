// Consegna

// Il computer deve generare 16 numeri casuali (le nostre bombe) tra 1 e 100.
// I numeri non possono essere duplicati.

const bombs = 16;
var mineField = [];
var fields = 100;

var i = 0;

while (mineField.length < bombs) {
    let bomb = rndNumber(1, 100);
    let search = isInArray(mineField, bomb);
    if (search == false) 
        pushInArray(mineField, bomb);
    i++;
}

console.log(mineField);

// In seguito deve chiedere all’utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100.
// L’utente non può inserire più volte lo stesso numero.
// Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all’utente un altro numero.
// La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.





// Funzioni -----

// Random Number 
function rndNumber(min, max) {
    let risultato = Math.floor(Math.random() * max - min + 1) + min; 
    return risultato;
}

// Search in Array 

function isInArray(array, element) {
    let inArray = false;
    for (let i = 0; i < array.length; i++) {
        if (element == array[i])
            inArray = true;
    }
    return inArray;
}

function pushInArray(array, element) {
    return array.push(element);
}