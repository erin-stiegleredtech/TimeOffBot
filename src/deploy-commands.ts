import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import config from "./config";
import * as commandModules from "./commands";


type Commands = {
    data: unknown
}

const commands = [];

for (const module of Object.values<Commands>(commandModules)) {
    commands.push(module.data)
}


const rest = new REST({version: '9'}).setToken(config.DISCORD_TOKEN)

rest.put(Routes.applicationGuildCommands(config.CLIENT_ID, config.GUILD_ID), {body: commands}). then(()=> {
    console.log("Successfully registered bot commands")
}).catch(console.error);
