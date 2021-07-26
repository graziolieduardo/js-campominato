// Consegna

// Il computer deve generare 16 numeri casuali (le nostre bombe) tra 1 e 100.
// I numeri non possono essere duplicati.

const bombs = 16;
var mineField = [];
var userFields = [];
var fields = 100;

var i = 0;

while (mineField.length < bombs) {
    let bomb = rndNumber(1, fields);
    let search = isInArray(mineField, bomb);
    if (search == false) 
        pushInArray(mineField, bomb);
    i++;
}

// In seguito deve chiedere all’utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100.
// Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all’utente un altro numero.
var i = 0;
var searchBomb = false;
var searchFields = false;

while ((userFields.length < (fields - bombs)) && (searchBomb == false)) {
    // controllo se numero inserito e dentro i parametri 
    do {  
    var userNumber = parseInt(prompt('Inserisci un numero da 1 a 100'));
    } while ((userNumber < 1) || (userNumber > fields) || (isNaN(userNumber)));


    searchFields = isInArray(userFields, userNumber);
    searchBomb = isInArray(mineField, userNumber);
    // L’utente non può inserire più volte lo stesso numero.
    // La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
    if (searchFields == true) {
        alert('numero già inserito!');
    } else if (searchBomb == false){
        pushInArray(userFields, userNumber);
    } else {
        alert('KABUUUUM!!');
    }
    i++;
}

// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.
console.log('Punteggio: ' + userFields.length);
if (userFields.length == fields - bombs)
    alert('Hai vinto!');


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

// Push in array 
function pushInArray(array, element) {
    return array.push(element);
}