import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '54668256-0f9ad4fc1d3dae74ee970a003';

export function getImagesByQuery(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  return axios.get(BASE_URL, { params }).then(res => res.data);
}
