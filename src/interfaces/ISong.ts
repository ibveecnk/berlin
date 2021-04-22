import { User } from "discord.js";

export interface ISong {
  id: string;
  title: any;
  views: any;
  url: string;
  ago: string;
  duration: string;
  img: string;
  req: User;
}
