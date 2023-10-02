import axios from 'axios';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
const ENDPOINT = 'https://api.thecatapi.com/v1/breeds';
const ENDPOINT_BREED_ID =
  'https://api.thecatapi.com/v1/images/search?breed_ids=';
axios.defaults.headers.common['x-api-key'] =
  'live_sjTJ8IvV1LTFMwmFwotiB4uXUsVw1X13h0eAcwHeayPLF8m1ANRte3TYin2v37cD';

function fetchBreeds() {
  return axios.get(ENDPOINT).then(resp => resp.data);
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(resp => resp.data);
}

export default { fetchBreeds, fetchCatByBreed };
