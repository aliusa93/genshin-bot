//@ts-nocheck

import { MessageEmbed, Message } from 'discord.js'
import { ICommand } from 'wokcommands'
import { TextChannel } from 'discord.js'


export default {
    slash: 'both',
    testOnly: true,
    description: "Suggestion command!",
    options: [
        {
            name: 'suggestion',
            description: 'Suggestion',
            required: true,
            type: "STRING"
        }
    ],
    callback: async ({ message, args, interaction }) => {

        if (message) {
            const suggestionQuery = args.join(' ')

            if (!suggestionQuery) {
                return message.reply("You need to provide a suggestion!")
            }

            const embed = new MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(suggestionQuery)
                .setColor('YELLOW')
                .setTimestamp()
                .addField("Status", "PENDING")

            await message.channel.send('Submitted suggestion!')
            const channel = message.guild?.channels.cache.get('904018812532314142') as TextChannel

            if (channel) {
                const embedMessage = await channel.send({ embeds: [embed] })
                await embedMessage.react("👍")
                embedMessage.react("👎")

            }
        }

        if (interaction) {

            const suggestionQuery = interaction.options.getString('suggestion')
            const embed = new MessageEmbed()
                .setAuthor(interaction.member?.user.username)
                .setDescription(suggestionQuery)
                .setColor('YELLOW')
                .setTimestamp()
                .addField("Status", "PENDING")

            await interaction.reply('Submitted suggestion!')
            const channel = interaction.guild?.channels.cache.get('904018812532314142') as TextChannel

            if (channel) {
                const embedMessage = await channel.send({ embeds: [embed] })
                await embedMessage.react("👍")
                embedMessage.react("👎")

            }
        }





    }
} as ICommand
