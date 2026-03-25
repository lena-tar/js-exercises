import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import errorIcon from './img/error.svg';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();

  const query = event.currentTarget.elements['search-text'].value.trim();

  if (!query) {
    showError('Please enter a search query.');
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(data => {
      const images = data.hits;

      if (!images || images.length === 0) {
        showError(
          'Sorry, there are no images matching your search query. Please try again!'
        );
        return;
      }

      createGallery(images);
    })
    .catch(() => {
      showError('Something went wrong. Please try again later.');
    })
    .finally(() => {
      hideLoader();
      form.reset();
    });
}

function showError(message) {
  iziToast.error({
    message,
    position: 'topRight',
    backgroundColor: '#ef4040',
    messageColor: '#fafafb',
    iconUrl: errorIcon,
    close: true,
    closeOnClick: true,
    timeout: 5000,
    progressBarColor: '#b51b1b',
    class: 'custom-error-toast',
  });
}
