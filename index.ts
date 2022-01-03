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
    },{
        name: 'Economy',
        emoji: '💸'
    }])
    
})


const CurrencySystem = require('currency-system')
const cs = new CurrencySystem;

CurrencySystem.cs
    .on('debug', (debug, error) => {
        console.log(debug);
        if (error) console.error(error);
    })
    .on('userFetch', (user, functionName) => {
        console.log(`( ${functionName} ) Fetched User:  ${client?.users?.cache?.get(user?.userID).tag}`); //@ts-ignore
    })
    .on('userUpdate', (oldData, newData) => {
        console.log('User Updated: ' + client.users.cache.get(newData.userID).tag); //@ts-ignore
    });

    cs.setMongoURL(config.mongoString);
    cs.setDefaultBankAmount(1000);
    cs.setDefaultWalletAmount(1000)










export { cs }










client.login(config.token)