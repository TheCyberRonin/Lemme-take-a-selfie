'use strict';
const Command = require('../classes/Command');

//Kills the bot, just in case it's acting up ;)
module.exports = function command(requires)
{
  return new Command({
    name: 'Anime',
    inline: true,
    alias: ['an'],
    description: 'Animu, OwO',
    permission: 'public',
    action: function(details)
    {
      
      let bot = requires.bot;
      let info = requires.info;
      let kitsu = info.utility.useSource('kitsuAPI');

      const searchAnime = function(w,n)
      {
        bot.simulateTyping(details.channelID);
        kitsu.searchAnime(w, n).then((emb) =>
        {
          bot.editMessage({
            channelID: details.channelID,
            messageID: details.commandID,
            embed: emb
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
      const listAnime = function(w)
      {
        bot.simulateTyping(details.channelID);
        kitsu.listAnime(w).then((emb) =>
        {
          bot.editMessage({
            channelID: details.channelID,
            messageID: details.commandID,
            embed: emb
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
      try{
        if(details.input === '') {return;}
        else if(details.input.search(/.+\s(--list)/g) != -1)
        {
          listAnime(details.input.replace(' --list', ''));
          return;
        }
        else if(details.input.search(/^.+\s--[1-9][0-9]*$/g) != -1)
        {
          let patt = /[1-9][0-9]*$/g;
          let num = parseInt(patt.exec(details.input),10);
          console.log('Num is ' + num + ' details is ' + details.input);
          console.log('Searching for ' + details.input.replace(/\s[1-9][0-9]*/g, ''));
          searchAnime(details.input.replace(/\s[1-9][0-9]*/g, ''),num - 1);
          return;
        }
        else
        {
          searchAnime(details.input, 0);
          return;
        }
      }
      catch(err)
      {
        bot.editMessage({
          channelID: details.channelID,
          messageID: details.commandID,
          embed:{
            title: 'Error',
            description: 'Error occured, if you are using a number in a title try to put it in parenthesis. If the error continues, contact CyberRonin.'
          }
        });
        console.log(err);
      }
    }
  }, requires);
};
