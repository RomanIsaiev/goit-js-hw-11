import Notiflix from 'notiflix';
import axios from 'axios';

export async function getImageCard(searchQuery) {
  let totalHits = 0;
  currentPage = 1;

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
