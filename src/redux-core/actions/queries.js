import axios from 'axios';
import {query} from '../types';

const {GET_HISTORY, ADD, DELETE, SET_SELECTED} = query;
const baseUrl = 'http://ai-writer.com/mpnt_json_endpoint.php?';

export function getQueryHistory(userId) {
  const url = `${baseUrl}list_queries=1&filter=${userId}`;

  return {
    type: GET_HISTORY,
    payload: axios.get(url).then(({data}) => data),
  }
}

export function addQuery(query, userId) {
  const url = `${baseUrl}add_query=${query}&word_count=500&comment=${userId}`;

  return {
    type: ADD,
    payload: axios.get(url),
  }
}

export function deleteQuery(queryId) {
  const url = `${baseUrl}delete_query=1&query_id=${queryId}`;
  axios.get(url);

  return {
    type: DELETE,
    payload: axios.get(url).then(res => queryId),
  }
}

export function setSelectedQuery(query_id) {
  return {
    type: SET_SELECTED,
    payload: query_id,
  }
}