const express = require('express');
const BotManager = require('../bot/manager');

const router = express.Router();
const bot = new BotManager();

router.post('/', (req, res) => {
  let url = req.body.url;
  let valid = url.match(/[SM]([0-9]*)A([0-9]*)D([0-9]*)/);
  if (!valid) {
    return res.status(500).send();
  }
  bot.getItemDetails(req.body.url).then(item => {
    res.json({
      "iteminfo": item
    });
  }).catch(error => {
    res.status(500).send();
  });
});

module.exports = router;
