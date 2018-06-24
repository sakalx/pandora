const sentencesIntoText = sentences =>
  sentences.map(({text}) =>
    ` ${text}`
  ).join('\r\n\r\n\t');

export default sentencesIntoText;