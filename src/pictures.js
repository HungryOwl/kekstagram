'use strict';

define('pictures', ['./load', './utils', './gallery', './picture'], function(load, utils, Gallery, Picture) {

  var PICTURES_LOAD = 'http://localhost:1506/api/pictures';

  /**
   * Массив отзывов, полученных по JSONP
   * @type {Array.<Object>}
   */
  var pictureData = [];

  /**
   * Массив отрисованных объектов-картинок из конструктора
   * @type {Array}
   */
  var renderedPictures = [];

  /**
   * Контейнер для вставки всех картинок
   * @type {HTMLElement}
   */
  var pictureContainer = document.querySelector('.pictures');

  /**
   * Форма с фильтрами
   * @type {HTMLFormElement}
   */
  var filterForm = document.querySelector('.filters');

  /**
   * Отрисовываем картинки, пробегаясь по массиву с данными
   */
  function renderImages() {
    var pictureCollection = document.createDocumentFragment();

    pictureData.forEach(function(data, pictureNumber) {
      var picture = new Picture(data, pictureNumber);
      renderedPictures.push(picture);

      pictureCollection.appendChild(picture.element);
    });

    pictureContainer.appendChild(pictureCollection);
  }

  /*
   * Прячем фильтры перед отрисовкой
   */
  filterForm.classList.add('hidden');

  load.requestJsonp(PICTURES_LOAD, function(picturesData) {
    pictureData = picturesData;

    renderImages();
    Gallery.setPictures(pictureData);

    filterForm.classList.remove('hidden');
  });
});



