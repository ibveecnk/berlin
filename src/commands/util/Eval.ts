import { Command, CommandMessage, Description, Guard } from "@typeit/discord";
import { IsOwner } from "../../guards/IsOwner";

export default abstract class Eval {
  @Command()
  @Guard(IsOwner)
  @Description("Execute a command on the host machine")
  async eval(command: CommandMessage) {
    try {
      const code = command.commandContent.slice(
        command.commandContent.split(" ")[0].length + 1
      );

      let evaled = eval(code);

      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      command.channel.send(String(this.clean(evaled)).substr(0, 1950), {
        code: "xl",
      });
    } catch (err) {
      command.channel.send(
        String(`\`ERROR\` \`\`\`xl\n${this.clean(err)}\n\`\`\``).substr(0, 1950)
      );
    }
  }

  clean(text) {
    if (typeof text === "string")
      return text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
  }
}
