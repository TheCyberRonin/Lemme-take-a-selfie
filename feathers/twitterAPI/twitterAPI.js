module.exports = function feather(requires)
{
  'use strict';
  //feather obj
  const feather = {};
  const Twitter = require('twitter');
  const tData = requires.info.config.api.twitter;
  const tweeter = new Twitter({
    consumer_key: tData.consumer,
    consumer_secret: tData.consumerSecret,
    access_token_key: tData.accessToken,
    access_token_secret: tData.accessTokenSecret
  });

  feather.tweet = function(str)
  {
    return new Promise((resolve, reject) =>
    {
      if(str.length < 140)
      {
        tweeter.post('statuses/update', {status: str}, function(error, tweet, response)
        {
          if(!error)
          {
            resolve(tweet);
          }
          else
          {
            reject(error);
          }
        });
      }
      else
      {
        reject(`Tweet was over 140 characters, didn't tweet.`);
      }
    });
  };

  return feather;
}
