import stripTags from 'root/helpers/strip-tags';
import {promise, article} from '../types';

const {PENDING, REJECTED, FULFILLED} = promise;
const {GET_ARTICLE, TOGGLE_COMPRESSION} = article;

const initState = {
  fetching: false,
  error: null,
  payload: {},
};

export default function aiArticle(state = initState, {type, payload}) {
  switch (type) {
    case GET_ARTICLE + PENDING:
      return {
        ...state,
        fetching: true,
      };
    case GET_ARTICLE + REJECTED:
      return {
        ...state,
        fetching: false,
        error: payload,
      };
    case GET_ARTICLE + FULFILLED:
      // FIXME: server for some query gives articles without sentences
      if (payload.sentences) {
        const stripedSentences = stripTags(payload.sentences);
        const orgSentences = index => index === -1 ? stripedSentences[0] : stripedSentences[index];

        const versions = payload.versions.map(version => ({
            ...version,
            sentences: version.sentences.map(orgSentences),
          })
        );

        return {
          ...state,
          fetching: false,
          payload: {
            ...state.payload,
            [payload.query_id]: {
              ...payload,
              sentences: stripedSentences,
              versions
            },
          },
        }
      } else {
        const errorMsg = 'wrong server response: article without sentences';
        console.error(errorMsg);

        return {
          ...state,
          fetching: false,
          error: errorMsg,
        }
      }
    case TOGGLE_COMPRESSION:
      const {query_id, toggle} = payload;

      const toggleVersions = state.payload[query_id].versions
        .map((version, index) => index === toggle
          ? ({
            ...version,
            is_default: true,
          })
          : ({
            ...version,
            is_default: false,
          })
        );

      return {
        ...state,
        payload: {
          ...state.payload,
          [query_id]: {
            ...state.payload[query_id],
            versions: toggleVersions,
          }
        }
      };
  }
  return state;
}