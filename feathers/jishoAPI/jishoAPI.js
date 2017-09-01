//Feather for the jisho API
module.exports = function feather(requires)
{
  'use strict';
  //feather obj
  const feather = {};
  //set variable for config
  const config = feather.config;
  //requires
  const snekfetch = require('snekfetch');
  const urlencode = require('urlencode');
  
  //feather functions
  feather.searchJisho = function(word, num)
  {
    return new Promise((resolve, reject) =>
    {
      jishoReq(word).then((data) =>
      {
        resolve(prettyDisplay(data, num));
      }).catch((err) =>
      {
        reject(err);
      })
    });
  }
  //helper functions
  const jishoReq = function(word)
  {
    return new Promise((resolve, reject) =>
    {
      let url = 'http://jisho.org/api/v1/search/words?keyword=' + urlencode(word);
      snekfetch.get(url).set('Content-type', 'application/json')
        .then((response) =>
        {
          if(response.status === 200)
          {
            resolve({body:response.body, url: `http://jisho.org/search?utf8=%E2%9C%93&keyword=${urlencode(word)}`});
          }
        }).catch((err) =>
        {
          reject(err);
        });
    });
  }
  //grab the japanese readings
  const getJapanese = function(japaneseArr)
  {
    let ret = '';
    let arrLen = japaneseArr.length;
    for(let i = 0; i < arrLen; i ++)
    {
      let line = '';
      if(japaneseArr[i].word === undefined)
      {
        line += ' (' + japaneseArr[i].reading + ')';
      }
      else if(japaneseArr[i].reading === undefined)
      {
        line += ' ' + japaneseArr[i].word;
      }
      else
      {
        line += ' ' + japaneseArr[i].word + ' (' + japaneseArr[i].reading + ')';
      }
      if(i !== arrLen - 1)
      {
        line += ',';
      }
      ret += line;
    }
    return ret;
  };
  //gets the definitions
  const getDefinitions = function(sensesArr)
  {
    let definitions = '';
    let numDefs = 0;
    let arrLen = sensesArr.length;
    for(var i = 0; i < arrLen; i ++)
    {
      if(sensesArr[i].english_definitions !== undefined)
      {
        definitions += (numDefs+1) + '. ';
        numDefs ++;
        if(concatArr(sensesArr[i].parts_of_speech) === '')
        {
          if(concatArr(sensesArr[i].tags) === '')
          {
            definitions += concatArr(sensesArr[i].english_definitions) +'\n';
          }
          else
          {
            definitions+= concatArr(sensesArr[i].english_definitions) + ' - ' + concatArr(sensesArr[i].tags) + '. ' + concatArr(sensesArr[i].info) + '\n';
          }
        }
        else
        {
          definitions += '*' + concatArr(sensesArr[i].parts_of_speech) + '*: ';
          if(concatArr(sensesArr[i].tags) == '')
          {
            definitions += concatArr(sensesArr[i].english_definitions) + '\n';
          }
          else
          {
            definitions+= concatArr(sensesArr[i].english_definitions) + ' - ' + concatArr(sensesArr[i].tags) + '. '+ concatArr(sensesArr[i].info) + '\n';
          }
        }
      }
      
      
    }
    return definitions;
  };
  //concatenates an array to one line
  const concatArr = function(arr)
  {
    let s = '';
    if(arr !== undefined)
    {
      let arrLen = arr.length;
      for(let i = 0; i < arrLen; i++)
      {
        if(arr[i] != null)
        {
          if(i == (arrLen - 1))
          {
            s += arr[i];
          }
          else
          {
            s += arr[i] + ', ';
          }
        }
      }
    }
    
    return s;
  };
  //takes all of the data found and displays it nicely
  const prettyDisplay = function(apiData, num)
  {
    let api = apiData.body;
    let tagField = {name: 'Tag(s):',inline: true};
    let defField = {name: 'Definition(s):', inline: false};
    let embed = {title: 'Reading(s)', color: 0xa7fcd0, url: apiData.url};
    let fields = [];
    try
    {
      if(api.data[num] == undefined)
      {
        throw 'api.data is undefined';
      }
      else
      {
        embed.description = getJapanese(api.data[num].japanese);
        defField.value = getDefinitions(api.data[num].senses);
        fields.push(defField);
      }
    }
    catch(err)
    {
      console.log( 'Error occured: Error Code ' + err +' - something was looked up that would break bot. Writing to dump file.' + new Date());
      embed = {title:'Error',description: 'Error occured with that lookup. Try the command again. If that command doesn\'t work, please contact CyberRonin'};
    }
    
    embed.fields = fields;
    return embed;
  };

  return feather;
};
