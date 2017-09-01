'use strict';
const Command = require('../classes/Command');

//Kills the bot, just in case it's acting up ;)
module.exports = function command(requires)
{
  return new Command({
    inline: true,
    alias: ['bm'],
    description: 'Makes a moji big.',
    action: function(details)
    {
      let bot = requires.bot;
      let info = requires.info;
      function bigMoji(emoteID)
      {
        return new Promise((resolve, reject) =>
        {
          resolve(`https://cdn.discordapp.com/emojis/${emoteID}.png`);
        });
      }

      function processEmote(string)
      {
        let emoteReg = /<:.+:\d{18}>/g;
        let emoteIDReg = /\d{18}/g;
        let emoteNameReg = /:.+:/g;
        if(string.search(emoteReg) !== -1)
        {
          let emoteStr = emoteReg.exec(string);
          let emoteID = emoteIDReg.exec(emoteStr);
          let emoteName = emoteNameReg.exec(emoteStr);
          bigMoji(emoteID).then((emoteLoc) =>
          {
            bot.editMessage({
              channelID: details.channelID,
              messageID: details.commandID,
              embed: {image: {url: emoteLoc}}
            });
          });
        }
      }
      if(details.args.length === 2)
      {
        processEmote(details.args[1]);
      }
    }
  }, requires);
};