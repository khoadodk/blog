const Tag = require('../models/Tag');
const slugify = require('slugify');
const { ErrorHandler } = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
  const { name } = req.body;
  let slug = slugify(name).toLowerCase();

  let tag = new Tag({ name, slug });

  tag.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: ErrorHandler(err)
      });
    }
    res.json(data);
  });
};

exports.list = (req, res) => {
  Tag.find().exec((err, data) => {
    if (err) return res.status(400).json({ error: errorHandler(err) });
    res.json(data);
  });
};
exports.read = (req, res) => {
  let slug = req.params.slug.toLowerCase();
  Tag.findOne({ slug }).exec((err, data) => {
    if (err) return res.status(400).json({ error: errorHandler(err) });
    res.json(data);
  });
};
exports.remove = (req, res) => {
  let slug = req.params.slug.toLowerCase();
  Tag.findOneAndRemove({ slug }).exec((err, data) => {
    if (err) return res.status(400).json({ error: errorHandler(err) });
    res.json({ message: 'Tag deleted successfully' });
  });
};
