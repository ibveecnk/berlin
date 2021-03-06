import { Command, CommandMessage, Description } from "@typeit/discord";
import { User, Util } from "discord.js";
import { Main } from "../..";
import { EmbedGenerator } from "../../helpers/EmbedGenerator";
import { ISong } from "../../interfaces/ISong";
const ytdl = require("ytdl-core");
const yts = require("yt-search");

export default abstract class Play {
  @Command()
  @Description("Adds a song to the queue")
  async play(command: CommandMessage) {
    // Safety checks
    if (!command.member?.voice.channel) {
      command.channel.send(
        EmbedGenerator.errorEmbed("Error", "You are not in a voice channel.")
      );
      return;
    }

    if (!command.guild.me.hasPermission("CONNECT")) {
      command.channel.send(
        EmbedGenerator.errorEmbed(
          "Error",
          "The bot is not permitted to join the channel.",
          [{ key: "permission", value: "CONNECT" }]
        )
      );
      return;
    }
    if (!command.guild.me.hasPermission("SPEAK")) {
      command.channel.send(
        EmbedGenerator.errorEmbed(
          "Error",
          "The bot is not permitted to talk in the channel.",
          [{ key: "permission", value: "SPEAK" }]
        )
      );
      return;
    }

    // Video Search
    const searchString = command.commandContent.slice(
      command.commandContent.split(" ")[0].length + 1
    );

    if (!searchString) {
      command.channel.send(
        EmbedGenerator.warningEmbed(
          "Warning",
          "You did not provide a video link or search string."
        )
      );
      return;
    }
    // Get Queue
    const serverQueue = Main.Queue.get(command.guild.id);

    // Search the video
    let searched = await yts.search(searchString);
    if (searched.videos.length < 1) {
      command.channel.send(
        EmbedGenerator.errorEmbed("Error", "No results were found", [
          { key: "searchString", value: searchString },
        ])
      );
    }
    let songInfo = searched.videos[0];

    const song: ISong = {
      id: songInfo.videoId,
      title: Util.escapeMarkdown(songInfo.title),
      views: String(songInfo.views).padStart(10, " "),
      url: songInfo.url,
      ago: songInfo.ago,
      duration: songInfo.duration.toString(),
      img: songInfo.image,
      req: command.author,
    };

    if (serverQueue) {
      serverQueue.songs.push(song);

      command.channel.send(
        EmbedGenerator.successEmbed(
          "Success",
          "Your Song was added to the queue",
          [
            { key: "Song", value: `[${song.title}](${song.url})` },
            { key: "Requestor", value: song.req.username },
            { key: "Duration", value: song.duration },
          ]
        )
      );
      return;
    }

    const queueConstruct = {
      textChannel: command.channel,
      voiceChannel: command.member.voice.channel,
      connection: null,
      songs: new Array(song),
      volume: 3.5,
      playing: true,
    };

    Main.Queue.set(command.guild.id, queueConstruct);

    const play = async (song) => {
      const queue = Main.Queue.get(command.guild.id);
      if (!song) {
        Main.Queue.get(command.guild.id).connection.disconnect();
        Main.Queue.delete(command.guild.id);
        return;
      }

      const dispatcher = queue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
          queue.songs.shift();
          play(queue.songs[0]);
        })
        .on("error", (error) => console.error(error));
      dispatcher.setVolumeLogarithmic(queue.volume / 5);

      command.channel.send(
        EmbedGenerator.successEmbed(
          "Now Playing",
          `[${song.title}](${song.url})`,
          [
            { key: "Requestor", value: song.req.username },
            { key: "Duration", value: song.duration },
          ]
        )
      );
    };

    try {
      const connection = await command.member.voice.channel.join();
      Main.Queue.get(command.guild.id).connection = connection;
      command.member.voice.channel.guild.voice.setSelfDeaf(true);
      play(Main.Queue.get(command.guild.id).songs[0]);
    } catch (error) {
      Main.Queue.delete(command.guild.id);
      await command.member.voice.channel.leave();
      return console.log(`ERROR: ${error}`, command.channel.id);
    }
  }
}
