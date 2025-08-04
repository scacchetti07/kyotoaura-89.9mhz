const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "finish",
  async execute(queue) {
    const embed = new EmbedBuilder()
      .setColor("Purple")
      .setTitle("Playlist Vazia")
      .setDescription(
        "Não tenho mais músicas para tocar :(\nAdicione algume usando \`/play\`",
      );

    queue.textChannel.send({ embeds: [embed] }).catch(console.error);
  },
};
