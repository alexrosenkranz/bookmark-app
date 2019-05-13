const router = require('express').Router();
const { getBookmarks, createBookmark } = require('../../controllers/bookmark-controller');

const withAuth = require('../../middleware/authentication');

router.use(withAuth);

router
  .route('/')
  .get(getBookmarks)
  .post(createBookmark);

module.exports = router;
