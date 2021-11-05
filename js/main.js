'use strict';

// ------ module3-task2------

const numbersForAvatar = [1, 2, 3, 4, 5, 6, 7, 8];
const types = ['palace', 'flat', 'house', 'bungalo'];
const times = ['12:00', '13:00', '14:00'];
const features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
const photos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg",
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

// получаем рандомный элемент из массива только 1 раз:
const getRandomElementOnlyOne = function(array) {
  let index = getRandomIndex(array);
  let randomElement = array[index];
  array.splice(index, 1);

  return randomElement;
};

// получаем рандомный элемент из массива не один раз:
const getRandomElementNotOne = function(array) {
  return array[getRandomIndex(array)];
};

// получаем новый массив из рандомных элементов другого массива:
const getArrayFromRandomElement = function(array){
  //копируем первоначальный массив, чтобы массив не обнулялся:
  let firstArray = array.slice();
  let newArray = [];
  let lengthOfNewArray = getRandomInt(1, firstArray.length);
  for (let i = 0; i <= lengthOfNewArray - 1; i++) {
    newArray.push(getRandomElementOnlyOne(firstArray));
  }

  return newArray;
};

// создаем новый объект:
let createNewObject = function() {
  let newObject = {
    author: {
      avatar: `img/avatars/user0${getRandomElementOnlyOne(numbersForAvatar)}.png`,
    },
    offer: {
      title: "???",
      address: "{{location.x}}, {{location.y}}",
      prise: getRandomInt(1000, 100000),
      type: getRandomElementNotOne(types),
      rooms: getRandomInt(1, 3),
      guests: getRandomInt(1, 2),
      checkin: getRandomElementNotOne(times),
      checkout: getRandomElementNotOne(times),
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

let collectionsOfObjects = createCollectionsOfObjects(8);

// console.log(collectionsOfObjects);

//показываем окно:
let map = document.querySelector('.map');
map.classList.remove('map--faded');

let mapPin = document.querySelector('#pin').content.querySelector('button');
let mapPins = document.querySelector('.map__pins');

let fragmentOfMapPin = document.createDocumentFragment();
const mapPinX = 30;
const mapPinY = 0;

//функция для создания фрагмента с метками:
const createFragmentOfMapPin = function() {
  for (let i = 0; i < 8; i++) {
    let newMapPin = mapPin.cloneNode(true);
    newMapPin.style.cssText = `left: ${collectionsOfObjects[i].location.x}px; top: ${mapPinY + collectionsOfObjects[i].location.y}px;`;
    newMapPin.querySelector('img').src = collectionsOfObjects[i].author.avatar;
    newMapPin.querySelector('img').alt = collectionsOfObjects[i].offer.title;
    fragmentOfMapPin.append(newMapPin);
  }

  return fragmentOfMapPin;
};

mapPins.append(createFragmentOfMapPin());


// ------ module3-task3------

const cardTemplate = document.querySelector('#card').content.querySelector('article');

//функция для создания карточки объявления:
const createNewCard = function(index){
  let newCard = cardTemplate.cloneNode(true);
  //Вводим заголовок объявления в блок:
  newCard.querySelector('.popup__title').textContent = collectionsOfObjects[index].offer.title;
  //Вводим адрес объявления в блок:
  newCard.querySelector('.popup__text--address').textContent = collectionsOfObjects[index].offer.address;
  //Вводим цену жилья за ночь в блок:
  newCard.querySelector('.popup__text--price').textContent = `${collectionsOfObjects[index].offer.prise}₽/ночь`;
  //Вводим тип жилья в блок:
  let popupType = newCard.querySelector('.popup__type');
  switch (collectionsOfObjects[index].offer.type) {
    case 'float':
      popupType.textContent = 'квартаира';
      break;
    case 'bungalo':
      popupType.textContent = 'Бунгало';
        break;
     case 'house':
      popupType.textContent = 'Дом';
      break;
    case 'palace':
      popupType.textContent = 'Дворец';
      break;
  }
  //Вводим оличество гостей и комнат в блок:
  newCard.querySelector('.popup__text--capacity').textContent = `${collectionsOfObjects[index].offer.rooms} комнаты для 3 гостей ${collectionsOfObjects[index].offer.guests}`;
  //Вводим время заезда и выезда в блок:
  newCard.querySelector('.popup__text--time').textContent = `Заезд после ${collectionsOfObjects[index].offer.checkin}, выезд до ${collectionsOfObjects[index].offer.checkout}`;
  //Вводим все доступные удобства в список в блок:
  let popupFeatures = newCard.querySelector('.popup__features');
  let popupFeature = newCard.querySelectorAll('.popup__feature');
  let listOfFeatures = document.createDocumentFragment();
     // функция для создания фрагмента
  let createListOfFeatures = function(){
    // удаляем все элементы из списка
    while (popupFeatures.firstChild) {
      popupFeatures.firstChild.remove();
    }
    let listItemOfFeature;
    for (let i = 0; i < collectionsOfObjects[index].offer.features.length; i++) {
      listItemOfFeature = popupFeature[0].cloneNode(true);
      listItemOfFeature.className = `popup__feature popup__feature--${collectionsOfObjects[index].offer.features[i]}`;
      listOfFeatures.append(listItemOfFeature);
    }
    return listOfFeatures;
  };
  popupFeatures.append(createListOfFeatures());
  //Вводим описание объекта недвижимости в блок:
  newCard.querySelector('.popup__description').textContent = collectionsOfObjects[index].offer.description;
  //Вводим все фотографии из списка в блок:
  newCard.querySelector('.popup__photo').src = collectionsOfObjects[index].offer.photos;
  let popupPhotos = newCard.querySelector('.popup__photos');
  let popupPhoto = newCard.querySelectorAll('.popup__photo');
  let listOfPhotos = document.createDocumentFragment();
     // функция для создания фрагмента
  let createListOfPhotos = function(){
    // удаляем все элементы из списка
    while (popupPhotos.firstChild) {
      popupPhotos.firstChild.remove();
    }
    let listItemOfPhotos;
    for (let i = 0; i < collectionsOfObjects[index].offer.photos.length; i++) {
      listItemOfPhotos = popupPhoto[0].cloneNode(true);
      listItemOfPhotos.src = collectionsOfObjects[index].offer.photos[i];
      listOfPhotos.append(listItemOfPhotos);
    }
    return listOfPhotos;
  };
  popupPhotos.append(createListOfPhotos());
  //Заменяем src у аватарки пользователя:
newCard.querySelector('.popup__avatar').src = collectionsOfObjects[index].author.avatar;

console.log(collectionsOfObjects);
return newCard;
};

let newCard = createNewCard(0);

map.querySelector('.map__filters-container').insertAdjacentElement("beforebegin", newCard);
