module.exports = function (errorMessage, _, res, _) {
  res.status(500).send(errorMessage);
};
