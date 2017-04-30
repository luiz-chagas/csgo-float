const SteamTotp = require('steam-totp');
const SteamUser = require('steam-user');
const botMaster = require('csgo-floats');
const Promise = require('bluebird');
const fs = require('fs');
const config = require('../config/bot');

const master = new botMaster();
const client = new SteamUser();

let instance = null;

// Steam logon options
let logOnOptions = {
  "accountName": config.account_name,
  "password": config.password,
  "twoFactorCode": SteamTotp.getAuthCode(config.shared_secret)
};

class BotManager {

  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  initialize() {
    client.logOn(logOnOptions);

    client.on('loggedOn', function () {
      client.setPersona(SteamUser.EPersonaState.Online, "CSGO Float Bot by luizjr.me");
    });

    master.addBot(client).then(accountID => {
      console.log(`Account ${accountID} added to bot master.`)
    }).catch(error => {
      console.log('Error adding bot to bot master.', error)
    });
  }

  getItemDetails(url) {
    return new Promise((resolve, reject) => {
      master.inspect(url).then(item => {
        resolve(item);
      }).catch(error => {
        console.log('Error resolving item.', error);
        reject();
      });
    });
  }
}

module.exports = BotManager;
