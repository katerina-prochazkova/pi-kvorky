'use strict';
// console.log('funguje to');

let praveHraje = 'circle';
const hraciPole = document.querySelectorAll('.button');

for (let i = 0; i < hraciPole.length; i++) {
  hraciPole[i].addEventListener('click', () => {
    if (
      hraciPole[i].classList.contains('played-circle') ||
      hraciPole[i].classList.contains('played-cross')
    ) {
      return;
    }
    if (praveHraje === 'circle') {
      hraciPole[i].classList.add('played-circle');
      document.querySelector('.player').src = 'images/cross.svg';
      vitezstvi(event.target);
      praveHraje = 'cross';
      console.log('právě hraje ' + praveHraje);
    } else if (praveHraje === 'cross') {
      hraciPole[i].classList.add('played-cross');
      document.querySelector('.player').src = 'images/circle.svg';
      vitezstvi(event.target);
      praveHraje = 'circle';
      console.log('právě hraje ' + praveHraje);
    }
    console.log(
      'Get position',
      getPosition(event.target),
    ); /* tak tady teda nevím, co ten event*/
    console.log(
      'Get symbol',
      getSymbol(event.target),
    ); /* tak tady teda nevím, co ten event*/
    console.log(
      'Winning',
      isWinningMove(event.target),
    ); /* tak tady teda nevím, co ten event*/
  });
}

/*---------úkol č. 5------------*/

const velikostPole = 10;

// const hraciPole = document.querySelectorAll('.button')

const getPosition = (pole) => {
  let poleIndex = 0;
  while (poleIndex < hraciPole.length) {
    if (pole === hraciPole[poleIndex]) {
      break;
    }
    poleIndex++;
  }
  return {
    row: Math.floor(poleIndex / velikostPole),
    column: poleIndex % velikostPole,
  };
};
// /* bod číslo 3.ii */
const getField = (row, column) => hraciPole[row * velikostPole + column];

const getSymbol = (pole) => {
  //název třídy přizpůsob kódu
  if (pole.classList.contains('played-cross')) {
    return 'cross';
  } else if (pole.classList.contains('played-circle')) {
    return 'circle';
  }
};

// /* bod číslo 4 */

const vyhrava = 5;

const isWinningMove = (pole) => {
  const origin = getPosition(pole);
  const symbol = getSymbol(pole);

  let i;

  let vRadku = 1; // Jednička pro právě vybrané políčko

  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    vRadku++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < velikostPole - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    vRadku++;
    i++;
  }

  if (vRadku >= vyhrava) {
    return true;
  }

  let veSloupci = 1; // Jednička pro právě vybrané políčko

  //Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    veSloupci++;
    i--;
  }

  // 	// Koukni dolu
  i = origin.row;
  while (
    i < velikostPole - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    veSloupci++;
    i++;
  }

  if (veSloupci >= vyhrava) {
    return true;
  }

  return false;
};

const vitezstvi = (pole) => {
  if (isWinningMove(pole) === true) {
    if (getSymbol(pole) === 'circle') {
      window.confirm(
        'Vítězí kolečko! Gratulujeme! Dáte křížku ještě jednu šanci?',
      );
      // location.reload();
    } else if (getSymbol(pole) === 'cross') {
      window.confirm(
        'Vítězí křížek! Gratulujeme! Dáte kolečku ještě jednu šanci?',
      );
    }
    location.reload();
  }
};
