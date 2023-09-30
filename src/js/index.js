import axios from 'axios';
import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

console.log(refs.gallery);

let searchQuery = '';

function onFormSubmit(event) {
  event.preventDefault();
  searchQuery = event.currentTarget.elements.searchQuery.value;

  getImageCard(searchQuery)
    .then(result => {
      refs.form.reset();
      renderImageCard(result);
      refs.loadMore.classList.add('show-load-more');
    })
    .catch(error => console.log(error));
}

async function getImageCard(searchQuery) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=39745378-dd24554a2bcf90950765bc548&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`
    );
    if (response.data.hits.length === 0) {
      console.log(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    return response.data.hits;
  } catch (error) {
    console.log(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

function onLoadMore() {}

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
