import { Client } from "@typeit/discord";
import {
  DMChannel,
  NewsChannel,
  Snowflake,
  TextChannel,
  VoiceChannel,
  VoiceConnection,
} from "discord.js";
import { config } from "dotenv";

interface IQueue {
  textChannel: TextChannel | DMChannel | NewsChannel;
  voiceChannel: VoiceChannel;
  connection: VoiceConnection;
  songs: any[];
  /*
  Somehow always leads to errors, so this quick and dirty fix
  [
    id: string,
    title: any,
    views: number,
    url: string,
    ago: string,
    duration: string,
    img: string,
    req: User,
  ];
  */
  volume: number;
  playing: boolean;
}

export class Main {
  private static _client: Client;
  private static _queue: Map<Snowflake, IQueue>;

  static get Client(): Client {
    return this._client;
  }
  static get Queue(): Map<Snowflake, IQueue> {
    return this._queue;
  }

  static start() {
    this._client = new Client();
    this._queue = new Map();

    config();
    this._client.login(
      process.env.DISCORD_BOT_TOKEN,
      `${__dirname}/discords/*.ts`,
      `${__dirname}/discords/*.js`
    );
  }
}

Main.start();
