import { GuardFunction } from "@typeit/discord";

export const IsOwner: GuardFunction<"message"> = async (
  [message],
  client,
  next
) => {
  if (client.user.id == process.env.OWNER_UID) {
    await next();
  }
};
