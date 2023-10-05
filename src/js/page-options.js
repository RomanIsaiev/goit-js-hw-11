import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const pageOptions = {
  searchQuery: '',
  currentPage: 1,
  simpleLightBox: new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  }),
};
