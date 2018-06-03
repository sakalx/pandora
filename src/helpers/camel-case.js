export const camelCase = string =>
  string.split(/(?=[A-Z])/)
    .map(word =>
      word[0].toUpperCase() + word.slice(1)
    )
    .join(' ');

export const stringToCamelCase = string =>
  string[0].toLowerCase() + string.slice(1).replace(' ', '');