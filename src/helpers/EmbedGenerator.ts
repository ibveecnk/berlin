import { MessageEmbed } from "discord.js";

interface FieldArray {
  key: string;
  value: string;
}

export class EmbedGenerator {
  public static successEmbed(
    title: string,
    description: string,
    fields?: FieldArray[]
  ) {
    const embed = new MessageEmbed()
      .setTitle(title)
      .setColor(0x00ff00)
      .setDescription(description);
    fields?.forEach(({ key, value }) => embed.addField(key, value));
    return embed;
  }

  public static warningEmbed(
    title: string,
    description: string,
    fields?: FieldArray[]
  ) {
    const embed = new MessageEmbed()
      .setTitle(title)
      .setColor(0xffff00)
      .setDescription(description);
    fields?.forEach(({ key, value }) => embed.addField(key, value));
    return embed;
  }

  public static errorEmbed(
    title: string,
    description: string,
    fields?: FieldArray[]
  ) {
    const embed = new MessageEmbed()
      .setTitle(title)
      .setColor(0xff0000)
      .setDescription(description);
    fields?.forEach(({ key, value }) => embed.addField(key, value));
    return embed;
  }
}
