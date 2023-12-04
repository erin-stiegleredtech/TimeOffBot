import {
  ActionRowBuilder,
  Client,
  CommandInteraction,
  ModalBuilder,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
  ModalActionRowComponentBuilder,
  Events,
} from "discord.js";
import { createTimeOff } from "../firebase";
import { validateDate } from "../utils/dateValidation";

export const data = new SlashCommandBuilder()
  .setName("ooo")
  .setDescription("Adds your OOO days to schedule");

export async function execute(interaction: CommandInteraction, client: Client) {
  const modal = new ModalBuilder().setCustomId("myModal").setTitle("My Modal");

  const dateInput = new TextInputBuilder()
    .setCustomId("dateInput")
    .setLabel("What day will you be OOO (MM/DD/YYYY?")
    .setStyle(TextInputStyle.Short);

  const firstActionRow =
    new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
      dateInput
    );

  modal.addComponents(firstActionRow);

  await interaction.showModal(modal);

  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isModalSubmit()) return;
    const { user } = interaction;

    const dateValue = interaction.fields.getTextInputValue("dateInput");
    const isValidDate = validateDate(dateValue);

    if (!isValidDate && interaction.customId === "myModal") {
      const currentMonth = new Date().getMonth() + 1;
      const currentDay = new Date().getDate();
      const currentYear = new Date().getFullYear();

      const currentDate = `${currentMonth}/${currentDay}/${currentYear}`;

      //TODO: An unknown interaction error occurs when this command is used more than once.
      //Most likely due to the app needing to respond to the interaction within 3 seconds, otherwise the interaction is ended by discord and error is thrown.

      await interaction.reply({
        content: `${dateValue} is an invalid date! Please check formatting(MM/DD/YYYY) and that the date occurs after ${currentDate}`,
      });
    } else {
      await createTimeOff(user.displayName, dateValue);
      if (interaction.customId === "myModal") {
        await interaction.reply({ content: "You're good!" });
      }
    }
  });
}
