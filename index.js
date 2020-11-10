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
    console.log('Get position', getPosition(event.target));
    console.log('Get symbol', getSymbol(event.target));
    console.log('Winning', isWinningMove(event.target));
  });
}

/*---------úkol č. 5------------*/

const velikostPole = 10;

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
const getField = (row, column) => hraciPole[row * velikostPole + column];

const getSymbol = (pole) => {
  if (pole.classList.contains('played-cross')) {
    return 'cross';
  } else if (pole.classList.contains('played-circle')) {
    return 'circle';
  }
};

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

  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    veSloupci++;
    i--;
  }

  // Koukni dolu
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

  //koukni doprava nahoru (Left Bottom to Right Top)

  let diagonalaLBRT = 1;
  let j = origin.row;
  let k = origin.column;

  while (
    j < velikostPole - 1 &&
    k < velikostPole - 1 &&
    symbol === getSymbol(getField(j - 1, k + 1))
  ) {
    diagonalaLBRT++;
    j--;
    k++;
    console.log('koukám doprava nahoru');
  }

  // koukni doleva dolů (Right Top to Left Bottom )
  j = origin.row;
  k = origin.column;

  while (
    j < velikostPole - 1 &&
    k < velikostPole - 1 &&
    symbol === getSymbol(getField(j + 1, k - 1))
  ) {
    diagonalaLBRT++;
    j++;
    k--;
    console.log('koukám doleva dolů');
  }

  if (diagonalaLBRT >= vyhrava) {
    return true;
  }

  // koukni doleva nahoru (Right Bottom to Left Top)

  let diagonalaRBLT = 1;
  j = origin.row;
  k = origin.column;

  while (
    j < velikostPole - 1 &&
    k < velikostPole - 1 &&
    symbol === getSymbol(getField(j - 1, k - 1))
  ) {
    diagonalaRBLT++;
    j--;
    k--;
    console.log('koukám doleva nahoru');
  }

  // koukni doprava dolů (Left Top to Right Bottom )
  j = origin.row;
  k = origin.column;

  while (
    j < velikostPole - 1 &&
    k < velikostPole - 1 &&
    symbol === getSymbol(getField(j + 1, k + 1))
  ) {
    diagonalaRBLT++;
    j++;
    k++;
    console.log('koukám doprava dolů');
  }

  if (diagonalaRBLT >= vyhrava) {
    return true;
  }

  /* -------konec diagonály -------*/

  return false;
};

const vitezstvi = (pole) => {
  if (isWinningMove(pole) === true) {
    if (getSymbol(pole) === 'circle') {
      window.confirm(
        'Vítězí kolečko! Gratulujeme! Dáte křížku ještě jednu šanci?',
      );
    } else if (getSymbol(pole) === 'cross') {
      window.confirm(
        'Vítězí křížek! Gratulujeme! Dáte kolečku ještě jednu šanci?',
      );
    }
    location.reload();
  }
};

/* jak to nastavit tak, aby se první vypsal 5. vítězný znak a až potom vyskočilo gratulační pole? */
