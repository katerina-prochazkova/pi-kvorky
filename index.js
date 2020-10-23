'use strict';
console.log('funguje to');

let praveHraje = 'circle';

document.querySelector('.button').addEventListener('click', function () {
  if ((praveHraje = 'circle')) {
    console.log('jede if circle');
    document.querySelector('.button').classList.add('played-circle');
    document.querySelector('.button').classList.remove('button');
    document.querySelector('.player').src = 'images/cross.svg';
    praveHraje = 'cross';
    console.log(praveHraje);
  }
  // praveHraje = 'cross';
  // console.log(praveHraje);
  else if ((praveHraje = 'cross')) {
    console.log('jede if cross');
    document.querySelector('.button').classList.add('played-cross');
    document.querySelector('.player').src = 'images/circle.svg';
  }
  praveHraje = 'circle';
  console.log(praveHraje);
});
