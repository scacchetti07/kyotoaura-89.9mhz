const {
  SlashCommandBuilder,
  PermissionsBitField,
  EmbedBuilder,
} = require("discord.js");
const { RepeatMode } = require("distube");
const { checkPresence } = require("../../helpers/checkPresence.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("np")
    .setDescription("Veja a música atual"),
  async execute(interaction) {
    const distube = interaction.client.distube;

    const errorObj = checkPresence(interaction);
    if (errorObj.error) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setTitle("Um erro ocorreu")
            .setDescription(errorObj.msg),
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
