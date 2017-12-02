### Selfbots are banne now, please don't use them. :sob: I will leave the repo up for archiving purposes.
Lemme take a selfie. Self Bot.

Things you'll need for the bot.
* NodeJS
* Your user token

Optional things:
* Twitter application keys

To install NodeJS:  
[Install from here, LTS is fine](https://nodejs.org/en/)  
Once that is installed, you'll have to run a command in the `jiko` folder:  
`npm install`  
If you want it to run 24/7 (which is okay to do), you'll have 2 extra steps.  
 1. `npm i -g pm2`
 2. `pm2 start runBot.js --name="self"`
 
If you want to manually run it, instead of 24/7, just run `node runBot.js` in the `root` repo folder. Doing it that way will only have it run when
you have a command prompt or terminal window open that you ran the command on.
If your self bot seems to be unresponsive to commands (Discord is funky sometimes), give the bot a restart by doing `pm2 restart self`.  

Instructions for your `user token`, which you __**will need**__:    
You can do `ctrl-shift-i` right from the Discord application to get it instead of logging into the website.  
Put the user token in `config.json` there is a field for `discord_token`.
You will also need to put your ID in for `user` in `config.json`.

If you aren't going to use the Twitter command, delete the `tweet.js` file in the `commands` folder and delete the folder `twitterAPI` in the `feathers` folder.

Instructions to set up Twitter command:  
 1. Go to [Twitter apps page](https://apps.twitter.com/)
 2. Create a new app
 3. Fill in details, you can put a random placeholder website in the `Website` field and leave `Callback URL` blank.
 4. Make sure to check off the Developer Agreement
 5. Click on Create Twitter application button at the bottom.

Now that your app is set up, you'll need to copy the keys in the appropriate place.
Copy the keys into the `config.json` file, you'll see the right spots for the 4 different keys. You'll also need to fill in your handle(@handle ~ whatever is after the @ for your twitter) as well, to get the correct link.

The prefix is in the example is `~`.  
save this as `config.json` in the root dir of the repo
```js
{
  "prefix": "~",
  "playing": "",
  "description": "Self boat",
  "user": "",
  "api": {
      "discord_token": "",
      "twitter": {
        "consumer": "",
        "consumerSecret": "",
        "accessToken": "",
        "accessTokenSecret": "",
        "handle": ""
      },
      "neko": ""
  }
}
```

| Command | Shortcut | Parameters | Example |
|---------|----------|------------|---------|
| bigmoji |    bm    |    emote   | ~bm :Sadgery:|
| locate  |    l     |    emote   | ~l :angery:|
| jisho   |    j     | word(or phrase)|~j welcome|
| tweet   |    t     |    tweet   | ~t This selfbot is lit.|
| eval    |    ev    | JS code    | ~ev echo("some random thing")|
| hug     |    h     |    none    | ~h  |
| kiss    |    k     |    none    | ~k  |
| pat     |    p     |    none    | ~p  |
| status  |    s     |    word(or sentence) | ~s Selfboat, yey |
| anime   |    an    |    title of anime | ~an attack on titan |
