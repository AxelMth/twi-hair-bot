import { TwitterApi } from "twitter-api-v2";
import { HairSalon } from "../interfaces/hair-salon";

const client = new TwitterApi({
  appKey: process.env.TWITTER_CONSUMER_KEY as string,
  appSecret: process.env.TWITTER_CONSUMER_SECRET as string,
  accessToken: process.env.TWITTER_ACCESS_TOKEN as string,
  accessSecret: process.env.TWITTER_ACCESS_SECRET as string,
});

/**
 * Tweets about a hair salon with an attached image.
 *
 * @param hairSalon The hair salon to tweet about.
 * @param imgUrl The URL of the image to attach to the tweet.
 * @returns The tweet object.
 */
export async function tweetWithMedia(hairSalon: HairSalon, imgUrl: string) {
  const mediaId = await client.v1.uploadMedia(imgUrl);

  return client.v2.tweet({
    text: `
💇 Salon: ${hairSalon.name}
📍 Ville: ${hairSalon.city} (${hairSalon.zipCode})
    `,
    media: { media_ids: [mediaId] },
  });
}
