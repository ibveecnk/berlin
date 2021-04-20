import { Command, CommandMessage, Description } from "@typeit/discord";
const { MessageEmbed } = require("discord.js");

export default abstract class Ping {
  @Command()
  @Description("Tests if the bot is working")
  async ping(command: CommandMessage) {
    const embed = new MessageEmbed()
      .setTitle("🏓 Pong")
      .setColor(0x00ff00)
      .setDescription("These are the bots' current latencies")
      .addField("Ping Latency", `${Date.now() - command.createdTimestamp}ms`)
      .addField("WS API Latency", `${Math.round(command.client.ws.ping)}ms`);
    command.channel.send(embed);
  }
}
