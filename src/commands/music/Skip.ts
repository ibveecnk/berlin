import { Main } from "./../../index";
import { Command, CommandMessage, Description } from "@typeit/discord";
import { EmbedGenerator } from "../../helpers/EmbedGenerator";

// Maybe at some point add a "democratic" voteskip system overridable by admins

export default abstract class Skip {
  @Command()
  @Description("Skips a track")
  async skip(command: CommandMessage) {
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

    Main.Queue.get(command.guild.id).connection.dispatcher.emit("finish");
  }
}
