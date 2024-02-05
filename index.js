const Discord = require("discord.js");
const nsfwBot = require("./handler/Client.js");
const client = new nsfwBot();
const config = require('./config.json');
require("discord-buttons")(client);
require("./handler/Module.js")(client);
require("./handler/Event.js")(client);

client.on("warn", console.warn);
client.on("error", console.error);

// Initial activities
const activities = [
    { name: "25 servers", type: "PLAYING" },
    { name: "Naitik.exe_", type: "WATCHING" }
];

let currentActivityIndex = 0;

client.once("ready", () => {
    console.log('Bot is ready!');

    // Set the initial activity status
    setActivity();

    // Switch between activities every 10 seconds (adjust the interval as needed)
    setInterval(() => {
        currentActivityIndex = (currentActivityIndex + 1) % activities.length;
        setActivity();
    }, 10000);
});

function setActivity() {
    const activity = activities[currentActivityIndex];
    client.user.setActivity(activity.name, { type: activity.type })
        .catch(console.error);
}

client.login(config.token).catch(console.error);
