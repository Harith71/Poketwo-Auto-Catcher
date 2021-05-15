
exports.run = (client, msg, args, config, prefix, color) => {
    const Discord = require('discord.js-selfbot');
   
	let list = "";
    let commandlist = [`:diamonds: **${prefix}spam** <**On**> - Spams random strings at random intervals in channel.`, `:diamonds: **${prefix}spam off** - Stops spamming.`,
        `:diamonds: **${prefix}restart** - Restarts the bot`,
        `:diamonds: **${prefix}purge** <**Amount**> - Deletes messages.`
    ];

    for (i = 0; i < commandlist.length; i++) {
        list = list + commandlist[i] + "\n";
    }
    let embed = new Discord.MessageEmbed()
        .setTitle(`**HELP COMMAND**`)
        .setColor(color)
        .setFooter("Help List, Page 1/1", "Coded by Lehtric#2028")
        .addField(`:diamonds: **Commands** :diamonds:`, `${list}`)

    msg.channel.send(embed);
}