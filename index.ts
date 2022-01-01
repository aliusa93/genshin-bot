import Discord, { Intents } from 'discord.js'
import WOKCommands from 'wokcommands'
import path from 'path'
import config from './config.json'

const client = new Discord.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
})

client.on('ready', () => {
    console.log(`${client.user?.tag}`)

    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        featuresDir: path.join(__dirname, 'events'),
        typeScript: true,
        testServers: ['885271606484680725'],
        showWarns: true,
        debug: true,
        ephemeral: true,
        botOwners: '435592949137539093',
        disabledDefaultCommands: [
            'help'
        ],
        mongoUri: config.mongoString,
    })
    .setDefaultPrefix('gb!')
    .setCategorySettings([{
        name: 'Testing',
        emoji: '🔨'
    }, {
        name: 'Moderation',
        emoji: '👮‍♂️'
    },{
        name: 'Fun',
        emoji: '🎉'
    }, {
        name: 'Utility',
        emoji: '🛠️'
    }])
    
})



















client.login(config.token)