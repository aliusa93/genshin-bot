import { GuildMember } from "discord.js"
import { ICommand } from "wokcommands"


export default {
    testOnly: true,
    slash: 'both',
    permissions: ['BAN_MEMBERS'],
    description: 'Ban a user',
    expectedArgs: '<user> <reason>',
    options: [
        {
            name: 'user',
            description: 'The user to ban',
            required: true,
            type: 6
        }, {
            name: 'reason',
            description: 'The reason for the ban',
            required: false,
            type: 3
        },
    ],
    callback: async ({ message, args, client, interaction }) => {
        if(interaction) {
            const member = interaction.options.getMember('user') as GuildMember
            const reason = interaction.options.getString('reason') || 'No reason provided'
            if(member.bannable) {
                await member?.ban({ reason })
                await interaction.reply(`${member.user.tag} has been banned for ${reason}`)
            } else {
                await interaction.reply(`${member.user.tag} cannot be banned`)
            }
        }

        if(message) {
            const member = message.mentions.members?.first() || message.guild?.members.cache.get(args[0])

            if(!args[0] || !member) {
                return message.reply('Please provide a user to ban')
            }

            if(member?.bannable) {
                await member?.ban({ reason: args[1] || 'No reason provided' })
                await message.reply(`${member.user.tag} has been banned for ${args[1] || 'No reason provided'}`)
            } else {
                await message.reply(`${member?.user.tag} cannot be banned`)
            }

        }
    }
} as ICommand