'use strict';
const Command = require('../classes/Command');

//Kills the bot, just in case it's acting up ;)
module.exports = function command(requires)
{
  return new Command({
    inline: true,
    alias: ['ev'],
    description: 'Evaluates JS code',
    action: function(details)
    {
      let bot = requires.bot;
      
      const echo = function(str)
      {
        bot.editMessage({
          channelID: details.channelID,
          messageID: details.commandID,
          embed: {title: 'Echo', description: str, color: 0xa7fcd0}
        });
      };
      if(details.input === '') {return;}
      else
      {
        try
        {
          bot.editMessage({
            channelID: details.channelID,
            messageID: details.commmandID,
            embed: {title: 'Eval', description: eval(details.input), color: 0xa7fcd0}
          });
        }
        catch(err)
        {
          bot.editMessage({
            channelID: details.channelID,
            messageID: details.commandID,
            message: err,
            embed: {title: 'Eval', description: err, color: 0xff0000}
          });
        }
      }
    }
  }, requires);
};
