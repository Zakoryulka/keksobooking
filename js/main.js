'use strict';

let numbersForAvatar = [1, 2, 3, 4, 5, 6, 7, 8];
let types = ["palace", "flat", "house", "bungalo"];
let times = ["12:00", '13:00', '14:00'];
let features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
let photos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg",
              "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
              "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

// получить рандомное число от min, до max (оба включены):
const getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// получить рандомное индекс:
const getRandomIndex = function(array) {
  return Math.floor(Math.random() * array.length);
};

// получаем рандомный элемент из массива 1 раз:
const getRandomElement = function(array) {
  let index = getRandomIndex(array);
  let randomElement = array[index];
  array.splice(index, 1);

  return randomElement;
};

// получаем новый массив из рандомных элементов другого массива:
const getArrayFromRandomElement = function(array){
  let newArray = [];
  let lengthOfNewArray = getRandomIndex(array);
  for (let i = 0; i < getRandomIndex(array); i++) {
    newArray.push(getRandomElement(array));
  }

  return newArray;
};

// создаем новый объект:
let createNewObject = function() {
  let newObject = {
    author: {
      avatar: `img/avatars/user0${getRandomElement(numbersForAvatar)}.png`,
    },
    offer: {
      title: "???",
      address: "{{location.x}}, {{location.y}}",
      prise: getRandomInt(1000, 200000),
      type: getRandomElement(types),
      rooms: getRandomInt(1, 3),
      guests: getRandomInt(1, 2),
      checkin: getRandomElement(times),
      checkout: getRandomElement(times),
      features: getArrayFromRandomElement(features),
      description: "???",
      photos: getArrayFromRandomElement(photos),
    },
    location: {
      x: getRandomInt(50, 900),
      y: getRandomInt(130, 630),
    }
  };

  return newObject;
};

// создание коллекции из n объектов:
const createCollectionsOfObjects = function(n) {
  let collectionsOfObjects = [];
  for (let i = 0; i < n; i++) {
    let newObject = createNewObject();
    collectionsOfObjects[i] = newObject;
  }
  return collectionsOfObjects;
};

//показываем окно:
document.querySelector('.map').classList.remove('map--faded');

let mapPin = document.querySelector('#pin').content.querySelector('button');
let mapPins = document.querySelector('.map__pins');

let fragmentOfMapPin = document.createDocumentFragment();
const mapPinX = 30;
const mapPinY = 0;

//функция для создания фрагмента с метками:

const createFragmentOfMapPin = function(n) {
  let collectionsOfObjects = createCollectionsOfObjects(n);
  for (let i = 0; i < n; i++) {
    let newMapPin = mapPin.cloneNode(true);
    newMapPin.style.cssText = `left: ${collectionsOfObjects[i].location.x}px; top: ${mapPinY + collectionsOfObjects[i].location.y}px;`;
    newMapPin.querySelector('img').src = collectionsOfObjects[i].author.avatar;
    newMapPin.querySelector('img').alt = collectionsOfObjects[i].offer.title;
    fragmentOfMapPin.append(newMapPin);
  }

  return fragmentOfMapPin;
};

mapPins.append(createFragmentOfMapPin(8));
