const router = require('express').Router();
const userRoutes = require('./user-routes');
const scrapeRoutes = require('./scrape-routes');
const bookmarkRoutes = require('./bookmark-routes');

router.use('/user', userRoutes);
router.use('/scrape', scrapeRoutes);
router.use('/bookmarks', bookmarkRoutes);

module.exports = router;
