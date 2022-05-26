
initGame(document.querySelector('#game'));

function initGame(game) {
  let field = game.querySelector('.field');
  
  let size = 1; // квадрат

  newGame();
  function newGame() {
    clearGameField(field);
    let cells = drawGameField(size, field);
    addActivateHandler(cells);
  }
  
    
  function addActivateHandler(cells) {
    let counter = 1; 
  
    for (let i = 0; i < cells.length; i++){
      cells[i].addEventListener('click', function() {
        if (this.innerHTML == counter){
          this.classList.add('active');
            if (counter === size**2) {
              size++;
              newGame();
            }
        } else if (this.classList != 'active'){
          size = 1;
          newGame();
        }
          counter++
        }
      )
    }
  }

}


function clearGameField(field) { // Обнуление игры, чтобы не копились
  field.innerHTML = '';
}

function drawGameField(size, field) {
  let from = 1;
  let to = size**2;

  let arr = []; 
  arr = createArr(from, to);
  arr = shuffleArr(arr);
  arr = chunkArr(arr);
  return  createCells(arr, field);
}



// [[1,2], [3, 4]]
function createCells(arr, elem) {
  let cells = []; // Массив со всеми ячейками, для дальнейшей работы игры
  
  for (let i = 0; i < arr.length; i++){
    let tr = document.createElement('tr');

    for(let j = 0; j < arr[i].length; j++){
      let td = document.createElement('td');
      td.innerHTML = arr[i][j];
      tr.appendChild(td);

      cells.push(td);
    }

    elem.appendChild(tr);
  }
  return cells;
}

function createArr(from, to) {
  let arr = [];
  for ( let i = from; i <= to; i++){
    arr.push(i);
  }
  return arr;
}

function shuffleArr(arr) {
  let shuffleArr = [];
  for (let i = 0; arr.length > 0; i++){
    let random = getRandom(0, arr.length - 1);
    let elem = arr.splice(random, 1)[0];
    shuffleArr.push(elem);
  }
  return shuffleArr;
}

// [1, 2, 3, 4] 
// => [[1, 2], [3, 4]]
// [1, 2, 3, 4, 5, 6, 7, 8, 9] 
// => [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ..25] 
// => [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10] ...]
function chunkArr(arr) {
  let newArr =[];
  let divisor = Math.sqrt(arr.length);
  for (let i = 0; i < divisor; i++ ){
    let arr1 = [];
    newArr.push(arr1);

    for(let k = 0; k < divisor; k++){
      newArr[i].push(arr.splice(0, 1)[0]);
    }
  }
  return newArr;
}




function getRandom(min, max){
  return Math.floor(Math.random() * (max - min + 1 )) + min;
}