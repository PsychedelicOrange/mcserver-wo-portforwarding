const { Client, Intents, ClientUser } = require('discord.js');
require('dotenv').config();
const ngrok = require('ngrok');
var MinecraftServer = require ('minecraft-java-server');

var ip;
var is_server_on = false;
var is_debug_on = false;
// EDIT YOUR CUSTOM STUFF FROM HERE *******************************************
const command_prefix = "!";
const server = new MinecraftServer.MinecraftServer({
    jar: 'server.jar',
    path: 'server/', // replace with path to your server jar

    args: ['-Xms4G', '-Xmx4G'],

    // Minecraft's eula must be agreed to using this value
    eula: true,
    
    // every property is the equivalent of server.properties, except for vital ones
    properties: {
        motd: "Minecraft server hosted with minecraft-java-server",
        "max-players": 10,
        //"online-mode": false
    }
});
// EDIT YOUR CUSTOM STUFF TILL HERE *************************************************

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_PRESENCES]
  });

client.on("ready", () => {
    console.log("I am ready!");
    client.user?.setPresence({ activities: [{ name: '!help',type: 'LISTENING' }], status: 'idle' });// Commands
  });
//client.user?.setActivity('!help', { type: 'LISTENING' });

client.on('message', async message => {

    if (message.author.bot) return;
    if (!message.content.startsWith(command_prefix)) return;

    const commandBody = message.content.slice(command_prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    if (command === "debug") {
        if(!is_debug_on && !is_server_on)
        {
            await ngrok.authtoken(process.env.AUTH_TOKEN); 
	        ip = await ngrok.connect({proto: 'tcp', addr: 22});
	        message.reply('Server Started ! Join at ' + ip.slice(6));
            client.user?.setPresence({ activities: [{ name: "debug",type: 'PLAYING' }], status: 'dnd' });// Commands
            is_debug_on = true;
        }
    }
    if (command === "start") {
	if(is_server_on){
		message.reply('Server is already running');
	}else{
        if(!is_debug_on)
        {
	        await server.start();
            await ngrok.authtoken(process.env.AUTH_TOKEN); 
	        ip = await ngrok.connect({proto: 'tcp', addr: 25565});
	        message.reply('Server Started ! Join at ' + ip.slice(6));
            client.user?.setPresence({ activities: [{ name: ip.slice(6),type: 'PLAYING' }], status: 'online' });// Commands
            is_server_on = true;
        }
	}
    }
    else if (command === "stop") {
        if(is_server_on){
            if(!is_debug_on)
                {
                    server.stop();
                    ngrok.disconnect(ip);
                    message.reply('Server stopped !');
                    client.user?.setPresence({ activities: [{ name: '!help',type: 'LISTENING' }], status: 'idle' });// Commands
                    is_server_on = false;
                }
	}else{
		message.reply('No server was running');
	}
    }
    else if (command === "command")
    {
	if(is_server_on){
		java_command = args.slice(0);
        java_command = java_command.join(' ');
        server.send(java_command).then(response => {
		    message.reply(response);
	            console.log('Command result: ', response);
	        }).catch(err => console.log('Failed to run command', err));
	}else{
		message.reply('No server is running');
	}
    }
    else if(command === "help")
    {
	message.channel.send('All commands start with \'!\' .');
	message.channel.send('!start : starts the minecraft server \n!stop : stop the minecraft server \n!command <minecraft console command here> : runs command on server console and returns output ');
    }

});

// Login to Discord with your client's token
client.login(process.env.BOT_TOKEN);