const router = require('express').Router();
const { scrapeReddit } = require('../../controllers/scraping-controller');

router
  .route('/')
  .get(scrapeReddit);

module.exports = router;
