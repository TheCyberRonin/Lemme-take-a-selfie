module.exports = function feather(requires)
{
  'use strict';
  //feather obj
  const feather = {};
  const Neko = require('neko.js');
  const nekoKey = requires.info.config.api.neko;
  const nekoClient = new Neko.Client({key: nekoKey});

  feather.kiss = function()
  {
    return nekoClient.kiss();
  }
  feather.hug = function()
  {
    return nekoClient.hug();
  }
  feather.pat = function()
  {
    return nekoClient.pat();
  }

  return feather;
}
