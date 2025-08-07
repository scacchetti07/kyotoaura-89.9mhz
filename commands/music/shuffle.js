const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { checkPresence } = require("../../helpers/checkPresence.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shuffle")
    .setDescription("Coloque a sua fila atual em modo aleatório"),
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

    // await interaction.deferReply();
    try {
      const newQueue = await distube.shuffle(interaction);
      await distube.queues.remove(interaction);
      await distube.queues.add(interaction, newQueue);
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Purple")
            .setDescription("🔀 A fila atual foi reorganizada aleatoriamente!")
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
