export default class ApiService {
  constructor() {}

  async getImageCard(searchQuery) {
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
}
