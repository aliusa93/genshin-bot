import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import { cs } from "../..";

export default {
    category: "Economy",
    aliases: ["bal"],
    description: "Check your balance",
    slash: true,
    testOnly: true,
    guildOnly: true,
    options: [
        {
            name: "user",
            type: "USER",
            required: false,
            description: "The user to check the balance of."
        }
    ],
    callback: async ({ interaction, client }) => {
        const member = interaction.options.getUser("user") || interaction.member?.user

        let balance = await cs.balance({
            user: member,
            guild: interaction.guild
        })

        const embed = new MessageEmbed()
        .setTitle(`<:Primo:927570105020321803> ${member?.username}'s balance <:Primo:927570105020321803>`)
        .setDescription(`Wallet: <:Primo:927570105020321803> ${balance.wallet}\n Bank: <:Primo:927570105020321803> ${balance.bank}`)
        .setTimestamp()

        interaction.reply({ embeds: [embed] })
        

    }
} as ICommand