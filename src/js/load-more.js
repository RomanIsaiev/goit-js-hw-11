import { getImageCard } from './api-service';
import { renderImageCard } from './markup';
import { refs } from './refs';
import Notiflix from 'notiflix';
import { pageOptions } from './page-options';

refs.loadMoreBtn.addEventListener('click', onLoadMore);

export function onLoadMore() {
  pageOptions.currentPage += 1;
  getImageCard(pageOptions.searchQuery, pageOptions.currentPage).then(
    result => {
      const render = renderImageCard(result.hits);
      refs.gallery.insertAdjacentHTML('beforeend', render);
      if (pageOptions.currentPage > result.totalHits / 20) {
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
        refs.loadMoreBtn.classList.remove('show-load-more');
        return;
      }
    }
  );
}
