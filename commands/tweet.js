'use strict';
const Command = require('../classes/Command');

//Kills the bot, just in case it's acting up ;)
module.exports = function command(requires)
{
  return new Command({
    inline: true,
    alias: ['t'],
    description: 'Tweets',
    action: function(details)
    {
      let bot = requires.bot;
      let info = requires.info;
      let tweeter = info.utility.useSource('twitterAPI');
      tweeter.tweet(details.input).then((tweet) =>
      {
        bot.editMessage({
          channelID: details.channelID,
          messageID: details.commandID,
          message: `https://twitter.com/${info.config.api.twitter.handle}/status/${tweet.id_str}`
        });
      }).catch((err) =>
      {
        console.log(err);
      });
    }
  }, requires);
};