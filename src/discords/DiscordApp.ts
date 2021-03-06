import {
  CommandNotFound,
  Discord,
  CommandMessage,
  On,
  ArgsOf,
} from "@typeit/discord";
import * as Path from "path";
import { Main } from "../index";
const { version } = require("../../package.json");

const prefix = process.env.COMMDAND_PREFIX || "!";

@Discord(prefix, {
  import: [
    Path.join(__dirname, "..", "commands", "util", "*.js"),
    Path.join(__dirname, "..", "commands", "util", "*.ts"),
    /* Somehow youtube broke their API, so no music for now :(
    Path.join(__dirname, "..", "commands", "music", "*.ts"),
    Path.join(__dirname, "..", "commands", "music", "*.js"),
    */
  ],
})
export class DiscordApp {
  private _client = Main.Client;

  @On("ready")
  initialize(): void {
    console.log("Bot logged in");
    this._client.user.setPresence({
      activity: {
        name: `berlin v${version} on ${this._client.guilds.cache.size} servers`,
      },
    });
  }

  @On("messageDelete")
  messageDeleted([message]: ArgsOf<"messageDelete">): void {
    console.log(`${message.id}:${message.content} was deleted.`);
  }

  @On("guildMemberAdd")
  memberJoin([member]: ArgsOf<"guildMemberAdd">): void {
    console.log(
      `User : ${member.user.username} has joined the Discord Server.`
    );
  }

  @On("guildCreate")
  guildJoin([guild]: ArgsOf<"guildCreate">): void {
    console.log(`Bot added to the Discord Server : ${guild.name}`);
  }

  @CommandNotFound()
  notFound(command: CommandMessage) {
    command.reply("Command not found");
  }
}
