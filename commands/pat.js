'use strict';
const Command = require('../classes/Command');

//Kills the bot, just in case it's acting up ;)
module.exports = function command(requires)
{
  return new Command({
    inline: true,
    alias: ['p'],
    description: 'Hugs',
    action: function(details)
    {
      let bot = requires.bot;
      let info = requires.info;
      let neko = info.utility.useSource('nekoAPI');

      neko.pat().then((pat) =>
      {
        bot.editMessage({
          channelID: details.channelID,
          messageID: details.commandID,
          embed: {
            title: 'Pat',
            image: {url: pat.url}
          }
        });
      })
    }
  }, requires);
};