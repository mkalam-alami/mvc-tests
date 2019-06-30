import { CommonLocals } from "server/common.middleware";
import links from "server/core/links";
import entryTeamService from "server/entry/entry-team.service";
import { CustomRequest, CustomResponse } from "server/types";

/**
 * Accept an invite to join an entry's team
 */
export async function inviteAccept(req: CustomRequest, res: CustomResponse<CommonLocals>) {
  await entryTeamService.acceptInvite(res.locals.user, res.locals.entry);
  res.redirect(links.routeUrl(res.locals.entry, "entry"));
}

/**
 * Decline an invite to join an entry's team
 */
export async function inviteDecline(req: CustomRequest, res: CustomResponse<CommonLocals>) {
  await entryTeamService.deleteInvite(res.locals.user, res.locals.entry);
  res.redirect(links.routeUrl(res.locals.user, "user", "feed"));
}
