const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Pule a música atual"),
  async execute(interaction) {
    const distube = interaction.client.distube;

    // Variáveis de identificação
    const memberVoiceChannel = interaction.member.voice.channel;
    const me = interaction.guild.members.me;
    const currentVoiceChannel = interaction.guild.members.me.voice.channel;

    // Caso o usuário não esteja em um canal de voz
    if (!memberVoiceChannel) {
      return await interaction.reply(
        "Você precisa estar em uma call para tocar alguma música",
      );
    }

    // Verifica se ele mesmo já está em algum canal de voz
    if (currentVoiceChannel && currentVoiceChannel !== memberVoiceChannel) {
      return await interaction.reply(
        "Já estou em uma call atualmente. Aguarde!",
      );
    }

    try {
      const newSong = await distube.skip(interaction);
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("DarkPurple")
            .setDescription(
              `Tocando a música [${newSong.name}](${newSong.url})`,
            ),
        ],
      });
    } catch (error) {
      console.error(error);
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Blurple")
            .setTitle("Erro")
            .setDescription(`Não foi possível pular a música atual.`),
        ],
      });
    }
  },
};
