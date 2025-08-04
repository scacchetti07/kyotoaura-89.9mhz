const {
  SlashCommandBuilder,
  PermissionsBitField,
  EmbedBuilder,
} = require("discord.js");
const { RepeatMode } = require("distube");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("np")
    .setDescription("Veja a música atual"),
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
            .setDescription("Você precisa entrar na call pra ver o player"),
        ],
      });
    }

    // Defer a resposta para evitar timeout
    await interaction.deferReply();

    const queue = await distube.getQueue(interaction);
    const currSong = queue.songs[0];
    return await interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setColor("Purple")
          .setAuthor({
            name: "KyotoAura 89.9mhz",
            iconURL: "https://i.imgur.com/sHInGV5.jpeg",
          })
          .setTitle(`Tocando Agora`)
          .setDescription(
            `\`${currSong.name}\`\n\nPróxima a tocar:  \'${queue.songs[1]}\'`,
          )
          .addFields(
            {
              name: "Tempo Atual",
              value: `${queue.formattedCurrentTime} ▶️ ────────────────────── | ${currSong.formattedDuration}`,
              inline: true,
            },
            {
              name: "Loop:",
              value: `${
                queue.repeatMode === RepeatMode.QUEUE
                  ? "✅📋"
                  : queue.repeatMode === RepeatMode.SONG
                    ? "✅🎵"
                    : "Desligado"
              }`,
              inline: true,
            },
          )
          .setThumbnail(currSong.thumbnail),
      ],
    });
  },
};
