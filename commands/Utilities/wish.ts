import { ICommand } from "wokcommands";

export default {
    category: "Utilities",
    aliases: ["w"],
    description: "Wish for roles. 50/50.",
    slash: true,
    guildOnly: true,
    testOnly: true,
    options: [
        {
            name: "role",
            description: "The role to wish for.",
            required: true,
            type: "ROLE",
        }
    ],
    
    callback: async ({ interaction, client, member }) => {
        const role = interaction.options.getRole("role")
        const RoleName = role?.name
        
        if(!["naruto botto ping", "karuta ping", "Pro", "Decent", "Newbie"].includes(RoleName)) {
            interaction.reply(`Please enter a valid role.\nRoles: ${["naruto botto ping", "karuta ping", "Pro", "Decent", "Newbie"].join(", ")}`) 
            return
        }

        let responses = [
            `You have wished on the ${RoleName} banner. Congratulations! ${RoleName} came home. You have been granted the ${RoleName} role. If you still do not have your desired role, please contact <@435592949137539093>`,
        ] 

        if (member.roles.cache.some(role => role.name === RoleName)) {
           interaction.reply(`${member.user.username} already has the ${RoleName} role.`)
           return
        }
        
        const reply = await interaction.reply(responses[Math.floor(Math.random() * responses.length)].toString())

        const roleToAdd = interaction.guild?.roles.cache.find(role => role.name === RoleName)
        if(!roleToAdd) {
            interaction.reply(`Role ${RoleName} not found.`)
            return
        }

        await member.roles.add(roleToAdd)

      


    }
} as ICommand