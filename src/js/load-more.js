// import { getImageCard } from './api-service';
// import { renderImageCard } from './markup';
// import { refs } from './refs';
// import Notiflix from 'notiflix';

// let currentPage = 1;

// export function onLoadMore() {
//   currentPage += 1;
//   getImageCard(searchQuery, currentPage).then(result => {
//     const render = renderImageCard(result.hits);
//     refs.gallery.insertAdjacentHTML('beforeend', render);
//     if (currentPage > result.totalHits / 20) {
//       Notiflix.Notify.failure(
//         "We're sorry, but you've reached the end of search results."
//       );
//       refs.loadMoreBtn.classList.remove('show-load-more');
//       return;
//     }
//   });
// }
