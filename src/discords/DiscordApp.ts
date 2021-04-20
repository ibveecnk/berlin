import {
  CommandNotFound,
  Discord,
  CommandMessage,
  On,
  ArgsOf,
} from "@typeit/discord";
import * as Path from "path";

@Discord("-", {
  import: [Path.join(__dirname, "..", "commands", "*.ts")],
})
export class DiscordApp {
  /*
  @On("message")
  onMessage([message]: ArgsOf<"message">, client: Client) {
    // Maybe handle message at some point
  }
  */
  @On("ready")
  initialize(): void {
    console.log("Bot logged in");
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
