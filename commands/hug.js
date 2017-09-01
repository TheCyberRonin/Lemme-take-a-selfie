'use strict';
const Command = require('../classes/Command');

//Kills the bot, just in case it's acting up ;)
module.exports = function command(requires)
{
  return new Command({
    inline: true,
    alias: ['h'],
    description: 'Hugs',
    action: function(details)
    {
      let bot = requires.bot;
      let info = requires.info;
      let neko = info.utility.useSource('nekoAPI');

      neko.hug().then((hug) =>
      {
        bot.editMessage({
          channelID: details.channelID,
          messageID: details.commandID,
          embed: {
            title: 'Hug',
            image: {url: hug.url}
          }
        });
      })
    }
  }, requires);
};