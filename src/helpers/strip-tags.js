const stripTags = sentences => {
  const strip = text => text.replace(/(<h-\d>|<\/h-\d>)/g, '');

  return sentences.map(sentence => ({
      ...sentence,
      text: strip(sentence.text),
    }
  ))
};

export default stripTags;