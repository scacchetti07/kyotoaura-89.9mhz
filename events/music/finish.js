const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "finish",
  async execute(queue) {
    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle("Playlist Vazia")
      .setDescription(
        "Não tenho mais músicas na fila 😥\nAdicione algumas usando \`/play\`",
      );

    queue.textChannel.send({ embeds: [embed] }).catch(console.error);
  },
};
