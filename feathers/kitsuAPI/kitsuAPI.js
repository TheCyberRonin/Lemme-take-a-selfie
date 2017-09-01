//Feather for the kitsu.io API
module.exports = function feather(requires)
{
  'use strict';
  //feather obj
  const feather = {};
  //set variable for config
  const config = feather.config;
  //requires
  const snekfetch = require('snekfetch');
  const request = require('request');
  const urlencode = require('urlencode');
  //feather functions

  const animeReq = function(anime)
  {
    return new Promise((resolve, reject) =>
    {
      let url = `https://kitsu.io/api/edge/anime?filter[text]=${urlencode(anime)}`;
      snekfetch.get(url).set('Content-type', 'application/json')
        .then((response) =>
        {
          if(response.status === 200)
          {
            let animeResponse = JSON.parse(response.text);
            if(animeResponse.data.length !== 0)
            {
              resolve(animeResponse.data);
            }
            else
            {
              reject('There were no results for that anime. Try to alter the title to get better results!');
            }
          }
        }).catch((err) =>
        {
          reject('An error has occured with that lookup, please try to change your search to get better results. If the error persists, contact CyberRonin#5517');
        });
    });
  };

  feather.searchAnime = function(anime, num)
  {
    return new Promise((resolve, reject) =>
    {
      animeReq(anime).then((response) =>
      {
        resolve(getInfo(response, num));
      }).catch((err) =>
      {
        reject(err);
      });
    });
  };
  feather.listAnime = function(anime)
  {
    return new Promise((resolve, reject) =>
    {
      animeReq(anime).then((response) =>
      {
        resolve(getList(response));
      }).catch((err) =>
      {
        reject(err);
      });
    });
  };

  const getList = function(body)
  {
    let emb = {};
    emb.title = 'List Results';
    emb.description = 'Add --<number> where the number is on this list. e.g (--1 for the first, etc) to the original search.\n\n' +  getNames(body) + '\n _ _';
    emb.footer = { text: 'Results provided by Kitsu.io', icon_url: 'http://www.cyberhawk.co/kitsu.png'};
    emb.thumbnail = {url:'http://www.cyberhawk.co/kitsu.png' };
    emb.color = 0xf75239;
    return emb;
  };

  const getNames = function(arr)
  {
    let str = '';
    for(let i = 0; i < arr.length; i ++)
    {
      str += `${i+1}. ${arr[i].attributes.titles.en_jp}`;
      if(arr[i].attributes.titles.ja_jp !== null && arr[i].attributes.titles.ja_jp !== '')
      {
        str += ` (${arr[i].attributes.titles.ja_jp})\n`;
      }
      else
      {
        str += '\n';
      }
    }
    return str;
  };

  const getInfo = function(body, n)
  {
    //main embed
    let emb = {};
    let maxLength = 1014;
    let tv = true;
    if(body[n].attributes.showType === 'Movie')
    {
      tv = false;
    }
    if(body[n].attributes.titles.en !== null && body[n].attributes.titles.en !== '')
    {
      emb.title = body[n].attributes.titles.en;
      emb.description = body[n].attributes.titles.en_jp;
      if(body[n].attributes.titles.ja_jp)
      {
        emb.description += '\n' + body[n].attributes.titles.ja_jp;
      }
    }
    else
    {
      emb.title = body[n].attributes.titles.en_jp;
      if(body[n].attributes.titles.ja_jp)
      {
        emb.description = body[n].attributes.titles.ja_jp;
      }
      else
      {
        emb.description = '\n _ _';
      }
    }
    emb.url = `https://kitsu.io/anime/${body[n].attributes.slug}`;
    //thumbnail
    let thumb = {};
    thumb.url = body[n].attributes.posterImage.medium;
    //fields embeds
    let fields = [];
    //synopsis
    let synopsis = {name: 'Synopsis:', inline: false};
    if(body[n].attributes.synopsis === '')
    {
      synopsis.value = 'No synopsis yet 😭';
    }
    else
    {
      if(body[n].attributes.synopsis.length > 1014)
      {
        synopsis.value = `${body[n].attributes.synopsis.slice(0, maxLength - 6)} [...]\n _ _`;
      }
      else
      {
        synopsis.value = body[n].attributes.synopsis + '\n _ _';
      }
    }
    fields.push(synopsis);
    
    //Rating
    emb.thumbnail = thumb;
    emb.fields = fields;
    emb.footer = { text: 'Results provided by Kitsu.io', icon_url: 'http://www.cyberhawk.co/kitsu.png'};
    emb.color = 0xf75239;
    return emb;
  };

  const concatArr = function(arr)
  {
    let s = '';
    let arrLen = arr.length;
    for(let i = 0; i < arrLen; i++)
    {
      if(arr[i].name != null)
      {
        if(i == (arrLen - 1))
        {
          s += arr[i].name;
        }
        else
        {
          s += arr[i].name + ', ';
        }
      }
    }
    return s;
  };

  return feather;
};
