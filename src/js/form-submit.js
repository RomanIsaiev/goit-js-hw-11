import { refs } from './refs';
import { getImageCard } from './api-service';
import { renderImageCard } from './markup';
import { pageOptions } from './page-options';

refs.form.addEventListener('submit', onFormSubmit);

export function onFormSubmit(event) {
  event.preventDefault();
  searchQuery = event.currentTarget.elements.searchQuery.value;

  pageOptions.currentPage = 1;

  if (searchQuery === '') {
    refs.loadMoreBtn.classList.remove('show-load-more');
    refs.gallery.innerHTML = '';
    return;
  }

  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.classList.remove('show-load-more');

  getImageCard(searchQuery, pageOptions.currentPage)
    .then(result => {
      const render = renderImageCard(result.hits);
      refs.gallery.insertAdjacentHTML('beforeend', render);
      refs.loadMoreBtn.classList.add('show-load-more');
    })
    .catch(error => Notiflix.Notify.failure('Error', error));
}
