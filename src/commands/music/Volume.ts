import { Main } from "./../../index";
import { Command, CommandMessage, Description } from "@typeit/discord";
import { EmbedGenerator } from "../../helpers/EmbedGenerator";

export default abstract class Volume {
  @Command()
  @Description("Changes volume")
  async volume(command: CommandMessage) {
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

    try {
      const volume = Number(command.commandContent.split(" ")[1]);

      Main.Queue.get(
        command.guild.id
      ).connection.dispatcher.setVolumeLogarithmic(volume / 5);
      Main.Queue.get(command.guild.id).volume = volume / 5;
      command.channel.send(
        EmbedGenerator.successEmbed(
          "Success",
          "Volume was set to " + volume.toString()
        )
      );
      return;
    } catch (error) {
      command.channel.send(
        EmbedGenerator.errorEmbed(
          "Error",
          "You triggered an error:\n```" + error + "```"
        )
      );
      return;
    }
  }
}
