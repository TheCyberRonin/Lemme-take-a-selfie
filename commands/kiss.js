'use strict';
const Command = require('../classes/Command');

//Kills the bot, just in case it's acting up ;)
module.exports = function command(requires)
{
  return new Command({
    inline: true,
    alias: ['k'],
    description: 'Kiss',
    action: function(details)
    {
      let bot = requires.bot;
      let info = requires.info;
      let neko = info.utility.useSource('nekoAPI');

      neko.kiss().then((kiss) =>
      {
        bot.editMessage({
          channelID: details.channelID,
          messageID: details.commandID,
          embed: {
            title: 'Kiss',
            image: {url: kiss.url}
          }
        });
      })
    }
  }, requires);
};