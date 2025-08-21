const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChannelType,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const { errorEmbed } = require("../../helpers/errorEmbedMessage.js");
const { ActionRowBuilder } = require("@discordjs/builders");
const {
  createStartMessage,
} = require("../../helpers/starterChannelMessage.js");
const { KyotoQueue } = require("../../models/KyotoQueue.js");
const { writingJson } = require("../../helpers/writingOnJson.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("create")
    .setDescription("Crie o sua área exclusivas de músicas do kyoto-aura"),
  async execute(interaction) {
    const guild = interaction.guild;

    // Fazer por IDs e armazenar no json como se fosse array para lembrar dos canais
    const channel = await guild.channels
      .fetch()
      .then((channels) => channels.find((c) => c.name === "🎸-kyoto-songs"));

    if (channel || KyotoQueue.kyotoAreaID) {
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setTitle("Área já criada!")
            .setDescription(
              "A área de músicas do kyoto aura **já foi criado**.\nNão é possível ter o mesmo canal duas vezes!",
            ),
        ],
      });
    }

    try {
      const redirectButton = new ButtonBuilder()
        .setCustomId("kyoto-channel")
        .setLabel("Acesse o chat")
        .setStyle(ButtonStyle.Primary);

      const actionRow = new ActionRowBuilder().addComponents(redirectButton);

      const area = await guild.channels.create({
        name: "🎸 kyoto-songs",
        type: ChannelType.GuildText,
        topic: "Área exclusiva para tocar as suas músicas ",
      });

      createStartMessage(area);
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Purple")
            .setTitle("Canal exclusivo criado!")
            .setDescription("A sua área de músicas foi criada com sucesso!"),
        ],
        components: [actionRow],
      });
    } catch (error) {
      console.error(error);
      return interaction.reply(errorEmbed(interaction));
    }
  },
};
