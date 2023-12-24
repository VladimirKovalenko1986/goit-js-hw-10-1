import axios from 'axios';
import 'notiflix/dist/notiflix-3.2.6.min.css';
const BASE_URL = 'https://api.thecatapi.com/v1/';
// const ENDPOINT = 'https://api.thecatapi.com/v1/breeds';
const ENDPOINT_BREED_ID =
  'https://api.thecatapi.com/v1/images/search?breed_ids=';
axios.defaults.headers.common['x-api-key'] =
  'live_sjTJ8IvV1LTFMwmFwotiB4uXUsVw1X13h0eAcwHeayPLF8m1ANRte3TYin2v37cD';

async function fetchBreeds() {
  const URL = `${BASE_URL}breeds`;
  const respons = await axios.get(URL);
  const responsData = await respons.data;
  return responsData;

  // return axios.get(ENDPOINT).then(resp => resp.data);
}

async function fetchCatByBreed(breedId) {
  const URL = `${BASE_URL}images/search?breed_ids=`;
  const respons = await axios.get(`${URL}${breedId}`);
  const responsData = await respons.data;
  return responsData;
  // return axios.get(`${ENDPOINT_BREED_ID}${breedId}`).then(resp => resp.data);
}

export default { fetchBreeds, fetchCatByBreed };
