import { GuildMember } from "discord.js"
import { ICommand } from "wokcommands"


export default {
    testOnly: true,
    slash: 'both',
    permissions: ['KICK_MEMBERS'],
    description: 'Kick a user',
    expectedArgs: '<user> <reason>',
    options: [
        {
            name: 'user',
            description: 'The user to kick',
            required: true,
            type: 6
        }, 
    ],
    callback: async ({ message, args, client, interaction }) => {
        if(interaction) {
            const member = interaction.options.getMember('user') as GuildMember
            if(member.kickable) {
                await member?.kick()
                await interaction.reply(`${member.user.tag} has been kicked.`)
            } else {
                await interaction.reply(`${member.user.tag} cannot be kicked.`)
            }
        }

        if(message) {
            const member = message.mentions.members?.first() || message.guild?.members.cache.get(args[0])

            if(!args[0] || !member) {
                return message.reply('Please provide a user to ban')
            }

            if(member?.kickable) {
                await member?.kick()
                await message.reply(`${member.user.tag} has been kicked.`)
            } else {
                await message.reply(`${member?.user.tag} cannot be banned`)
            }

        }
    }
} as ICommand