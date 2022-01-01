import { ICommand } from "wokcommands";

export default {
    aliases: ["clear"],
    description: "Delets message with amount, or clears the WHOLE CHANNEL",
    permissions: ["MANAGE_MESSAGES"],
    maxArgs: 1,
    expectedArgs: '[amount]',
    slash: 'both',
    category: 'Utilities',
    testOnly: true,
    callback: async ({ message, interaction, channel, args }) => {
       const amount = args.length ? parseInt(args.shift()!) : 10;
       if(message) {
           await message.delete()
       }

       //Bulk delete
    // const { size } =  await channel.bulkDelete(amount, true)

    const messages = await channel.messages.fetch({ limit: amount })
    const { size } = messages

    messages.forEach((message) => message.delete())

      //Fetch and then delete messages
      const reply = `Deleted ${size} message(s).`
      if(interaction) {
          return reply
      }

      channel.send(reply)


    }
} as ICommand;