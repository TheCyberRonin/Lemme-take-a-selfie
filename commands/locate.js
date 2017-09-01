'use strict';
const Command = require('../classes/Command');

//Kills the bot, just in case it's acting up ;)
module.exports = function command(requires)
{
  return new Command({
    inline: true,
    alias: ['l'],
    description: 'Locates where an emote came from',
    action: function(details)
    {
      let bot = requires.bot;
      let info = requires.info;

      function locate(emoteID)
      {
        return new Promise((resolve, reject) =>
        {
          Object.keys(bot.servers).forEach((server) =>
          {
            if(bot.servers[server].emojis[emoteID] !== undefined)
            {
              resolve(bot.servers[server].name)
            }
          });
        });
      }
      function processEmote(string)
      {
        let emoteReg = /<:.+:\d{18}>/g;
        let emoteIDReg = /\d{18}/g;
        let emoteNameReg = /:.+:/g;
        if(string.search(emoteReg)!= -1)
        {
          let emoteStr = emoteReg.exec(string);
          let emoteID = emoteIDReg.exec(emoteStr);
          let emoteName = emoteNameReg.exec(emoteStr);
          locate(emoteID).then((serverName) =>
          {
            bot.editMessage({
              channelID: details.channelID,
              messageID: details.commandID,
              embed: {title: 'Emote Location', description: `${emoteStr} located in ${serverName}`}
            });
          });
        }
      }
      if(details.args.length == 2)
      {
        processEmote(details.args[1]);
      }
      
    }
  }, requires);
};
