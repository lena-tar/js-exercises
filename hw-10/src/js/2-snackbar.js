import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const successSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none"><path fill="#fff" d="M1.5 9.751a8.25 8.25 0 0 1 12.375-7.146.75.75 0 0 0 .75-1.299A9.75 9.75 0 1 0 19.5 9.751a.75.75 0 1 0-1.5 0 8.25 8.25 0 0 1-16.5 0Z"/><path fill="#fff" d="M20.781 2.782A.752.752 0 0 0 20.25 1.5a.751.751 0 0 0-.531.22L9.75 11.69 5.781 7.72a.75.75 0 1 0-1.062 1.062l4.5 4.5a.752.752 0 0 0 1.062 0l10.5-10.5Z"/></svg>`;
const errorSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill="#FAFAFB" d="M6.81.219A.75.75 0 0 1 7.34 0h9.32a.75.75 0 0 1 .53.219l6.591 6.591a.75.75 0 0 1 .219.53v9.32a.75.75 0 0 1-.219.53l-6.591 6.591a.75.75 0 0 1-.53.219H7.34a.75.75 0 0 1-.53-.219L.219 17.19A.75.75 0 0 1 0 16.66V7.34a.75.75 0 0 1 .219-.53L6.81.219ZM7.65 1.5 1.5 7.65v8.7l6.15 6.15h8.7l6.15-6.15v-8.7L16.35 1.5h-8.7Z"/><path fill="#FAFAFB" d="M6.969 6.97a.75.75 0 0 1 1.062 0L12 10.94l3.969-3.97a.75.75 0 1 1 1.062 1.061l-3.97 3.97 3.97 3.968a.753.753 0 0 1 0 1.062.749.749 0 0 1-1.062 0L12 13.061l-3.969 3.97a.75.75 0 0 1-1.225-.243.751.751 0 0 1 .163-.819L10.939 12 6.97 8.031a.75.75 0 0 1 0-1.062Z"/></svg>`;

const toDataUrl = svg =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

const successIcon = toDataUrl(successSvg);
const errorIcon = toDataUrl(errorSvg);

const form = document.querySelector('.form');

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      state === 'fulfilled' ? resolve(delay) : reject(delay);
    }, delay);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  createPromise(delay, state)
    .then(ms => {
      iziToast.success({
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        iconUrl: successIcon,
        class: 'toast toast--success',
        timeout: ms,
        close: true,
      });
    })
    .catch(ms => {
      iziToast.error({
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
        iconUrl: errorIcon,
        class: 'toast toast--error',
        timeout: ms,
        close: true,
      });
    });

  form.reset();
});
