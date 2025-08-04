const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Encerre o player de música"),
  async execute(interaction) {
    const distube = interaction.client.distube;

    // Variáveis de identificação
    const memberVoiceChannel = interaction.member.voice.channel;
    const me = interaction.guild.members.me;
    const currentVoiceChannel = interaction.guild.members.me.voice.channel;

    // Caso o usuário não esteja em um canal de voz
    if (!memberVoiceChannel) {
      return await interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setDescription(
              "Você precisa entrar em alguma call pra usar esse comando",
            ),
        ],
      });
    }

    // Verifica se ele mesmo já está em algum canal de voz
    if (currentVoiceChannel && currentVoiceChannel !== memberVoiceChannel) {
      return await interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setDescription(
              "Você precisa entrar na call pra terminar o player",
            ),
        ],
      });
    }
    // Defer a resposta para evitar timeout
    await interaction.deferReply();

    await distube.stop(interaction.guild.id);
    return await interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setColor("DarkVividPink")
          .setDescription("❌ Player encerrado."),
      ],
    });
  },
};
