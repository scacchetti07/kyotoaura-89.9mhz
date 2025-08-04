const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "disconnect",
  async execute(queue) {
    const embed = new EmbedBuilder()
      .setColor("Red")
      .setDescription(`Eu fui expulso da call 😣`)
      .setTimestamp();

    queue.textChannel.send({ embeds: [embed] }).catch(console.error);
  },
};
