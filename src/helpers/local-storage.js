export const saveArticleToLs = (query_id, sentences) =>
  localStorage.setItem(`query:${query_id}`, sentences);

export const getSavedArticleFromLs = query_id =>
  localStorage.getItem(`query:${query_id}`);

export const removeSavedArticleFromLs = query_id =>
  localStorage.removeItem(`query:${query_id}`);


export const setUserToken = userId => localStorage.setItem('token', userId);

export const getUserToken = () => localStorage.getItem('token');

export const removeUserToken = () => localStorage.removeItem('token');