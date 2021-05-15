const Discord = require('discord.js-selfbot');
const client = new Discord.Client();
const cron = require('node-cron');
const settings = require('./config.json');
const prefix = settings.Prefix;
const color = "RANDOM";
const spawnChannelID = settings.SpawnChannelID;
const botPrefix = settings.BotPrefix;
const ownerID = settings.ownerid;

var spamming = false;
var chrons = false;

client.on("ready", () =>{
    console.log("[INFO] Starting...");
    console.log("[INFO] Programmed By Lehtric");
})

client.on('message', msg => {
    if(msg.author.bot){
      if(spawnChannelID.indexOf(msg.channel.id) == -1) return;
      if(msg.content.startsWith("The pokémon is")) return getName(msg);

      if(!msg.embeds[0]) return;
      if(!msg.embeds[0].title) return;
      if(msg.embeds[0].title.includes("wild pokémon has appeared")) return msg.channel.send(`${botPrefix}h`);
    }

    if(!msg.content.startsWith(prefix)) return;
    if(msg.author.id != ownerID) return;
    let args = msg.content.slice(prefix.length).trim().split(" ");
    let cmd = args.shift();

    if(cmd == "spam"){
      msg.delete();
      if(args[0] == "on"){
        if(spamming == true) return;
        spamming = true;
        if(chrons == true) return;
        chrons = true;
        return startChrons(msg);
      }

      if(args[0] == "off"){
        return spamming = false;
      }
      return;
    }

    try {
        msg.delete();
        let cmdFile = require(`./commands/${cmd}.js`);
        cmdFile.run(client, msg, args, settings, prefix, color);
    } catch (e) { 
        console.log("[Commands] Not A Command");
    }
});

function startChrons(msg){
    cron.schedule('*/4 * * * * *', () => {
        if (spamming == true) {
            sendMsg(msg);
        }
    });

    cron.schedule('*/9 * * * * *', () => {
        if (spamming == true) {
            sendMsg(msg);
        }
    });
}

function sendMsg(msg){
    msg.channel.send(Math.random().toString(36).substr(2, 7));
}

function getName(msg){
    var names = msg.content.split(" ");
    var name = names[names.length - 1];
    name = name.replace(".", "");
    name = name.split("\\");
    name = name.join("")
    let cmdFile = require(`./finder.js`);
    cmdFile.run(name, msg, botPrefix);
}

client.login(settings.Token);