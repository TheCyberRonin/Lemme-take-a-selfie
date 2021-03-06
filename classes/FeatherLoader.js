const Loader = require('./Loader');
const fs = require('fs');

class FeatherLoader extends Loader
{
  constructor(location)
  {
    super(location);
  }
  /**
   * Loads the files into an object
   * @function
   * @param {Object} passing - Contains what should be passed down to the files.
   * @param {Object} passing.bot - Discord.io bot instance.
   * @param {Object} passing.info - Generic info kept by Bot.
   * @param {Object} passing.bObj - Bot object (for custom emitters).
   * @returns {Promise<Object>} - Promise returns an object containing the file names as keys.
   */
  load(passing)
  {
    let info = passing.info;
    let dir = this.location;
    return new Promise((resolve, reject) =>
    {
      let save = false;
      fs.readdir(dir, (err, files) =>
      {
        if(err) reject(err);
        files.forEach((folder) =>
        {
          let featherName = folder;
          this.items[featherName] = require(`${dir}/${featherName}/${featherName}.js`)(passing);
        });
        resolve(this.items);
      });
    });
  }
}
module.exports = FeatherLoader;