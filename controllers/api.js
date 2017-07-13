const express = require('express');
const BotManager = require('../bot/manager');

const router = express.Router();
const bot = new BotManager();

router.post('/', (req, res) => {
  let url = req.body.url;
  let valid = url.match(/[SM]([0-9]*)A([0-9]*)D([0-9]*)/);
  if (!valid) {
    return res.status(500).json({
      error: "Invalid input."
    });
  }
  return bot.getItemDetails(req.body.url)
  .then(item => {
    return res.status(200).json({
      "iteminfo": item
    });
  })
  .catch(error => {
    return res.status(500).json({
      error: error
    });
  });
});

module.exports = router;
