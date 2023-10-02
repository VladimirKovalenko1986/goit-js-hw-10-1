import API from './components/cat-api';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
const select = document.querySelector('.breed-select');
const trextLoading = document.querySelector('.loader');
const textError = document.querySelector('.error');
const iformatinCat = document.querySelector('.cat-info');

addHiddenErrorText();
addHiddenSelect();

// ************************!!!!!!!!!!!!!!!!!!!!!!!!!****************

API.fetchBreeds()
  .then(data => {
    removeHiddenSelect();
    addHiddenLoadingText();
    // console.log(data);
    return data.map(markup => createMarkupBreedsCat(markup)).join('');
  })
  .then(updateNewListBreedsCat)
  .catch(err => {
    addHiddenLoadingText();
    onError(err);
  });

// !!!!!!!!!!!!!!!!!!!!!*******************!!!!!!!!!!!!!!!!!!!!!!!!!

select.addEventListener('change', setOutput);

function setOutput() {
  clearNewsList();

  const selectedBreedId = select.value;
  API.fetchCatByBreed(selectedBreedId)
    .then(data => {
      return data.map(markup => createMarkupIdNameCat(markup)).join('');
    })
    .then(updateNewListIdNameCat)
    .catch(onError);
}

// ************************!!!!!!!!!!!!!!!!!!!!!!!!!****************

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
      <h2>${name}</h2>
      <p>${description}</p>
      <p><b>Temperament: </b>${temperament}</p>
    </div>
        `;
}

// !!!!!!!!!!!!!!!!!!!!!*******************!!!!!!!!!!!!!!!!!!!!!!!!!

function updateNewListIdNameCat(markup) {
  iformatinCat.insertAdjacentHTML('beforeend', markup);
}

function updateNewListBreedsCat(markup) {
  select.insertAdjacentHTML('beforeend', markup);
}

// ************************!!!!!!!!!!!!!!!!!!!!!!!!!****************

function onError(err) {
  console.log(err);
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}

function addHiddenLoadingText() {
  trextLoading.classList.add('hidden');
}

function removeHiddenErrorText() {
  trextLoading.classList.remove('hidden');
}

function addHiddenErrorText() {
  textError.classList.add('hidden');
}

function removeHiddenLoadingText() {
  textError.classList.remove('hidden');
}

function addHiddenSelect() {
  select.classList.add('hidden');
}

function removeHiddenSelect() {
  select.classList.remove('hidden');
}

function clearNewsList() {
  document.querySelector('.cat-info').innerHTML = '';
}
