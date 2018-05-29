import axios from 'axios';

const BASE_URL = 'http://www.reddit.com/r/reactjs.json';

// TODO: move this to redux
// FIXME: just give same for all users ?
export function getRedditData(userId) {
  const url = `${BASE_URL}`;

  return axios.get(url).then(response => response.data);
}

