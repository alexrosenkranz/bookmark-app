// https://www.reddit.com/user/Breezerbottles/m/webdev/
const axios = require('axios');
const cheerio = require('cheerio');

const handle = require('../utils/promise-handler');

module.exports = {
  async scrapeReddit(req, res) {
    const [err, { data }] = await handle(axios.get('https://www.reddit.com/user/Breezerbottles/m/webdev/'));

    if (err) {
      return res.status(500).json(err);
    }
    const $ = cheerio.load(data);
    const posts = [];
    $('p.title').each((i, element) => {
      const postData = {
        title: $(element).text(),
        link: $(element)
          .find('a')
          .attr('href')
      };
      posts.push(postData);
    });

    return res.status(200).json(posts);
  }
};
