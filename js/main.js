
// Creazioni del campo minato HTML

const bombs = 16;
var userFields = [];
var mineField = [];
var fields;

// immagiine default btn reset 

document.getElementById('reset').innerHTML = '<img src="img/smile.png" alt="Reset Button">'; 

// Eventlistener button go 
document.getElementById('go').addEventListener('click',
    function() {
        // reset array e punteggio
        userFields = [];
        mineField = [];
        document.getElementById('score').innerHTML = '';
        
        // reset pointer events 
        document.getElementById('campo-minato').style.pointerEvents = 'auto';

        // Scelta Difficoltà e creazione celle
        document.getElementById('campo-minato').innerHTML = '';
        level = document.getElementById('choose-level').value;
        document.getElementById('reset').innerHTML = '<img src="img/smile.png" alt="Reset Button">'; 
        switch (level) {
            case 'intermedia':
                fields = 80;
                break;
            case 'difficile':
                fields = 50;
                break;
            default:
                fields = 100;
                break;
        }

        createCell(fields);

        // generazione bombe 
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

        // controllo bomba
        searchBomb = isInArray(mineField, e.target.dataset.cell);
        
        if (searchBomb == true){
            document.getElementById('reset').innerHTML = '<img src="img/dead.png" alt="Reset Button">';
            element[0].style.backgroundImage = "url('img/bomb-active.jpg')";
            document.getElementById('score').innerHTML = 'Punteggio: ' + userFields.length;
            document.getElementById('campo-minato').style.pointerEvents = 'none';

        // controllo neighborcells corner
        } else if (searchBomb == false){
            var neighborCells = [];
            var bombCounter = 0;;

            switch (parseInt(e.target.dataset.cell)) {
                case 1:
                    neighborCells = [1, 10, 11];
                    for (let i = 0; i < neighborCells.length; i++) {
                        let somma = parseInt(e.target.dataset.cell) + neighborCells[i];
                        if (isInArray(mineField, somma) == true)
                            bombCounter++
                    }
                    break;
                case 10:
                    neighborCells = [-1, 9, 10];
                    for (let i = 0; i < neighborCells.length; i++) {
                        let somma = parseInt(e.target.dataset.cell) + neighborCells[i];
                        if (isInArray(mineField, somma) == true)
                            bombCounter++
                    }
                    break;
                case 91:
                    neighborCells = [-10, -9, 1];
                    for (let i = 0; i < neighborCells.length; i++) {
                        let somma = parseInt(e.target.dataset.cell) + neighborCells[i];
                        if (isInArray(mineField, somma) == true)
                            bombCounter++
                    }
                    break;
                case 100:
                    neighborCells = [-1, -10, -11];
                    for (let i = 0; i < neighborCells.length; i++) {
                        let somma = parseInt(e.target.dataset.cell) + neighborCells[i];
                        if (isInArray(mineField, somma) == true)
                            bombCounter++
                    }
                    break;

                // controllo neighborcells left col
                case 11:
                case 21:
                case 31:
                case 41:
                case 51:
                case 61:
                case 71:
                case 81:
                    neighborCells = [-10, -9, 1, 10, 11];
                    for (let i = 0; i < neighborCells.length; i++) {
                        let somma = parseInt(e.target.dataset.cell) + neighborCells[i];
                        if (isInArray(mineField, somma) == true)
                            bombCounter++
                    }
                    break;

                // controllo neighborcells right col
                case 20:
                case 30:
                case 40:
                case 50:
                case 60:
                case 70:
                case 80:
                case 90:
                    neighborCells = [-10, 10, -1, 9, -11];
                    for (let i = 0; i < neighborCells.length; i++) {
                        let somma = parseInt(e.target.dataset.cell) + neighborCells[i];
                        if (isInArray(mineField, somma) == true)
                            bombCounter++
                    }
                    break;

                // controllo neighborcells row top
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                    neighborCells = [-1, 9, 10, 11, 1];
                    for (let i = 0; i < neighborCells.length; i++) {
                        let somma = parseInt(e.target.dataset.cell) + neighborCells[i];
                        if (isInArray(mineField, somma) == true)
                            bombCounter++
                    }
                    break;

                // controllo neighborcells row bottom
                case 92:
                case 93:
                case 94:
                case 95:
                case 96:
                case 97:
                case 98:
                case 99:
                    neighborCells = [-1, -11, -10, -9, 1];
                    for (let i = 0; i < neighborCells.length; i++) {
                        let somma = parseInt(e.target.dataset.cell) + neighborCells[i];
                        if (isInArray(mineField, somma) == true)
                            bombCounter++
                    }
                    break;

                // controllo neighborcells default
                default:
                    neighborCells = [-1, 1, -9, 9, -10, 10, -11, 11];
                    for (let i = 0; i < neighborCells.length; i++) {
                        let somma = parseInt(e.target.dataset.cell) + neighborCells[i];
                        if (isInArray(mineField, somma) == true)
                            bombCounter++
                    }
                    break;
            }    

            // stile cella no bomb 
            switch (bombCounter) {
                case 1:
                    element[0].style.color = 'blue';
                    break;
                case 2:
                    element[0].style.color = 'green';
                    break;
                case 3:
                    element[0].style.color = 'red';
                    break;
                case 4:
                    element[0].style.color = 'purple'
                    break;
                case 5:
                    element[0].style.color = 'darkred'
                    break;    
            }
            element[0].innerHTML = bombCounter;
            element[0].classList.add('clicked-cell');

            // controllo scelta utente per evitare che vinca scegliendo lo stesso numero
            if (isInArray(userFields, e.target.dataset.cell) == false) {
                pushInArray(userFields, e.target.dataset.cell);
            }
        
        } 
        
        // controllo vittoria 
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
        userFields = [];
        mineField = [];

        document.getElementById('score').innerHTML = '';

        document.getElementById('campo-minato').style.pointerEvents = 'auto';
        document.getElementById('reset').innerHTML = '<img src="img/smile.png" alt="Reset Button">'; 
        document.getElementById('campo-minato').innerHTML = '';
        level = document.getElementById('choose-level').value;
        switch (level) {
            case 'intermedia':
                fields = 80;
                break;
            case 'difficile':
                fields = 50;
                break;
            default:
                fields = 100;
                break;
        }
        createCell(fields);

        // generazione bombe 
        while (mineField.length < bombs) {
            let bomb = rndNumber(1, fields);
            let search = isInArray(mineField, bomb);
            if (search == false) {
                pushInArray(mineField, bomb);
            } 
        }
        console.log(mineField);
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
    for (let i = 1; i <= cells; i++) {
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


