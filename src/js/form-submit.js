import { refs } from './refs';
import { getImageCard } from './api-service';
import { renderImageCard } from './markup';
import { pageOptions } from './page-options';
import Notiflix from 'notiflix';

refs.form.addEventListener('submit', onFormSubmit);

export function onFormSubmit(event) {
  event.preventDefault();
  pageOptions.searchQuery = event.currentTarget.elements.searchQuery.value;

  pageOptions.currentPage = 1;

  if (pageOptions.searchQuery === '') {
    refs.loadMoreBtn.classList.remove('show-load-more');
    refs.gallery.innerHTML = '';
    return;
  }

  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.classList.remove('show-load-more');

  getImageCard(pageOptions.searchQuery, pageOptions.currentPage)
    .then(result => {
      const render = renderImageCard(result.hits);
      refs.gallery.insertAdjacentHTML('beforeend', render);
      refs.loadMoreBtn.classList.add('show-load-more');
      Notiflix.Notify.success(`Hooray! We found ${result.totalHits} images.`);
      pageOptions.simpleLightBox.refresh();
    })
    .catch(error => Notiflix.Notify.failure('Error', error));
}
