const { KyotoAura } = require("./KyotoAura.js");
// const { kyotoArea } = require("../config.json")

class KyotoQueue extends KyotoAura {
 // static kyotoAreaID = kyotoArea;
  #kyotoQueue;
  defaultImg = "https://i.imgur.com/ukQH1Bd.jpeg";

  getKyotoQueue() {
    return this.#kyotoQueue;
  }
  async setQueue(value) {
    this.#kyotoQueue = await value;
  }

  constructor(interaction) {
    super(interaction);
    this.setQueue(this.getDistube().getQueue(this.getGuildId()));
   // console.log(this.#kyotoQueue) // undefined = no queue
  }

  queueStatus() {
    if (!this.#kyotoQueue) {
      return "Nenhuma música no ar!";
    }

    const song = this.#kyotoQueue.songs[0];
    return `**Tocando agora:** \n[${song.name}](${song.url})**`;
  }

  queueTemplate() {
    if (!this.#kyotoQueue) {
      return "Fila Vazia";
    }
    
    return (
      `**Na fila**\n${
        this.#kyotoQueue.songs
          .slice(1, 10)
          .map(
            (song, i) =>
              `**${i + 1}.** \`${song.formattedDuration}\` [${song.name}](${song.url}) • <@${song.user?.id ?? "Desconhecido"}>`,
          )
          .join("\n") || "Fila vazia"
      }`
    );
  }

  isLooping() {
    if (!this.#kyotoQueue) {
      return "❌"
    }

    return `${
      this.#kyotoQueue.repeatMode === RepeatMode.QUEUE
        ? "Fila"
        : this.#kyotoQueue.repeatMode === RepeatMode.SONG
          ? "Música"
          : "Desligado"
    }`;
  }

  isPaused() {
    if (!this.#kyotoQueue) {
      return "❌"
    }

    return `${this.#kyotoQueue.isPaused() ? "✅" : "❌"}`;
  }

  queueCount() {
    if (!this.#kyotoQueue) {
      return "0"
    }

    return `${this.#kyotoQueue.songs.length - 1}`;
  }

  currentPhotoSong() {
    if (this.#kyotoQueue === undefined) {
      return this.defaultImg;
    }
    const song = this.#kyotoQueue.songs[0];

    return song.thumbnail;
  }
}

module.exports = { KyotoQueue }