const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const { checkVoicePresence } = require("../../helpers/checkVoicePresence.js");
const { errorEmbed } = require("../../helpers/errorEmbedMessage.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Toque uma Música!")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("Insira o nome da música ou seu URL")
        .setRequired(true),
    ),
  async execute(interaction) {
    const distube = interaction.client.distube; // Recebe o distube instanciado em index.js

    // Get the song query from the user input
    const query = interaction.options.getString("input", true);

    // Variáveis de identificação
    const memberVoiceChannel = interaction.member.voice.channel;

    const errorVoiceObj = checkVoicePresence(interaction);
    if (errorVoiceObj.error) {
      return errorEmbed(interaction, errorVoiceObj.msg);
    }

    // Defer a resposta para evitar timeout
    await interaction.deferReply();
    try {
      distube.play(memberVoiceChannel, query, {
        textChannel: interaction.channel,
        member: interaction.member,
        metadata: { interaction },
      });
      return interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setColor("Green")
            .setDescription(`🔍 Buscando a música...`),
        ],
      });
    } catch (err) {
      console.error(err);
      return errorEmbed(interaction, "A música solicitada não foi encontrada.");
    }
  },
};
