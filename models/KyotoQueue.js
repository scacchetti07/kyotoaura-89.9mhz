const { RepeatMode } = require("distube");
const { clientId } = require("../config.json");

class KyotoQueue {
  static msgId
  static kyotoChatId
  song
  queue

  constructor(queue, song) {
    this.song = song;
    this.queue = queue;
  }

  queueTemplate() {
  if (!this.queue) {
    return "Fila Vazia";
  }

  return `**Na fila**\n${
    this.queue.songs
      .slice(1, 10)
      .map(
        (song, i) =>
          `**${i + 1}.** \`${song.formattedDuration}\` [${song.name}](${this.song.url}) • <@${song.user?.id ?? "Desconhecido"}>`,
      )
      .join("\n") || "Fila vazia"
  }`;
}

  queueStatus() {
    if (this.song) return `${this.song.name}`;
    return "Nenhuma música no ar!";
  }

  queueCount() {
    if (this.queue) return this.queue.songs.length;
    return "0";
  }

  loopingStatus() {
    if (!this.queue) {
      return "Desligado";
    }

    return this.queue.repeatMode === RepeatMode.QUEUE
      ? "Fila"
      : this.queue.repeatMode === RepeatMode.SONG
        ? "Música"
        : "Desligado";
  }

  isPaused() {
    if (!this.queue) {
      return "Não";
    }
    return this.queue.isPaused() ? "Sim" : "Não";
  }

  songPicture() {
    if (!this.song) {
      return "https://i.imgur.com/PFSSpXs.jpeg";
    }
    return this.song.thumbnail;
  }

  static setMessageId(id) {
    KyotoQueue.msgId = id;
  }

}

module.exports = { KyotoQueue };
