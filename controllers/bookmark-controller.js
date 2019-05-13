/* eslint-disable no-underscore-dangle */
const { User } = require('../models');
const handle = require('../utils/promise-handler');

module.exports = {
  /* ================= */
  async getBookmarks(req, res) {
    const [err, data] = await handle(User.findById(req._id, 'bookmarks'));

    if (err) {
      return res.json(500).json(err);
    }

    return res.status(200).json(data);
  },
  /* ================= */
  async createBookmark(req, res) {
    const [findErr, userProfile] = await handle(User.findById(req._id));
    if (findErr) {
      return res.json(500).json(findErr);
    }

    const [createErr, updatedProfile] = await handle(userProfile.booksmarks.create(req.body));

    if (createErr) {
      return res.json(500).json(findErr);
    }

    return res.status(200).json(updatedProfile);
  }
};
