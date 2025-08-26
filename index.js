// Require the necessary discord.js classes
const fs = require("node:fs");
const path = require("node:path");
const {
  Client,
  Events,
  GatewayIntentBits,
  MessageFlags,
  Collection,
} = require("discord.js");
const { token, prefix } = require("./config.json");
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { YouTubePlugin } = require("@distube/youtube");

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
}); // Ler mais sobre: https://discordjs.guide/popular-topics/intents.html#privileged-intents

client.commands = new Collection(); // Collection = Dicitionary (ou map em JS)
client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  plugins: [
    new SpotifyPlugin(),
    new YouTubePlugin({
      ytdlOptions: {
        filter: "audioonly",
        quality: "highestaudio",
        highWaterMark: 1 << 25,
        dlChunkSize: 0,
      },
    }),
  ],
});

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js") || file.endsWith(".cjs"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Adiciona um novo item na coleção com a chave que é nome do comando e o valor sendo o seu modulo exportado.
    if (!("data" in command && "execute" in command)) {
      console.log(
        `[WARNING] o comando em ${filePath} está faltando as propriedades obrigatórias "data" ou "execute".`,
      );
      return;
    }
    client.commands.set(command.data.name, command);
  }
}

const eventsFoldersPath = path.join(__dirname, "events");
const eventsFolders = fs.readdirSync(eventsFoldersPath);
const distubeEvents = [
  "playSong",
  "addSong",
  "stop",
  "skip",
  "addList",
  "playList",
  "searchResult",
  "searchCancel",
  "searchInvalidAnswer",
  "searchNoResult",
  "error",
  "empty",
  "finish",
  "disconnect",
];

for (const folder of eventsFolders) {
  const eventsPath = path.join(eventsFoldersPath, folder);
  const eventsFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js") || file.endsWith(".cjs"));
  for (const file of eventsFiles) {
    const eventFilePath = path.join(eventsPath, file);
    const event = require(eventFilePath);

    if (distubeEvents.includes(event.name)) {
      client.distube.on(event.name, (...args) => event.execute(...args));
      console.log(`[DisTube Event] ${event.name} carregado`);
      continue;
    }

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
    console.log(`[Discord Event] ${event.name} carregado`);
  }
}

// Log in to Discord with your client's token
client.login(token);
