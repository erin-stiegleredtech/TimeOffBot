import { Client, Interaction } from "discord.js";
import config from "./config";
import * as commandModules from './commands';

const commands = Object(commandModules);

export const client = new Client({
  intents: ["Guilds", "GuildMessages", "DirectMessages"],
});

client.once("ready", () => {
  console.log("Discord bot ready!");
});

client.on("interactionCreate", async (interaction: Interaction)=> {
  if (!interaction.isCommand()) {
    return;
  }
  const { commandName } = interaction;
  commands[commandName].execute(interaction, client)
});

client.login(config.DISCORD_TOKEN);

