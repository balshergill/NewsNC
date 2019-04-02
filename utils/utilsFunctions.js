exports.timeStampJSConversion = arr => {
  return arr.map(article => {
    const newTime = new Date(article.created_at);
    const sliced = newTime.toISOString().slice(0, 10);
    return { ...article, created_at: sliced };
  });
};

exports.createKeyPairs = articleArr =>
  articleArr.reduce((acc, article) => {
    acc[article.title] = article.article_id;
    return acc;
  }, {});

exports.createdByToAuth = commentsArr => {
  const output = commentsArr.map(comment => {
    const newObj = { ...comment, author: comment.created_by };
    delete newObj.created_by;
    return newObj;
  });
  return output;
};
