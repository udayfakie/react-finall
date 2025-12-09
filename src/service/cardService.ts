import axios from 'axios';
import Card from '../interface/Card';
const api: string = process.env.REACT_APP_API + '/cards';
export function getAllCards() {
  return axios.get(api);
}
export function addCard(newcards: Card) {
  return axios.post(api, newcards);
}

export function createCard(cardData: Card,token: string) {
  return axios.post(api, cardData, {
    headers: {
      'x-auth-token': token,
    },
  });
}



export function getMyCards(token: string) {
  return axios.get(`${api}/my-cards`, {
    headers: { "x-auth-token": token },
  });
}


export function getCardsById(id: string) {
  return axios.get(`${api}/${id}`);
}

export function updateCard(id: string, updatedCard: Card) {
  const token = sessionStorage.getItem('token');
  return axios.put(`${api}/${id}`, updatedCard, {
    headers: {
      'x-auth-token': token,
    },
  });
}

export const deleteCard = (id: string, token: string) => {
  return axios.delete(`${api}/${id}`, {
    headers: {
      'x-auth-token': token,
    },
  });
};

export const likeForCard = (likeId: string, token: string) => {
  return axios.patch(`${api}/${likeId}`, {}, {
    headers: {
      'x-auth-token': token,
    },
  });
};
