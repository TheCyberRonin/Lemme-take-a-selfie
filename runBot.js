'use strict';
const SelfBot = require('./classes/SelfBot');
const discord = require('discord.io');
const config = require('./config.json');
const appSettings = require('./package.json');
config.version = appSettings.version;


const bot = new SelfBot({
  config: config
});
