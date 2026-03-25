import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');
const loadmoreBtn = document.querySelector('.loadmore-btn');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function markupCard(img) {
  return `
    <li class="gallery-item">
      <a class="gallery-link" href="${img.largeImageURL}">
        <img
          class="gallery-image"
          src="${img.webformatURL}"
          alt="${img.tags}"
          loading="lazy"
        />
      </a>

      <div class="info">
        <p class="info-item">
          <span class="info-title">Likes</span>
          <span class="info-value">${img.likes}</span>
        </p>

        <p class="info-item">
          <span class="info-title">Views</span>
          <span class="info-value">${img.views}</span>
        </p>

        <p class="info-item">
          <span class="info-title">Comments</span>
          <span class="info-value">${img.comments}</span>
        </p>

        <p class="info-item">
          <span class="info-title">Downloads</span>
          <span class="info-value">${img.downloads}</span>
        </p>
      </div>
    </li>
  `;
}

export function createGallery(images) {
  const markup = images.map(markupCard).join('');
  galleryEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryEl.innerHTML = '';
}

export function showLoader() {
  loaderEl.classList.add('is-open');
}

export function hideLoader() {
  loaderEl.classList.remove('is-open');
}

export function showLoadMoreButton() {
  loadmoreBtn.classList.add('is-open');
}

export function hideLoadMoreButton() {
  loadmoreBtn.classList.remove('is-open');
}
