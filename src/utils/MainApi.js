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
 
  editUserInfo(data) { 
    return fetch(`${this._baseUrl}/users/me`, { 
      method: 'PATCH', 
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ 
        name: data.name, 
        about: data.about 
      }) 
    }) 
    .then((res) => this._getResponseData(res));
  }

  changeCardStatus(cardId, isLiked) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, { 
        method: !isLiked ? 'PUT' : 'DELETE',
        headers: this._headers,
        credentials: 'include',
      })
      .then((res) => this._getResponseData(res));
  }
 
  deleteCard(cardId) { 
      return fetch(`${this._baseUrl}/cards/${cardId}`, { 
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
