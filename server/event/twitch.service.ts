import { BookshelfModel } from "bookshelf";
import { clamp } from "lodash";
import twitch, { User } from "twitch";
import eventParticipationService from "./dashboard/event-participation.service";
import cache, { TTL_ONE_MINUTE } from "server/core/cache";
import config from "server/core/config";
import log from "server/core/log";

export class TwitchService {

  private twitchClient?: twitch;

  public constructor() {
    if (config.TWITCH_CLIENT_ID && config.TWITCH_CLIENT_SECRET) {
      this.twitchClient = twitch.withClientCredentials(config.TWITCH_CLIENT_ID, config.TWITCH_CLIENT_SECRET);
    }
  }

  public async listCurrentLiveUsers(event: BookshelfModel): Promise<User[]> {
    return cache.getOrFetch(cache.general, "currentLiveChannels", async () => {
      if (!event || !this.twitchClient) {
        return [];
      }

      try {
        const eventParticipations = await eventParticipationService.getEventParticipations(event, { filter: "streamers" });
        const streamerChannels = eventParticipations
          .map(ep => ep.user.details.social_links?.twitch)
          .filter(channel => Boolean(channel));

        const userByChannelName = {};
        for (const ep of eventParticipations) {
          const twitchChannel = ep.user.details.social_links.twitch;
          if (twitchChannel) {
            userByChannelName[twitchChannel.toLowerCase()] = ep.user;
          }
        }

        const streams = await this.listCurrentLiveStreams(streamerChannels);
        return streams.map((stream) => userByChannelName[stream.userDisplayName.toLowerCase()]);
      } catch (e) {
        log.error("Failed to list live streamers", e);
        return []; // Do not block the website because Twitch failed
      }
    }, TTL_ONE_MINUTE);
  }

  private async listCurrentLiveStreams(channels: string[]) {
    const streams = await this.twitchClient.helix.streams.getStreams({
      userName: channels,
      limit: clamp(channels.length, 1, 100).toString()
    });
    return streams.data;
  }

}

export default new TwitchService();