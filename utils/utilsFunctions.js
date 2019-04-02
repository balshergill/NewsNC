exports.timeStampJSConversion = arr => {
  return arr.map(article => {
    const newTime = new Date(article.created_at);
    return { ...article, created_at: newTime };
  });
};
