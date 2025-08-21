const {
  ContainerBuilder,
  MessageFlags,
  StringSelectMenuBuilder,
  Events,
  StringSelectMenuOptionBuilder,
} = require("discord.js");
const { errorEmbed } = require("../../helpers/errorEmbedMessage.js");
const { checkPresence } = require("../../helpers/checkPresence.js");
const { ActionRowBuilder } = require("@discordjs/builders");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    const myId = "loop-button";
    if (!interaction.isButton() || interaction.customId !== myId) return;

    const distube = interaction.client.distube;
    const currQueue = distube.getQueue(interaction);
    const errorObj = checkPresence(interaction);

    if (errorObj.error) {
      return interaction.reply({
        content: errorObj.msg,
        flags: MessageFlags.Ephemeral,
      });
    }

    if (!currQueue) {
      return interaction.reply({
        content: "A fila está vazia no momento",
        flags: MessageFlags.Ephemeral,
      });
    }

    try {
      const container = new StringSelectMenuBuilder()
        .setCustomId("loop-types")
        .setPlaceholder("Escolha um loop:")
        .addOptions(
          stringBuilder("Música", "Looping na música", "music"),
          stringBuilder("Fila", "Looping na fila toda", "queue"),
          stringBuilder("Desligado", "Desligue o looping atual", "off"),
        );

      const select = new ActionRowBuilder().addComponents(container);
      return interaction.reply({
        components: [select],
        flags: MessageFlags.Ephemeral,
      });
    } catch (error) {
      console.error(error);
      return interaction.reply({
        content: "A fila está vazia no momento",
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};

function stringBuilder(label, description, value) {
  return new StringSelectMenuOptionBuilder()
    .setLabel(label)
    .setDescription(description)
    .setValue(value);
}
