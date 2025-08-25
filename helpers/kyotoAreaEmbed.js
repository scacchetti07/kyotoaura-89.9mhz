const { EmbedBuilder } = require("discord.js");
const { RepeatMode } = require("distube");
const { KyotoQueue } = require("../models/KyotoQueue")

function kyotoEmbed(queue = undefined, song = undefined) {
  const kyoto = new KyotoQueue(queue, song)
  return new EmbedBuilder()
    .setColor("Purple")
    .setTitle(kyoto.queueStatus(song))
    .setDescription(kyoto.queueTemplate(queue))
    .addFields(
      {
        name: "Looping",
        value: `${kyoto.loopingStatus()}`,
        inline: true,
      },
      {
        name: "Pausado",
        value: `${kyoto.isPaused(queue)}`,
        inline: true,
      },
      {
        name: "Total",
        value: `${kyoto.queueCount(queue)}`,
        inline: true,
      },
    )
    .setImage(kyoto.songPicture(song));
}

function queueTemplate(queue) {
  if (!queue) {
    return "Fila Vazia";
  }

  return `**Na fila**\n${
    queue.songs
      .slice(1, 10)
      .map(
        (song, i) =>
          `**${i + 1}.** \`${song.formattedDuration}\` [${song.name}](${song.url}) • <@${song.user?.id ?? "Desconhecido"}>`,
      )
      .join("\n") || "Fila vazia"
  }`;
}

function queueStatus(song) {
  if (song) return `${song.name}`;
  return "Nenhuma música no ar!";
}

function queueCount(queue) {
  if (queue) return queue.songs.length;
  return "0";
}

function loopingStatus(queue) {
  if (!queue) {
    return "Desligado";
  }

  return queue.repeatMode === RepeatMode.QUEUE
    ? "Fila"
    : queue.repeatMode === RepeatMode.SONG
      ? "Música"
      : "Desligado";
}

function isPaused(queue) {
  if (!queue) {
    return "Não";
  }
  return queue.isPaused() ? "Sim" : "Não";
}

function songPicture(song) {
  if (!song) {
    return "https://i.imgur.com/PFSSpXs.jpeg";
  }
  return song.thumbnail;
}
module.exports = { kyotoEmbed };
