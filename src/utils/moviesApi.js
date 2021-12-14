class MoviesApi {
  constructor (options) {
    this._moviesUrl = options.url;
    this._headers = options.headers;
  }
  
  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
  } 
  
  getMovies() {
    return fetch(`${this._moviesUrl}`, {
      method: 'GET',
      headers: this._headers,
          
    })
    .then((res) => this._getResponseData(res));
  };
};
  
const moviesApi = new MoviesApi({
  moviesUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json',
  },
});
  
export default moviesApi;