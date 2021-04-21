import { Command, CommandMessage, Description } from "@typeit/discord";
import { EmbedGenerator } from "../../helpers/EmbedGenerator";
const { MessageEmbed } = require("discord.js");

export default abstract class Ping {
  @Command()
  @Description("Tests if the bot is working")
  async ping(command: CommandMessage) {
    command.channel.send(
      EmbedGenerator.successEmbed(
        "🏓 Pong",
        "These are the bots' current latencies",
        [
          {
            key: "Ping Latency",
            value: `${Date.now() - command.createdTimestamp}ms`,
          },
          {
            key: "WS API Latency",
            value: `${Math.round(command.client.ws.ping)}ms`,
          },
        ]
      )
    );
  }
}
