import NewApiCat from './components/cat-api';
import { getRefs } from './components/refs';
import { ElementsStatusLoading } from './components/elementStatus';
import { ElementSelect } from './components/statusElementSelect';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const refs = getRefs();

const apiCat = new NewApiCat();
const elementsStatusLoading = new ElementsStatusLoading({
  selector: '.loader',
  isHidden: false,
});

const elemetStatusSelect = new ElementSelect({
  selector: '#selectElement',
  isHidden: false,
});

apiCat
  .fetchBreeds()
  .then(data => {
    const markup = createMarkupBreedsCat(data);
    updateNewListCat(markup, elemetStatusSelect.select);
    elementsStatusLoading.hide();

    new SlimSelect({
      select: '#selectElement',
    });
  })
  .catch(onError);

elemetStatusSelect.select.addEventListener('change', setOutput);

function setOutput() {
  const selectedBreedId = elemetStatusSelect.select.value;

  apiCat
    .fetchCatByBreed(selectedBreedId)
    .then(data => {
      const markup = createMarkupIdNameCat(data);
      updateNewListCat(markup, refs.informationCat);
    })
    .catch(onError);
}

function createMarkupBreedsCat(arr) {
  return arr.map(({ id, name }) => `<option value="${id}">${name}</option>`);
}

function createMarkupIdNameCat(arr) {
  return arr
    .map(({ breeds, url }) => {
      const { name, alt_names, description, temperament } = breeds[0];
      return `
    <div class="conteiner-img">
      <img src="${url}" alt="${alt_names}">
    </div>
    <div class="conteiner-text">
      <h2 class = "cat-name">${name}</h2>
      <p class = "cat-text">${description}</p>
      <p class = "cat-pre-text"><b>Temperament: </b>${temperament}</p>
    </div>
        `;
    })
    .join('');
}

function updateNewListCat(markup, element) {
  element.innerHTML = markup;
}

function onError(err) {
  console.log(err);
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
  // elementsStatusLoading.show();
  elemetStatusSelect.hide();
}
