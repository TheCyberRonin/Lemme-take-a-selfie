'use strict';
const Command = require('../classes/Command');

//ported Jisho command
module.exports = function command(requires)
{
  return new Command({
    inline: true,
    alias: ['j'],
    description: 'Jisho lookup, finds the first definition.',
    action: function(details)
    {
      let bot = requires.bot;
      let info = requires.info;
      let jisho = info.utility.useSource('jishoAPI');

      const searchJisho = function(w,n)
      {
        jisho.searchJisho(w,n).then((emb) =>
        {
          bot.editMessage({
            channelID: details.channelID,
            messageID: details.commandID,
            embed: emb,
          }); 
        }).catch((err) =>
        {
          bot.editMessage({
            channelID: details.channelID,
            messageID: details.commandID,
            embed: {
              title: 'Error',
              description: err
            }
          });
        });
      };
      //handles command input
      if(details.input === '') {return;}
      if(details.input.search(/^.+\s[1-9][0-9]*$/g) != -1)
      {
        let patt = /[1-9][0-9]*$/g;
        let num = parseInt(patt.exec(details.input),10);
        console.log('Num is ' + num + ' details is ' + details.input);
        console.log('Searching for ' + details.input.replace(/\s[1-9][0-9]*/g, ''));
        searchJisho(details.input.replace(/\s[1-9][0-9]*/g, ''),num - 1);
        return;
      }
      else
      {
        searchJisho(details.input, 0);
        return;
      }
    }
  }, requires);
};