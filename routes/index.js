const router = require('express').Router();
const apiRoutes = require('./api');
// const htmlRoutes = require('./html');

// router.use('/', htmlRoutes);
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.send("😿 404!");
});

module.exports = router;
