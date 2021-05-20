const Discord = require('discord.js')
const me = require('ms')
module.exports = {
  name: "mute",
  category: "Moderation",
  description:
    "mute a member in the current server.\ndon't Set `<time>` for perm-mute.",
  aliases: ["shut"],
  usage: "<mention> <time>",
  args: true,
  guildOnly: true,
  permission: "MUTE_MEMBERS",
  execute(message, args) {

   const target = message.mentions.users.first() ||
        message.guild.members.cache.get(args[0])?.user;

        if (target) {
  
            let muteRole = message.guild.roles.cache.find(r => r.name === 'Muted');
            
            if (!muteRole) {
                    try {
                        muteRole = await message.guild.roles.create({
                            name: "T!MUTED",
                            permissions: []
                        })
                        message.guild.channels.cache.forEach(async (channel, id) => {
                            await channel.createOverwrite(muteRole, {
                                SEND_MESSAGES: false,
                            })
                        })
                    } catch (e) {
                        console.log(e)
                    }
                }
      
           
            let memberTarget = message.guild.members.cache.get(target.id);

            if (!args[1]) {
                memberTarget.roles.add(muteRole.id);
                message.channel.send(`🤐 ${memberTarget.user.tag} has been muted`)
              
                return
            }
            memberTarget.roles.add(muteRole.id);
            message.channel.send(`🤐 ${memberTarget.user.tag} has been muted for **${ms(ms(args[1]))}**`);
           
            setTimeout(function () {
                memberTarget.roles.remove(muteRole.id);
            }, ms(args[1]));
        } else {
            message.channel.send('please specify a member');
        }
       
       
  },
};
