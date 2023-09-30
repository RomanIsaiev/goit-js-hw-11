import axios from 'axios';
import Notiflix from 'notiflix';
import { renderImageCard } from './markup';
import { getImageCard } from './api-service';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

let searchQuery = '';
let currentPage = 1;

function onFormSubmit(event) {
  event.preventDefault();
  searchQuery = event.currentTarget.elements.searchQuery.value;

  if (searchQuery === '') {
    refs.loadMoreBtn.classList.remove('show-load-more');
    refs.gallery.innerHTML = '';
    return;
  }

  clearGalleryContainer();
  currentPage = 1;
  refs.loadMoreBtn.classList.remove('show-load-more');

  getImageCard(searchQuery, currentPage)
    .then(result => {
      console.log(result);
      const render = renderImageCard(result.hits);
      refs.gallery.insertAdjacentHTML('beforeend', render);
      refs.loadMoreBtn.classList.add('show-load-more');
    })
    .catch(error => console.log(error));
}

function onLoadMore() {
  currentPage += 1;
  getImageCard(searchQuery, currentPage).then(result => {
    const render = renderImageCard(result.hits);
    refs.gallery.insertAdjacentHTML('beforeend', render);
  });
}

function clearGalleryContainer() {
  refs.gallery.innerHTML = '';
}
