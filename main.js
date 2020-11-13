const Discord = require('discord.js');

const client = new Discord.Client();

const fetch = require("node-fetch");

const prefix = 'bot ';

client.once('ready', () => { // lets the bot owner its online in the console
    console.log('Hello ready to go');
});

// some simple bot conversation interactions
client.on('message', message => { 
    if(message.content == "bot-hello")
        message.channel.send("Hello there")

    if(message.content == "bot-hello there")
        message.channel.send("General Kenobi")    
});

    

client.on('message', message => { // this block of code returns the named monster info

    // declares all the lists that displays for the monster info
let locationList = " \n";
let weaknessesList = "\n";
let resistanceList = "\n";
let rewardList = "\n";
let elementList = "\n";

    if (message.content.startsWith("monster-"))
    fetch('https://mhw-db.com/monsters')
    .then(response => response.json())
    .then(monsters => {

        let monsterName = message.content.substring(8);

        monsters.forEach(element => { 
            if (element.name.toLowerCase() == monsterName.toLowerCase()) {

                element.rewards.forEach(i => { //  populate the rewards array
                    rewardList += (i.item.name + "\n");
                });

                element.locations.forEach(i => { //  populate the locations array
                    locationList += (i.name + "\n");
                });

                element.elements.forEach(i => { //  populate the monster elements array
                    elementList += (i + "\n");
                });

                element.weaknesses.forEach(i => { //  populate the weaknesses array
                    weaknessesList += (i.element + " " + i.stars + "\n");
                });

                element.resistances.forEach(i => { //  populate the resistance array
                    resistanceList += (i.element + "\n");
                });

                message.channel.send(monsterName + 
                "\nmonster elements: " + elementList + // monster elements
                "\nlocations: " + locationList + // location
                "\nweaknesses: " + weaknessesList + // weaknesses
                "\nresistances: " + resistanceList + // resistances
                "\nrewards: " + rewardList); // rewards
                    
            };
        });
    });
});

client.login('NzY5MTA2NDUxMzIxOTc4ODgw.X5KMMw.3hOUcZXSrYZnVxHkGlt9cVi-qN0'); // the login password for the bot