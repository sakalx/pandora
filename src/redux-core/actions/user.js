import axios from "axios/index";
import {user, screen} from '../types';

const {GET_USERS, ADD, DELETE, UPDATE, ADMIT_USER, LOG_OUT} = user;
const baseUrl = 'https://bidwinai.herokuapp.com';

export function getUsers() {
  const url = `${baseUrl}/users`;

  return {
    type: GET_USERS,
    payload: axios.get(url).then(({data}) => data),
  }
}

export function addUser(newUser) {
  const url = `${baseUrl}/user`;

  return {
    type: ADD,
    payload: axios.post(url, newUser).then(response => response.data),
  }
}

export function deleteUser(userId) {
  const url = `${baseUrl}/user/${userId}`;

  return {
    type: DELETE,
    payload: axios.delete(url).then(response => response.data),
  }
}

/* TODO:
export function updateUser(userId) {
  const url = `${baseUrl}/user/${userId}`;

  return {
    type: UPDATE,
    payload: axios.put(url).then(response => response.data),
  }
}
*/

export function admitUser(userId) {
  return {
    type: ADMIT_USER,
    payload: userId,
  }
}

export function logOut() {
  return dispatch => {
    dispatch({
      type: LOG_OUT,
    });
    dispatch({
      type: screen.ROOT_SCREEN,
    });
    dispatch(getUsers())
  }
}