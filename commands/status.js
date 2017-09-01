'use strict';
const Command = require('../classes/Command');

//Kills the bot, just in case it's acting up ;)
module.exports = function command(requires)
{
  return new Command({
    inline: true,
    alias: ['s'],
    description: 'Sets the status of the user to whatever is input.',
    action: function(details)
    {
      let bot = requires.bot;
      
      if(details.input === '')
      {
        return;
      }
      else
      {
        bot.setPresence({
          game:
          {
            name: details.input
          }
        });
        bot.deleteMessage({
          channelID: details.channelID,
          messageID: details.commandID
        });
      }
    }
  }, requires);
};
