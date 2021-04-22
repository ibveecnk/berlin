import { Client } from "@typeit/discord";
import { Snowflake } from "discord.js";
import { config } from "dotenv";
import { IQueue } from "./interfaces/IQueue";

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
