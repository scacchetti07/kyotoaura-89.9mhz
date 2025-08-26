const { ButtonBuilder, ActionRowBuilder, ButtonStyle } = require ("discord.js");

function playerButtons() {
  const playpauseButton = new ButtonBuilder()
    .setCustomId("playpause-button")
    .setStyle(ButtonStyle.Secondary)
    .setLabel("⏯️");
  const skipButton = new ButtonBuilder()
    .setCustomId("skip-button")
    .setStyle(ButtonStyle.Secondary)
    .setLabel("⏭️");
  const prevButton = new ButtonBuilder()
    .setCustomId("prev-button")
    .setStyle(ButtonStyle.Secondary)
    .setLabel("⏮️");
  const stopButton = new ButtonBuilder()
    .setCustomId("stop-button")
    .setStyle(ButtonStyle.Secondary)
    .setLabel("⏹️");
  const loopButton = new ButtonBuilder()
    .setCustomId("loop-button")
    .setStyle(ButtonStyle.Secondary)
    .setLabel("🔁");

  const shuffleButton = new ButtonBuilder()
    .setCustomId("shuffle-button")
    .setStyle(ButtonStyle.Secondary)
    .setLabel("🔀");

  const player = new ActionRowBuilder().addComponents(
    playpauseButton,
    stopButton,
    skipButton,
    loopButton,
    shuffleButton,
  );

  return player;
}

module.exports = { playerButtons }
