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
  coords                = {
    head: {
      x: 150,
      y: 150,
      facing: 'east',
      key: 'ArrowRight',
    },
    next: {
      x: () => coords.head.x + 15,
      y: () => coords.head.y + 0,
    },
    apple: {
      x: null,
      y: null,
    },
    lastTail: {
      x: null,
      y: null,
    },
    placeTail: {
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
    death: {

    }
  },
  styleTop              = 0,
  styleLeft             = 15,
  train                 = [], // Все элементы змейки кроме головы
  apple,
  timer,
  i                     = 0,
  facing                = head.dataset.facing, // Направление змейки
  speed                 = 100 // Скорость с которой змейка будет двигаться
  // Добавление хвоста
  function addTail() {
    // Создание
    let tail = document.createElement('div');
    let left = +getComputedStyle(head).left.slice(0, -2),
    top =  +getComputedStyle(head).top.slice(0, -2)
    train.push(tail)
    // Добавляем стили
    tail.classList.add('snake');
    tail.style.left = train[length - 1].getComputedStyle().left - styleLeft + 'px';
    tail.style.top  = train[length - 1].getComputedStyle().top - styleTop + 'px';
    (function() {
      setInterval(function() {
        if (train.length === 1) {
          left = coords.lastTail.x = coords.prev.x;
          top = coords.lastTail.y = coords.prev.y;
          tail.style.left = left + 'px';
          tail.style.top = top + 'px';
        } 
        else {
          tail.style.left = left + 'px';
          tail.style.top  = top  + 'px';
        }
      }, speed);
      field.append(tail);
    })()
  }
  appleSpawner();
  castle = false;
  // Таймер
  timer = setInterval(() => time(head), speed);
    function time(head) {
    // Проверка на яблоко
    if (coords.apple.x === coords.head.x && coords.apple.y === coords.head.y) {
      apple.remove();
      addTail();
      appleSpawner();
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
      let
      left           = +getComputedStyle(head).left.slice(0, -2),
      top            = +getComputedStyle(head).top.slice(0, -2),
      facing         = coords.prev.facing // Направление змейки
    // Работа с координатами
    coords.beforePrev.x = coords.prev.x;
    coords.beforePrev.y = coords.prev.y;
    coords.beforePrev.facing = coords.prev.facing;
    coords.prev.x = coords.head.x;
    coords.prev.y = coords.head.y;
    coords.prev.facing = coords.head.facing;
    coords.head.x = left + styleLeft;
    coords.head.y = top + styleTop;
    coords.next.x = coords.next.x;
    coords.next.y = coords.next.y;
    // Проверка на "Абуз смены направления змейки"
    if (coords.beforePrev.x + '' + coords.beforePrev.y == coords.head.x + '' + coords.head.y) {
      facing = coords.prev.facing;
      pressed('');
    }
    head.style.left = left + styleLeft + 'px';
    head.style.top  = top + styleTop  + 'px';
    left = +getComputedStyle(head).left.slice(0, -2);
    top  = +getComputedStyle(head).top.slice(0, -2);
    borderTest();
  }
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
      coords.next.x = coords.head.x + styleLeft;
      coords.next.y = coords.head.y + styleTop; 
    }
    else if (key === 'ArrowLeft') {
      if (facing === 'west' || facing === 'east') return;
      facing = 'west';
      styleTop = 0;
      styleLeft = -15;
      coords.next.x = coords.head.x + styleLeft;
      coords.next.y = coords.head.y + styleTop; 
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
    coords.apple.x = randomiser(0, 300);
    coords.apple.y = randomiser(0, 300);
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
});