import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import errorIcon from './img/error.svg';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const form = document.querySelector('.form');

const loadmoreBtn = document.querySelector('.loadmore-btn');
let page = 1;
let query = '';
let totalHits = 0;

loadmoreBtn.addEventListener('click', async event => {
  try {
    hideLoadMoreButton();
    showLoader();
    page++;
    const data = await getImagesByQuery(query, page);
    const hits = data.hits;
    if (!hits || hits.length === 0) {
      hideLoadMoreButton();
      iziToast.info({ message: 'No more images found.', position: 'topRight' });
      return;
    }
    createGallery(hits);

    const itemGallery = document.querySelector('.gallery-item');
    if (itemGallery) {
      const rect = itemGallery.getBoundingClientRect();
      const height = rect.height;

      window.scrollBy({ top: height * 2, behavior: 'smooth' });
    }
    const shown = page * 15;
    if (shown >= totalHits) {
      hideLoadMoreButton();

      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      return;
    }
    showLoadMoreButton();
  } catch (error) {
    page--;
    showError('Something went wrong. Please try again later.');
    if (page * 15 < totalHits) {
      showLoadMoreButton();
    }
  } finally {
    hideLoader();
  }
});

form.addEventListener('submit', onSubmit);

async function onSubmit(event) {
  event.preventDefault();

  query = event.currentTarget.elements['search-text'].value.trim();

  if (!query) {
    showError('Please enter a search query.');
    return;
  }

  page = 1;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;
    let images = data.hits;
    if (images.length === 0) {
      showError(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      return;
    }
    createGallery(images);
    if (totalHits > images.length) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      return;
    }
  } catch (error) {
    showError('Something went wrong. Please try again later.');
  } finally {
    hideLoader();
  }
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
