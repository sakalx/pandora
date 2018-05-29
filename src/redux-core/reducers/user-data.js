import {promise, user} from '../types';

const {PENDING, REJECTED, FULFILLED} = promise;
const {GET_USERS, ADD, DELETE, UPDATE, ADMIT_USER} = user;

const initState = {
  fetching: {
    getUsers: false,
    addUser: false,
    deleteUser: false,
    updateUser: false,
  },
  error: {
    getUsers: null,
    addUser: null,
    deleteUser: null,
    updateUser: null,
  },
  users: [],
  user: {
    __v: null,
    _id: null,
    username: '',
    password: '',
    name: '',
    email: '',
    company: '',
    admin: false,
  },
};

export default function userData(state = initState, {type, payload}) {
  switch (type) {
    case GET_USERS + PENDING:
      return {
        ...state,
        fetching: {...state.fetching, getUsers: true},
      };
    case GET_USERS + REJECTED:
      return {
        ...state,
        fetching: {...state.fetching, getUsers: false},
        error: {...state.error, getUsers: payload},
      };
    case GET_USERS + FULFILLED:
      return {
        ...state,
        fetching: {...state.fetching, getUsers: false},
        users: payload,
      };

    case ADD + PENDING:
      return {
        ...state,
        fetching: {...state.fetching, addUser: true},
      };
    case ADD + REJECTED:
      return {
        ...state,
        fetching: {...state.fetching, getUsers: false},
        error: {...state.error, addUser: payload},
      };
    case ADD + FULFILLED:
      // FIXME: note response should be valid JSON,
      const newUser = JSON.parse(payload);
      return {
        ...state,
        fetching: {...state.fetching, addUser: false},
        users: [...state.users, newUser],
        user: newUser,
      };

    case DELETE + PENDING:
      return {
        ...state,
        fetching: {...state.fetching, deleteUser: true},
      };
    case DELETE + REJECTED:
      return {
        ...state,
        fetching: {...state.fetching, deleteUser: false},
        error: {...state.error, deleteUser: payload},
      };
    case DELETE + FULFILLED:
      const users = state.users.filter(({_id}) => _id !== payload._id);

      return {
        ...state,
        fetching: {...state.fetching, deleteUser: false},
        users,
      };

    /* TODO action not ready
  case UPDATE + PENDING:
    return {
      ...state,
      fetching: {...state.fetching, updateUser: true},
    };
  case UPDATE + REJECTED:
    return {
      ...state,
      fetching: {...state.fetching, updateUser: false},
      error: {...state.error, updateUser: payload},
    };
  case UPDATE + FULFILLED:
    return {
      ...state,
      fetching: {...state.fetching, updateUser: false},
    };
*/

    case ADMIT_USER:
      const user = state.users.find(({_id}) => _id === payload);
      return {
        ...state,
        user,
      };
  }
  return state;
}