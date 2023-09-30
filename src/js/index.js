import axios from 'axios';
import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

let searchQuery = '';
let currentPage = 1;
let totalHits = 0;

function onFormSubmit(event) {
  event.preventDefault();
  searchQuery = event.currentTarget.elements.searchQuery.value;

  clearGalleryContainer();
  currentPage = 1;
  refs.loadMoreBtn.classList.remove('show-load-more');

  getImageCard(searchQuery)
    .then(result => {
      renderImageCard(result.hits);
      refs.loadMoreBtn.classList.add('show-load-more');
    })
    .catch(error => console.log(error));
}

async function getImageCard(searchQuery) {
  if (totalHits === 500) {
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
    return;
  }
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=39745378-dd24554a2bcf90950765bc548&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=20`
    );
    if (response.data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      console.log(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    totalHits += 20;
    return response.data;
  } catch (error) {
    console.log(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

function onLoadMore() {
  currentPage += 1;
  getImageCard(searchQuery).then(result => {
    renderImageCard(result.hits);
  });
}

function renderImageCard(data) {
  const markup = data
    .map(card => {
      return `
<div class="photo-card">
  <img src="${card.webformatURL}" alt="${card.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${card.likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${card.views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${card.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${card.downloads}</b>
    </p>
  </div>
</div>`;
    })
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function clearGalleryContainer() {
  refs.gallery.innerHTML = '';
}
