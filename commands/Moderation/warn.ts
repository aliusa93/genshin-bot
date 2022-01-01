import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import warnSchema from "../../models/warn-schema";


export default {
    category: "Moderation",
    aliases: ["w"],
    description: "Warn a user",
    slash: true,
    testOnly: true,
    guildOnly: true,
    permissions: ["BAN_MEMBERS"],
    options: [
        {
            type: "SUB_COMMAND",
            name: "add",
            description: "Add a warning",
            options: [
                {
                    name: "user",
                    type: "USER",
                    required: true,
                    description: "The user to warn"
                }, {
                    name: "reason",
                    type: "STRING",
                    required: true,
                    description: "The reason for the warning"
                },
            ]
        }, {
            name: "remove",
            type: "SUB_COMMAND",
            description: "Remove a warning",
            options: [
                {
                    name: "user",
                    type: "USER",
                    required: true,
                    description: "The user to remove a warning from"
                },
                {
                    name: "id",
                    type: "STRING",
                    required: true,
                    description: "The id of the warning to remove",
                },
            ],
        }, {
            name: "list",
            type: "SUB_COMMAND",
            description: "List all warnings",
            options: [
                {
                    name: "user",
                    type: "USER",
                    required: true,
                    description: "The user to list warnings for"
                }
            ]
        }

    ],
    callback: async ({ guild, member: staff, interaction }) => {
        const subCommand = interaction.options.getSubcommand()

        const user = interaction.options.getUser("user")
        const reason = interaction.options.getString("reason")
        const id = interaction.options.getString("id")


        if (subCommand === "add") {
            const warning = await warnSchema.create({
                userId: user?.id,
                staffId: staff.id,
                guildId: guild?.id,
                reason,
            })

            return {
                custom: true,
                content: `Added warning ${warning.id} to ${user?.tag}`,
                allowedMentions: {
                    users: []
                }
            }
        } else if (subCommand === "remove") {
            const warning = await warnSchema.findByIdAndDelete(id)


            return {
                custom: true,
                content: `Removed warning ${warning.id} from ${user?.tag}`,
                allowedMentions: {
                    users: []
                }
            }

        } else if (subCommand === "list") {
            const warnings = await warnSchema.find({
                userId: user?.id,
                guildId: guild?.id,
            })

            let desc = `Warnings for <@${user?.id}>\n\n`

            for (const warn of warnings) {
                desc += `**${warn.id}** - ${warn.reason}\n`
                desc += `**Staff:** <@${warn.staffId}>\n`
                desc += `**Date:** ${warn.createdAt}\n\n`
                desc += `**Reason:** ${warn.reason}\n\n`
            }

            const embed = new MessageEmbed().setDescription(desc)

            return embed
        }
    }
} as ICommand