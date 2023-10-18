import API from './components/cat-api';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

// !!!!!!!!!!!!!!!!!!  LINKS  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const refs = {
  select: document.querySelector('.js-select'),
  trextLoading: document.querySelector('.loader'),
  textError: document.querySelector('.error'),
  informationCat: document.querySelector('.js-cat-info'),
};

// addHiddenErrorText();
addHiddenSelect();

// *************!!!!!!   LOADING FUNCTIONS PAGE  !!!!!!!!!!!!!!!!!!!****************

API.fetchBreeds()
  .then(data => {
    removeHiddenSelect();
    addHiddenLoadingText();

    // console.log(data);
    return data.map(markup => createMarkupBreedsCat(markup)).join('');
  })
  .then(markup => {
    updateNewListBreedsCat(markup);

    new SlimSelect({
      select: '#selectElement',
    });
  })
  .catch(err => {
    onError(err);
  });

// !!!!!!!!!!!!!!!!!!!!!*******************!!!!!!!!!!!!!!!!!!!!!!!!!

refs.select.addEventListener('change', setOutput);

function setOutput() {
  clearNewsList();

  const selectedBreedId = refs.select.value;
  API.fetchCatByBreed(selectedBreedId)
    .then(data => data.map(markup => createMarkupIdNameCat(markup)).join(''))
    .then(updateNewListIdNameCat)
    .catch(onError);
}

// ************************!!!!!! FUNCTIONS !!!!!!!!!!!!!!!!!!!****************

function createMarkupBreedsCat({ id, name }) {
  return `<option value="${id}">${name}</option>`;
}

function createMarkupIdNameCat({ breeds, url }) {
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
}

function updateNewListIdNameCat(markup) {
  refs.informationCat.insertAdjacentHTML('beforeend', markup);
}

function updateNewListBreedsCat(markup) {
  refs.select.insertAdjacentHTML('beforeend', markup);
}

// ************************!!!!!!!!!!!!!!!!!!!!!!!!!****************

function onError(err) {
  console.log(err);
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}

function addHiddenLoadingText() {
  refs.trextLoading.classList.add('hidden');
}

function removeHiddenErrorText() {
  refs.trextLoading.classList.remove('hidden');
}

function addHiddenErrorText() {
  refs.textError.classList.add('hidden');
}

function removeHiddenLoadingText() {
  refs.textError.classList.remove('hidden');
}

function addHiddenSelect() {
  refs.select.classList.add('hidden');
}

function removeHiddenSelect() {
  refs.select.classList.remove('hidden');
}

function clearNewsList() {
  refs.informationCat.innerHTML = '';
}
