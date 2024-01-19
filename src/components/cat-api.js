import axios from 'axios';
import 'notiflix/dist/notiflix-3.2.6.min.css';
const BASE_URL = 'https://api.thecatapi.com/v1';

export default class NewApiCat {
  constructor() {
    axios.defaults.headers.common['x-api-key'] =
      'live_sjTJ8IvV1LTFMwmFwotiB4uXUsVw1X13h0eAcwHeayPLF8m1ANRte3TYin2v37cD';
  }

  async fetchBreeds() {
    const response = await axios.get(`${BASE_URL}/breeds`);
    const responseData = await response.data;
    return responseData;

    // return axios.get(ENDPOINT).then(resp => resp.data);
  }

  async fetchCatByBreed(breedId) {
    const response = await axios.get(
      `${BASE_URL}/images/search?breed_ids=${breedId}`
    );
    const responseData = await response.data;
    return responseData;
    // return axios.get(`${ENDPOINT_BREED_ID}${breedId}`).then(resp => resp.data);
  }
}
