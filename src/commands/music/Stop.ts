import { Main } from "./../../index";
import { Command, CommandMessage, Description } from "@typeit/discord";
import { EmbedGenerator } from "../../helpers/EmbedGenerator";

export default abstract class Stop {
  @Command()
  @Description("Stops music playback")
  async stop(command: CommandMessage) {
    if (!command.member?.voice.channel) {
      command.channel.send(
        EmbedGenerator.errorEmbed("Error", "You are not in a voice channel.")
      );
      return;
    }

    if (Main.Queue.get(command.guild.id) == undefined) {
      command.channel.send(
        EmbedGenerator.errorEmbed(
          "Error",
          "There is no music being played back at the moment."
        )
      );
      return;
    }

    Main.Queue.get(command.guild.id).connection.dispatcher.end();
    Main.Queue.get(command.guild.id).connection.disconnect();
    Main.Queue.delete(command.guild.id);
  }
}
