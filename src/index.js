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

    const markup = createMarkupBreedsCat(data);
    updateNewListCat(markup, refs.select);

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
    .then(data => {
      const markup = createMarkupIdNameCat(data);
      updateNewListCat(markup, refs.informationCat);
    })
    .catch(onError);
}

// ************************!!!!!! FUNCTIONS !!!!!!!!!!!!!!!!!!!****************

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
  element.insertAdjacentHTML('beforeend', markup);
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
