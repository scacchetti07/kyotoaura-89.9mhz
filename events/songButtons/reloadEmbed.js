const { Events, EmbedBuilder } = require("discord.js");
const { playSong } = require("../../controller/playSong.js");

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (message.author.bot || message.channel.name !== "🎸-kyoto-songs") return;
    const song = message.content;

    message.delete();
    await playSong(song, message);
  },
};
