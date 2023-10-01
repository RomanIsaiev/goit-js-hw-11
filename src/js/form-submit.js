import { refs } from './refs';
import { getImageCard } from './api-service';
import { renderImageCard } from './markup';

refs.form.addEventListener('submit', onFormSubmit);

let searchQuery = '';

export function onFormSubmit(event) {
  event.preventDefault();
  searchQuery = event.currentTarget.elements.searchQuery.value;

  if (searchQuery === '') {
    refs.loadMoreBtn.classList.remove('show-load-more');
    refs.gallery.innerHTML = '';
    return;
  }

  refs.gallery.innerHTML = '';
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
