import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Testing',
    aliases: ['test'],
    testOnly: true,
    slash: 'both',
    description: 'Ping pong test command!',
    callback: ({ message, client, interaction }) => {
        if (message) {
            message.react('✅')
            message.channel.send('Calculating ping...').then((resultMsg) => {
                const ping = resultMsg.createdTimestamp - message.createdTimestamp;

                const embed = new MessageEmbed()
                    .setColor('RED')
                    .setTitle('PONG! :ping_pong:')
                    .addFields({
                        name: 'Latency',
                        value: `${ping}ms`,
                    },{
                        name: 'API Latency',
                        value: `${Math.round(client.ws.ping)}ms`,
                    })
                    .setThumbnail(client.user?.displayAvatarURL())

                resultMsg.edit({ embeds: [embed] });

            })

        }

        if (interaction) {
            interaction.reply('Pong!')

        }


    }
} as ICommand