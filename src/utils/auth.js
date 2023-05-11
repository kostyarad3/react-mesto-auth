export const BASE_URL = 'https://auth.nomoreparties.co';

export function register (email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Где-то ошибочка:( : ${res.status}`);
  })
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((res => res.json()))
  .then((data) => {
    if (data.token){
      localStorage.setItem('jwt', data.token);
      return data;
    }
  })
  .catch(err => console.log(err))
}; 

export function getContent(jwt) {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    }
  })
  .then(res => {
    if(res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Где-то ошибочка:( : ${res.status}`);
    }
  })
  .then(data => data)
};