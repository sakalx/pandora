// min 2 symbols, max 12
export const validatorName = string =>
  /^[a-zA-Z][a-zA-Z0-9]{2,12}$/igm.test(string);

// min 6 symbols, max none
export const validatorEmail = email =>
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm.test(email);

// min 6 symbols, max 12
export const validatorPassword = password =>
  /(?=^.{6,12}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/igm.test(password);