class MainApi { 
  constructor({baseUrl, headers}) { 
    this._baseUrl = baseUrl; 
    this._headers = headers 
  } 

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
  } 
 
  getUserInfo() { 
    return fetch(`${this._baseUrl}/users/me`, { 
      method: 'GET',
      headers: this._headers,
      credentials: 'include'
  }) 
  .then((res) => this._getResponseData(res));
  }
 
  editUserInfo({ email, name }) { 
    return fetch(`${this._baseUrl}/users/me`, { 
      method: 'PATCH', 
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        email,
        name,
      }),
    }) 
    .then((res) => this._getResponseData(res));
  }
  
  changeCardStatus(cardId, isSaved) {
      return fetch(`${this._baseUrl}/movies/${cardId}`, { 
        method: !isSaved ? 'PUT' : 'DELETE',
        headers: this._headers,
        credentials: 'include',
      })
      .then((res) => this._getResponseData(res));
  }
 
  deleteMovieFromSaved(cardId) { 
      return fetch(`${this._baseUrl}/saved-movies/${cardId}`, { //saved-movies или movies??
        method: 'DELETE', 
        headers: this._headers,
        credentials: 'include'
      }) 
      .then((res) => this._getResponseData(res));
  } 
} 

const mainApi = new MainApi({
  baseUrl: 'http://localhost:3000',
  headers: {
  'Content-Type': 'application/json'
  },
  credentials: 'include'
})

export default mainApi;