import axios from 'axios';

const BASE_URL = 'https://bidwinai.herokuapp.com';

// TODO: move this to redux
export function deleteUser(userId) {
  const url = `${BASE_URL}/user/`+ userId;

  return axios.delete(url).then(response => response.data);
}