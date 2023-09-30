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

function onFormSubmit(event) {
  event.preventDefault();
  searchQuery = event.currentTarget.elements.searchQuery.value;

  clearGalleryContainer();
  currentPage = 1;
  refs.loadMoreBtn.classList.remove('show-load-more');

  getImageCard(searchQuery)
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
  getImageCard(searchQuery).then(result => {
    const render = renderImageCard(result.hits);
    refs.gallery.insertAdjacentHTML('beforeend', render);
  });
}

function clearGalleryContainer() {
  refs.gallery.innerHTML = '';
}
