'use strict';
console.log('funguje to');

let praveHraje = 'circle';
const tlacitka = document.querySelectorAll('.button');

for (let i = 0; i < tlacitka.length; i++) {
  tlacitka[i].addEventListener('click', () => {
    if (
      tlacitka[i].classList.contains('played-circle') ||
      tlacitka[i].classList.contains('played-cross')
    ) {
      return;
    }
    if (praveHraje === 'circle') {
      tlacitka[i].classList.add('played-circle');
      document.querySelector('.player').src = 'images/cross.svg';
      praveHraje = 'cross';
      // console.log('právě hraje ' + praveHraje);
    } else if (praveHraje === 'cross') {
      tlacitka[i].classList.add('played-cross');
      document.querySelector('.player').src = 'images/circle.svg';
      praveHraje = 'circle';
      // console.log('právě hraje ' + praveHraje);
    }
  });
}
