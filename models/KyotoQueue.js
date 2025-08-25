class KyotoQueue {
  static msgId
  static kyotoChatId
  song
  queue

  constructor(queue, song) {
    this.song = song;
    this.queue = queue;
  }

  queueTemplate(queue) {
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

queueStatus(song) {
  if (song) return `${song.name}`;
  return "Nenhuma música no ar!";
}

queueCount(queue) {
  if (queue) return queue.songs.length;
  return "0";
}

loopingStatus(queue) {
  if (!queue) {
    return "Desligado";
  }

  return queue.repeatMode === RepeatMode.QUEUE
    ? "Fila"
    : queue.repeatMode === RepeatMode.SONG
      ? "Música"
      : "Desligado";
}

isPaused(queue) {
  if (!queue) {
    return "Não";
  }
  return queue.isPaused() ? "Sim" : "Não";
}

songPicture(song) {
  if (!song) {
    return "https://i.imgur.com/PFSSpXs.jpeg";
  }
  return song.thumbnail;
}
}

module.exports = { KyotoQueue };
