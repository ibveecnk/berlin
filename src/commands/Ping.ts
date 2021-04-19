import { Command, CommandMessage, Description } from "@typeit/discord";

export default abstract class Ping {
  @Command()
  @Description("Tests if the bot is working")
  async ping(command: CommandMessage) {
    command.channel.send(
      `\`\`\`Ping Latency is ${
        Date.now() - command.createdTimestamp
      }ms.\nAPI Latency is ${Math.round(command.client.ws.ping)}ms\`\`\``
    );
  }
}
