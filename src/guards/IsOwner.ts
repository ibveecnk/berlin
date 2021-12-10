import { GuardFunction } from "@typeit/discord";

export const IsOwner: GuardFunction<"message"> = async (
  [message],
  _client,
  next
) => {
  if (message.member.user.id == process.env.OWNER_UID) {
    await next();
  }
};
