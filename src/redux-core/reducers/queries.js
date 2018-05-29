import {promise, query} from '../types';

const {PENDING, REJECTED, FULFILLED} = promise;
const {GET_HISTORY, ADD, DELETE, SET_SELECTED} = query;

const initState = {
  fetching: {
    queryHistory: false,
    addQuery: false,
    deleteQuery: false,
  },
  error: {
    queryHistory: null,
    addQuery: null,
    deleteQuery: null,
  },
  processingNewQuery: [],
  queryHistory: [],
  selectedQuery: {
    id: null,
    name: '',
  },
};

export default function queries(state = initState, {type, payload}) {

  switch (type) {
    case GET_HISTORY + PENDING:
      return {
        ...state,
        fetching: {...state.fetching, queryHistory: true},
      };
    case GET_HISTORY + REJECTED:
      return {
        ...state,
        fetching: {...state.fetching, queryHistory: false},
        error: {...state.error, queryHistory: payload},
      };
    case GET_HISTORY + FULFILLED:
      const newQuery = [];
      const queryHistory = [];

      payload.forEach(response =>
        response.result_endpoint ? queryHistory.push(response) : newQuery.push(response)
      );

      if (newQuery.length) {
        return {
          ...state,
          fetching: {...state.fetching, queryHistory: false},
          processingNewQuery: newQuery,
          queryHistory,
        }
      } else {
        return {
          ...state,
          fetching: {...state.fetching, queryHistory: false},
          processingNewQuery: [],
          queryHistory,
        }
      }

    case ADD + PENDING:
      return {
        ...state,
        fetching: {...state.fetching, addQuery: true},
      };
    case ADD + REJECTED:
      return {
        ...state,
        fetching: {...state.fetching, addQuery: false},
        error: {...state.error, addQuery: payload},
      };
    case ADD + FULFILLED:
      return {
        ...state,
        fetching: {...state.fetching, addQuery: false,},
      };

    case DELETE + PENDING:
      return {
        ...state,
        fetching: {...state.fetching, deleteQuery: true},
      };
    case DELETE + REJECTED:
      return {
        ...state,
        fetching: {...state.fetching, deleteQuery: false},
        error: {...state.error, deleteQuery: payload},
      };
    case DELETE + FULFILLED:
      return {
        ...state,
        fetching: {...state.fetching, deleteQuery: false},
        queryHistory: state.queryHistory.filter(({query_id}) => query_id !== payload),
      };

    case SET_SELECTED:
      return {
        ...state,
        selectedQuery: {
          id: payload,
          name: state.queryHistory.find(({query_id}) => query_id === payload).query,
        },
      };
  }
  return state;
}