const { REST, Routes } = require("discord.js");
const { clientId, guildId, token } = require("./config.json");
const fs = require("node:fs");
const path = require("node:path");

const commands = [];
// Grab all the command folders from the commands directory you created earlier
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  // Grab all the command files from the commands directory you created earlier
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      commands.push(command.data.toJSON());
    } else {
      console.log(
        `[WARNING] o comando em ${filePath} está faltando as propriedades obrigatórias "data" ou "execute"`,
      );
    }
  }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
  try {
    console.log(`Atualizando os ${commands.length} slash commands (/) do bot.`);

    // Deploy commands to a specific guild for faster testing (appears instantly)
    // Use Routes.applicationGuildCommands for guild-specific commands
    // Use Routes.applicationCommands for global commands (takes up to 1 hour)
    // let data = "";
    guildId.forEach(async (id) => {
      await rest.put(Routes.applicationGuildCommands(clientId, id), {
        body: commands,
      });
    });

    console.log(`Atualizado com Sucesso os slash commands (/) no server.`);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
