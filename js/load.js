'use strict';

(function () {

  var URL = 'https://js.dump.academy/kekstagram/data';
  window.pictureItems = [];

  var filters = document.querySelector('.img-filters');
  var filterButtonsAll = filters.querySelectorAll('.img-filters__button');
  filters.classList.remove('img-filters--inactive');

  var load = function () {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      console.log(xhr.response);

      if (xhr.status === window.SUCCESS_CODE) {
        var pictureItems = xhr.response;
        // window.renderPicture(window.pictureItems);
        window.photo = pictureItems.map(function (photo, id) {
          photo.id = id;
          return photo;
        });
        console.log(window.photo);
        window.renderPicture(window.photo);
      } else {
        window.renderErrorMessage();
      }
    });

    xhr.addEventListener('timeout', function () {
      window.renderErrorMessage();
    });

    xhr.timeout = 10000;

    xhr.open('GET', URL);
    xhr.send();
  };

  try {
    load();
  } catch (err) {
    window.renderErrorMessage();
  }

  filters.addEventListener('click', function (evt) {

    filterButtonsAll.forEach(function (button) {
      button.classList.remove('img-filters__button--active');
    });
    evt.target.classList.toggle('img-filters__button--active');

    console.log('evt.target.id=', evt.target.id);
    console.log('window.photo=', window.photo);
    window.filteredPictures.set(evt.target.id, window.photo);
  });
})();