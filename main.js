'use strict'

/*
1. Создать поле 
2. Создать зелёный квадрат
3. Заставить квадрат двигаться автоматически и на стрелки
  1. Если настоящие и позапрошлые координаты равны, то выполнить прошлое действие
4. Телепортировать змею если она выходит за границы поля
5. Создать рандомайзер яблок
6. Когда змея коснулась яблока добавить к ней ещё один квадратик
7. Проверка на смеpть:

— Создание координат —
DEATH {
top+left: true
top+left: true
...
};
DEATH.top+left = true

— Проверка координат —
if (DEATH[top+left]) {
return Game over!
}
*/

document.addEventListener("DOMContentLoaded", function() {
  let
  castle                = true,
  head                  = field.querySelector('.head'),
  score                 = field.querySelector('.score'),
  coords                = {
    head: {
      x: 150,
      y: 150,
      facing: 'east',
      key: 'ArrowRight',
    },
    apple: {
      x: null,
      y: null,
    },
    prev: {
      x: null,
      y: null,
      facing: null,
      key: null,
    },
    beforePrev: {
      x: null,
      y: null,
      facing: null,
      key: null,
    },
    death: [
      {x: -1, y: -1},
    ]
  },
  left                  = 150,
  top                   = 150,
  styleTop              = 0,
  styleLeft             = 15,
  train                 = [head], // Все элементы змейки
  death                 = [], // Массив с объектами координат всех кубов
  apple,
  timer,
  j                     = 255,
  facing                = head.dataset.facing, // Направление змейки
  speed                 = 130 // Скорость с которой змейка будет двигаться


  appleSpawner();
  castle = false;
  coords.death[0] = {x: coords.head.x, y: coords.head.y}

  // Таймер

  timer = setInterval( function() {
    // Координаты
    coords.beforePrev.x = coords.prev.x;
    coords.beforePrev.y = coords.prev.y;
    coords.beforePrev.facing = coords.prev.facing;
    coords.prev.x = coords.head.x;
    coords.prev.y = coords.head.y;
    coords.prev.facing = coords.head.facing;
    coords.head.x = left + styleLeft;
    coords.head.y = top + styleTop;
    // Проверка на яблоко
    if (coords.apple.x === coords.head.x && coords.apple.y === coords.head.y) {
      apple.remove();
      addTail();
      coords.death.push({x: -1, y: -1})
      appleSpawner();
    }

    // Проверка на "Абуз смены направления змейки"
    if (coords.beforePrev.x + '' + coords.beforePrev.y == coords.head.x + '' + coords.head.y) {
        facing = coords.prev.facing;
        pressed('');
      }
    // Передвижение
    for (let i = 0; i < train.length; i++) {
      if (train[i] != train[0]) {
        train[i].style.left = coords.death[i - 1].x + 'px'
        train[i].style.top = coords.death[i - 1].y + 'px'
      }
      else {
        left += styleLeft; 
        head.style.left = left + 'px';
        top += styleTop; 
        head.style.top = top + 'px';
      }
    }
    borderTest();
    for (let i = 0; i < train.length; i++) {
      coords.death[i].x = +getComputedStyle(train[i]).left.slice(0, -2); 
      coords.death[i].y = +getComputedStyle(train[i]).top.slice(0, -2);
    }
    // Проверка на смерть
    for (let i = 3; i < train.length; i++) {
      if (coords.head.x === coords.death[i].x && coords.head.y === coords.death[i].y) {
        clearInterval(timer);
        train[i].style.backgroundColor = '#D94D54';
        field.querySelector('.game-over').hidden = false;
        apple.remove();
      }
    }
  }, speed)

  // Управление

  document.addEventListener ('keydown', pressed)
  function pressed(event) {
    let key
    if (typeof event === 'string') {
      key = coords.prev.key;
    }
    if (typeof event === 'object') {
      key = event.key;
    }
    if (key === 'ArrowUp') {
      if (facing === 'south' || facing === 'north') return;
      facing = 'north';
      styleTop = -15;
      styleLeft = 0;
    }
    else if (key === 'ArrowDown') {
      if (facing === 'north' || facing === 'south') return;
      facing = 'south';
      styleTop = 15;
      styleLeft = 0;
    }
    else if (key === 'ArrowLeft') {
      if (facing === 'west' || facing === 'east') return;
      facing = 'west';
      styleTop = 0;
      styleLeft = -15;
    }
    else if (key === 'ArrowRight') {
      if (facing === 'west' || facing === 'east') return;
      facing = 'east';
      styleTop = 0;
      styleLeft = 15;
    }
    // Работа с координатами
    coords.head.facing = facing;
    coords.beforePrev.key = coords.prev.key;
    coords.prev.key = coords.head.key;
    coords.head.key = key;
  }

  // Спавнер яблок

  function appleSpawner() {
    apple = document.createElement('div');
    apple.className = 'apple';
    // Рандомайзер
    function randomiser(min, max) {
      let rand = min + Math.random() * (max + 1 - min);
      rand = Math.floor(rand);
      while (rand % 15 !== 0) {
        rand++;
      }
      return rand;
    }
    function randomColor(min, max) {
      let rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    }
    AppleRandomiser()
    function AppleRandomiser() {
      coords.apple.x = randomiser(0, 300);
      coords.apple.y = randomiser(0, 300);
      for (let i = 0; i < train.length; i++) {
        coords.apple.x == coords.death[i].x && coords.apple.y == coords.death[i].y
        if (coords.apple.x == coords.death[i].x && coords.apple.y == coords.death[i].y) {
          console.log(true);
          return AppleRandomiser();
        }
      }
    }
    if (randomColor(0, 99) === 24) apple.style.backgroundColor = 'gold' // Цвет яблока
    apple.style.left = coords.apple.x + 'px';
    apple.style.top = coords.apple.y + 'px';
    if (coords.apple.y === 150 && castle) {
      apple.remove();
      return appleSpawner();
      castle = false;
    }
    field.append(apple)
  }

  // Хвост

  function addTail() {
    let tail = document.createElement('div');
    field.append(tail)
    tail.classList.add('snake');
    if (j > 141) tail.style.backgroundColor = `rgb(0, ${j = j - 3}, 0)`
    tail.style.backgroundColor = `rgb(0, ${j}, 0)`
    tail.style.left = +getComputedStyle(train[train.length - 1]).left.slice(0, -2) - styleLeft + 'px';
    tail.style.top  = +getComputedStyle(train[train.length - 1]).top.slice(0, -2) - styleTop + 'px';
    train.push(tail)
    score.innerHTML = `Счёт: ${train.length - 1}`
  }

  // Границы

  function borderTest() {
    // Правый край
    if (left === 315) {
      left = 0
      head.style.left = left + 'px';
      left = +getComputedStyle(head).left.slice(0, -2);
    }
    // Левый край
    else if (left < 0) {
      left = 300;
      head.style.left = left + 'px';
    }
    // Верхний край
    else if (top < 0) {
      top = 300;
      head.style.top = top + 'px';
    }
    // Нижний край
    else if (top === 315) {
      top = 0;
      head.style.top = top + 'px';
    }
    // Проверка на яблоко
    if (getComputedStyle(apple).left === getComputedStyle(head).left && getComputedStyle(apple).top === getComputedStyle(head).top) {
      apple.remove();
      addTail();
      appleSpawner();
      field.append(tail);
    }
  }
});