import Notiflix from 'notiflix';
import { renderImageCard } from './markup';
import { getImageCard } from './api-service';
import { refs } from './refs';

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

  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.classList.remove('show-load-more');

  getImageCard(searchQuery, currentPage)
    .then(result => {
      const render = renderImageCard(result.hits);
      refs.gallery.insertAdjacentHTML('beforeend', render);
      refs.loadMoreBtn.classList.add('show-load-more');
    })
    .catch(error => Notiflix.Notify.failure('Error', error));
}

function onLoadMore() {
  currentPage += 1;
  getImageCard(searchQuery, currentPage).then(result => {
    const render = renderImageCard(result.hits);
    refs.gallery.insertAdjacentHTML('beforeend', render);
    if (currentPage > result.totalHits / 20) {
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      refs.loadMoreBtn.classList.remove('show-load-more');
      return;
    }
  });
}
