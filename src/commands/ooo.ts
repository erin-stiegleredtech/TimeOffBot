import {
  ActionRowBuilder,
  ChannelType,
  Client,
  CommandInteraction,
  ModalBuilder,
  SlashCommandBuilder,
  TextInputBuilder,
  MessageActionRowComponent,
  TextInputComponent,
  ModalActionRowComponent,
  TextInputStyle,
  ModalActionRowComponentBuilder,
  Events,
} from "discord.js";
import { createTimeOff } from "../firebase";

export const data = new SlashCommandBuilder()
  .setName("ooo")
  .setDescription("Adds your OOO days to schedule");

export async function execute(interaction: CommandInteraction, client: Client) {
  const modal = new ModalBuilder()
  .setCustomId('myModal')
  .setTitle('My Modal');

  const favoriteColorInput = new TextInputBuilder()
  .setCustomId('favoriteColorInput')
    // The label is the prompt the user sees for this input
  .setLabel("What's your favorite color?")
    // Short means only a single line of text
  .setStyle(TextInputStyle.Short);

const hobbiesInput = new TextInputBuilder()
  .setCustomId('hobbiesInput')
  .setLabel("What's some of your favorite hobbies?")
    // Paragraph means multiple lines of text.
  .setStyle(TextInputStyle.Paragraph);

// An action row only holds one text input,
// so you need one action row per text input.
const firstActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(favoriteColorInput);
const secondActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(hobbiesInput);

// Add inputs to the modal
modal.addComponents(firstActionRow, secondActionRow);

// Show the modal to the user
await interaction.showModal(modal);

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isModalSubmit()) return;

	// Get the data entered by the user
	const favoriteColor = interaction.fields.getTextInputValue('favoriteColorInput');
	const hobbies = interaction.fields.getTextInputValue('hobbiesInput');
	console.log({ favoriteColor, hobbies });
  if(interaction.customId === 'myModal') {
    await interaction.reply({content:"You're good!"})
  }
});


};


