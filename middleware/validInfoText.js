module.exports = function (req, res, next) {
  const { bname, text } = req.body;

  if (![bname, text].every(Boolean)) {
    return res.status(401).json("Missing Details");
  }

  next();
};
