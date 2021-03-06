import links from "server/core/links";
import entryService from "server/entry/entry.service";
import { CustomRequest, CustomResponse } from "server/types";
import { EventLocals } from "../event.middleware";
import eventParticipationService from "./event-participation.service";

/**
 * Join or leave event
 */
export async function joinLeaveEvent(req: CustomRequest, res: CustomResponse<EventLocals>): Promise<void> {
  if (!res.locals.user) {
    res.redirectToLogin();
    return;
  }

  if (req.query.leave !== undefined) {
    await leaveEvent(res);
  } else {
    await joinEvent(res);
  }
}

async function joinEvent(res: CustomResponse<EventLocals>): Promise<void> {
  const { user, event } = res.locals;

  await eventParticipationService.joinEvent(event, user);

  const messageBang = event.get("title").endsWith("!") ? "" : "!";
  res.locals.alerts.push({
    type: "success",
    message: `Welcome to ${event.get("title")}${messageBang}`,
    floating: true
  });
  res.redirect(links.routeUrl(event, "event", "dashboard"));
}

async function leaveEvent(res: CustomResponse<EventLocals>): Promise<void> {
  const { user, event } = res.locals;

  const hasEntry = await entryService.findUserEntryForEvent(user, event.get("id"));
  if (hasEntry) {
    res.locals.alerts.push({
      type: "danger",
      message: "You have an entry submitted to this event. Please delete it or leave the team before leaving the event."
    });
    res.redirect(links.routeUrl(event, "event", "dashboard"));

  } else {
    await eventParticipationService.leaveEvent(event, user);
    res.locals.alerts.push({
      type: "success",
      message: "Your event participation is cancelled.",
      floating: true
    });
    res.redirect("/");
  }

}
