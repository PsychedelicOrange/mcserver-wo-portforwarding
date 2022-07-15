## mcserver-wo-portforwarding
# About
Simple node package : A discord bot to host and control a minecraft server, all without port forwarding.

Usefull if your behind a NAT and your ISP doesnt allow port forwarding.

This was written as I wanted to host my own minecraft server on an old pc in my grandma's house.

## How it works
It uses [ngrok](https://ngrok.com/) to open a tcp endpoint visible to the public. All incoming traffic is forwarded to the minecraft port 25565.
# Installation
## Prerequisites
* Download and install [nodejs](https://nodejs.org/en/).
* Make an [ngrok](https://ngrok.com/) account (It's free).
* Setup a basic discord bot. [Tutorial part1](https://github.com/discordjs/guide/blob/main/guide/preparations/setting-up-a-bot-application.md) , [part2](https://github.com/discordjs/guide/blob/main/guide/preparations/adding-your-bot-to-servers.md).
   > ! Enable Privileged Gateway Intents for your bot !
* Download your minecraft server jar.

## First time setup
* git clone / Download this repository.
* In the project directory run
  ``` bash
  npm install .
  ```
* Make a .env file containing your tokens
  > .env
    ``` 
    AUTH_TOKEN = YOUR_NGROK_AUTH_TOKEN_HERE
    BOT_TOKEN = YOUR_DISCORD_BOT_TOKEN_HERE
    ```
* Edit the index.js to include path to your server jar
    ```javascript
    11  jar: 'server.jar',
    12  path: 'server/', // replace with path to your server jar
    ```

# Usage
Run the bot using 
  ``` bash
  node index.js
  ``` 
## Bot Commands

* !start : Starts the minecraft server and replies with the IP:PORT.
* !stop : Stops the minecraft server.
* !help : Displays help
* !command \<Minecraft Command\> : Executes \<Minecraft Command\> on the server and replies with output.  
# Node modules used
This project was originally written as a bunch of bash scripts and a discord bot which would execute them. Recently I discovered that I could use node modules to have it all in node, also making it platform independent. 
* [minecraft-java-server](https://github.com/joaisa17/minecraft-java-server)
* [ngrok](https://github.com/bubenshchykov/ngrok)
* [discord.js](https://github.com/discordjs/discord.js)