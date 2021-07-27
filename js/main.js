
// Creazioni del campo minato HTML

const bombs = 16;
var userFields = [];
var mineField = [];
var fields;

// Scelta Difficoltà e Creazione bombe

document.getElementById('go').addEventListener('click',
function() {
        mineField = [];

        level = document.getElementById('choose-level').value;

        switch (level) {
            case 'facile':
                document.getElementById('campo-minato').innerHTML = '';
                createCell(100);
                fields = 100;
                break;
            case 'intermedia':
                document.getElementById('campo-minato').innerHTML = '';
                createCell(80);
                fields = 80;
                break;
            case 'difficile':
                document.getElementById('campo-minato').innerHTML = '';
                createCell(50);
                fields = 50;
                break;
        }
        
        while (mineField.length < bombs) {
            let bomb = rndNumber(1, fields);
            let search = isInArray(mineField, bomb);
            if (search == false) {
                pushInArray(mineField, bomb);
            } 
        }
        console.log(mineField);
    }
)

// Controlli 

document.getElementById('campo-minato').addEventListener('click',
    function(e) {
        let element = document.querySelectorAll("[data-cell='" + e.target.dataset.cell + "']");
        element[0].innerHTML = e.target.dataset.cell;

        // controllo in array
        searchBomb = isInArray(mineField, e.target.dataset.cell);
        
        if (searchBomb == true){
            document.getElementById('reset').innerHTML = '<img src="img/dead.png" alt="Reset Button">';
            element[0].style.backgroundImage = "url('../img/bomb-active.jpg')";
            document.getElementById('score').innerHTML = 'Punteggio: ' + userFields.length;
            document.getElementById('campo-minato').style.pointerEvents = 'none';
            document.getElementById('choose-level').style.pointerEvents = 'none';
            document.getElementById('go').style.pointerEvents = 'none';

        } else if (searchBomb == false){
            element[0].style.backgroundColor = 'greenyellow';
            pushInArray(userFields, e.target.dataset.cell);
        } 
        
        if (userFields.length == (fields - bombs)) {
            document.getElementById('reset').innerHTML = '<img src="img/sunglasses.jpg" alt="Reset Button">';
            document.getElementById('score').innerHTML = 'Vittoria!';
        }
        console.log(userFields);
    }    
);

// reset button 
document.getElementById('reset').addEventListener('click',
    function(){
        location.reload();
    }
);




// Esercizio Lunedì 26/07-----------------------

// const bombs = 16;
// var mineField = [];
// var userFields = [];
// var fields = 100;

// // Difficoltà 
// do {
//     var level = prompt('Difficoltà Facile, Intermedia o Difficile?');
//     level = level.toLowerCase();
// } while ((level != 'facile') && (level != 'intermedia') && (level != 'difficile'));

// switch (level) {
//     case 'facile':
//         fields = 100;
//         break;
    
//     case 'intermedia':
//         fields = 80;
//         break;

//     case 'difficile':
//         fields = 50;
//         break;
// }

// console.log('Difficoltà Attuale: ' + level.charAt(0).toUpperCase() + level.slice(1).toLowerCase());

// // Il computer deve generare 16 numeri casuali (le nostre bombe) tra 1 e 100.
// // I numeri non possono essere duplicati.
// var i = 0;

// while (mineField.length < bombs) {
//     let bomb = rndNumber(1, fields);
//     let search = isInArray(mineField, bomb);
//     if (search == false) {
//         pushInArray(mineField, bomb);
//     }
//     i++;    
// }
// console.log(mineField);
// // In seguito deve chiedere all’utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100.
// // Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all’utente un altro numero.
// var i = 0;
// var searchBomb = false;
// var searchFields = false;

// while ((userFields.length < (fields - bombs)) && (searchBomb == false)) {
//     // controllo se numero inserito e dentro i parametri 
//     do {  
//     var userNumber = parseInt(prompt('Inserisci un numero da 1 a ' + fields + ' - Numero: ' + (parseInt(i) + 1)));
//     } while ((userNumber < 1) || (userNumber > fields) || (isNaN(userNumber)));


//     searchFields = isInArray(userFields, userNumber);
//     searchBomb = isInArray(mineField, userNumber);
//     // L’utente non può inserire più volte lo stesso numero.
//     // La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
//     if (searchFields == true) {
//         alert('numero già inserito!');
//     } else if (searchBomb == false){
//         pushInArray(userFields, userNumber);
//     } else {
//         alert('KABUUUUM!!');
//     }
//     i++;
// }

// // Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.

// if (userFields.length == fields - bombs)
//     alert('Hai vinto!');

// console.log('Bombe: ' + mineField);
// console.log('Numeri Scelti: ' + userFields);
// console.log('Punteggio: ' + userFields.length);

// FUNZIONI -----

// Creazioni elementi 

function createCell(cells) {
    for(let i = 1; i <= cells; i++) {
        let cell = `
        <div data-cell="${i}" class="cell"></div>
        `;

        let templateCell = document.createElement('DIV');
        templateCell.classList.add('square');
        templateCell.innerHTML = cell;
        document.getElementById('campo-minato').appendChild(templateCell);
    }
}

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