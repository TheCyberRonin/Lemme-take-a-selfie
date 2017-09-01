/**
 * @file Class file for a command.
 * @author Ronin
 */
'use strict';

/**
 * @class
 */
class Command
{
  /**
   * @param {Object} settings - Object that holds the settings for the class.
   * @param {String} settings.name - Name of the command.
   * @param {Array<String>} settings.alias - Array of strings that are accepted as an alias/aliases.
   * @param {String} settings.description - Description of the command.
   * @param {function} settings.action - Function that the command will perform.
   * @param {Boolean} [settings.inline = true] - Boolean for making the command's description appear inline
   * @param {Object} requires - Object that holds the required objects for the command.
   * @param {Object} requires.bot - D.io client instance.
   * @param {Object} requires.info - Needed info from the bot, plugins, etc.
   * @param {Object} requires.botObj - Instance of a bot.
   * or not, defaults to false.
   */
  constructor(settings, requires)
  {
    //required
    this.name = settings.name;
    this.alias = settings.alias;
    this.description = settings.description;
    this.action = settings.action;
    this.bot = requires.bot;
    this.info = requires.info;
    this.botObj = requires.botObj;
    //optional
    this.inline = settings.inline || true;
  }
  /**
   * Gets the name of the command
   * @function
   * @returns {String} Name of the command.
   */
  getName()
  {
    return this.name;
  }
  /**
   * Gets the alias/aliases of the command.
   * @function
   * @returns {Array<String>} Array of strings that represent the alias/aliases.
   */
  getAlias()
  {
    return this.alias;
  }
  /**
   * Gets the description of the command.
   * @function
   * @returns {String} Description of the command.
   */
  getDesc()
  {
    return this.description;
  }
  /**
   * Action that the command takes
   * @function
   */
  act(details)
  {
    this.action(details);
  }
  getAction()
  {
    return this.action;
  }
}

module.exports = Command;
