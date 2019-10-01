'use strict';

// объявляем массив с комментариями

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// объявлем массив с именами пользователей

var NAMES = ['Гомер', 'Барт', 'Лиза', 'Мэгги', 'Мардж', 'Барни'];

var POSTS_AMOUNT = 25;
var USERPIC_AMOUNT = 6;

// генератор случайного целого числа в заданном диапазоне min-max
var getRandomInteger = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

// получаем услучайное количество лайков
var getRandomLikes = function () {
  return getRandomInteger(15, 200);
};

// случайный комментарий
var getRandomComment = function (commentsArray) {
  return commentsArray[getRandomInteger(1, 6)];
};

// адреса аватаров
var getRandomUrl = function () {
  var userpicUrlArray = [];
  for (var i = 0; i < USERPIC_AMOUNT; i++) {
    userpicUrlArray.push('img/avatar-' + (i + 1) + '.jpg');
  }
  return userpicUrlArray[getRandomInteger(1, 6)];
};

// имя пользователя
var getRandomName = function (userNames) {
  return userNames[getRandomInteger(0, 6)];
};

// описание поста с комментарием
var getRandomPost = function () {
  return {
    avatar: getRandomUrl(),
    message: getRandomComment(COMMENTS),
    name: getRandomName(NAMES)
  };
};

var createPosts = function () {
  var postArr = [];
  for (var i = 0; i < POSTS_AMOUNT; i++) {
    var postObj = {
      url: 'photos/' + (i + 1) + '.jpg',
      description: '',
      likes: getRandomLikes(),
      comments: getRandomPost(
          getRandomUrl(),
          getRandomComment(COMMENTS),
          getRandomName(NAMES)
      )
    };
    postArr.push(postObj);
  }
  return postArr;
};

var renderPosts = function () {
  var postTemplate = document
    .querySelector('#picture')
    .content.querySelector('.picture');

  var generatedPosts = createPosts();

  var gallery = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < generatedPosts.length; i++) {
    var postItem = postTemplate.cloneNode(true);

    // заполняем данными из массива
    postItem.querySelector('.picture__img').src = generatedPosts[i].url;
    postItem.querySelector('.picture__likes').textContent =
      generatedPosts[i].likes;
    postItem.querySelector('.picture__comments').textContent = '1';
    fragment.appendChild(postItem);
  }
  gallery.appendChild(fragment);
};
renderPosts();
