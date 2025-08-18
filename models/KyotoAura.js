export class KyotoAura {
  #distube;
  #guildId;

  getDistube() {
    return this.#distube;
  }

  setDistube(value) {
    this.#distube = value;
  }

  getGuildId() {
    return this.#guildId;
  }

  setGuildId(value) {
    this.#guildId = value;
  }

  constructor(interaction) {
    this.#distube = interaction.client.distube;
    this.#guildId = interaction.guild.id;
  }
}
