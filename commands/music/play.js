const {
  SlashCommandBuilder,
  PermissionsBitField,
  EmbedBuilder,
} = require("discord.js");

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
    const me = interaction.guild.members.me;
    const currentVoiceChannel = interaction.guild.members.me.voice.channel;

    // Caso o usuário não esteja em um canal de voz
    if (!memberVoiceChannel) {
      return await interaction.reply(
        "Você precisa estar em uma call para tocar alguma música",
      );
    }

    // Verifica se o bot tem a permissão para acessar o canal de voz
    if (
      !memberVoiceChannel
        .permissionsFor(me)
        .has(PermissionsBitField.Flags.Connect)
    ) {
      return await interaction.reply(
        "Não tenho permissão para conectar na call",
      );
    }

    if (
      !memberVoiceChannel
        .permissionsFor(me)
        .has(PermissionsBitField.Flags.Speak)
    ) {
      return await interaction.reply("Não tenho permissão para falar na call!");
    }

    // Verifica se ele mesmo já está em algum canal de voz
    if (currentVoiceChannel && currentVoiceChannel !== memberVoiceChannel) {
      return await interaction.reply(
        "Já estou em uma call atualmente. Aguarde!",
      );
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
      return interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setTitle("Erro ao tocar a música")
            .setDescription(`A música solicitada não foi encontrada.`),
        ],
      });
    }
  },
};
