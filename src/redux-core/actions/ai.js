import axios from 'axios';
import {article} from '../types';

const {GET_ARTICLE, TOGGLE_COMPRESSION} = article;

export function getAiArticle(url, query_id) {
  return {
    type: GET_ARTICLE,
    payload: axios.get(url).then(({data}) => ({...data, query_id})),
  }
}

export function toggleCompression(query_id, toggle) {
  return {
    type: TOGGLE_COMPRESSION,
    payload: {query_id, toggle},
  }
}
