import axios from 'axios';
import User from '../interface/User';

const api :string = process.env.REACT_APP_API + '/users';


export function checkUser(user: { email: string; password: string }) {
  return axios.post(`${api}/login`, user, {
    headers: { 'Content-Type': 'application/json' },
  });
}

export function addUser(newUser: User) {
  return axios.post(api, newUser, {
    headers: { 'Content-Type': 'application/json' },
  });
}

export function getUserById() {
  const userDetails = sessionStorage.getItem('userDetails') as string;
  return axios.get(`${api}/${userDetails}`, {
    headers: { 'x-auth-token': sessionStorage.getItem('token') },
  });
}

// admin@gmail.com

// Abc!123Abc
