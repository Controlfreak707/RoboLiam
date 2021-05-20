const Discord = require('discord.js');
module.exports = {
  name: "unmute",
  category: "Moderation",
  description:
    "unmute a member in the current server.",
  aliases: ["talk"],
  usage: "<mention> ",
  args: true,
  guildOnly: true,
  permission: "MUTE_MEMBERS",
  execute(message, args) {

        const target = message.mentions.users.first() ||
        message.guild.members.cache.get(args[0])?.user;

        if(target){
          
            let muteRole = message.guild.roles.cache.find(r => r.name === 'Muted');

            let memberTarget= message.guild.members.cache.get(target.id);
            
            memberTarget.roles.remove(muteRole.id);
            message.channel.send(`${memberTarget.user.tag} has been **unmuted**`);
           
        } else{
            message.channel.send('please specify a member');
        }


  },
};
