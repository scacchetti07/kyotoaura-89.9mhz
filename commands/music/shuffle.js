const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { default: DisTube } = require("distube");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shuffle")
    .setDescription("Coloque a sua fila atual em modo aleatório"),
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

    if (!me) {
      return await interaction.reply(
        "Eu devo em estar em uma call para usar este comando!",
      );
    }

    // Verifica se ele mesmo já está em algum canal de voz
    if (currentVoiceChannel && currentVoiceChannel !== memberVoiceChannel) {
      return await interaction.reply(
        "Já estou em uma call atualmente. Aguarde!",
      );
    }

    // await interaction.deferReply();
    try {
      const newQueue = await distube.shuffle(interaction);
      await distube.queues.remove(interaction);
      await distube.queues.add(interaction, newQueue);
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Purple")
            .setDescription("🔀 O modo aleatório está ligado!")
            .setFooter({
              text: `${interaction.member.user.username}`,
              iconURL: `${interaction.member.user.avatarURL()}`,
            })
            .setTimestamp(),
        ],
      });
    } catch (error) {
      console.error(error);
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setDescription(`Ocorreu um erro ao executar o comando.`),
        ],
      });
    }
  },
};
