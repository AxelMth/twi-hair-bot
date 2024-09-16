import { config } from "dotenv";
config();

import { fetchStreetViewImage } from "./services/google-maps";
import { tweetWithMedia } from "./services/twitter";
import { getIndexFromDate } from "./helpers/get-index-from-date";
import { getHairSalonByIndex } from "./services/hair-salon";

async function tweetHairSalon() {
  const index = getIndexFromDate(new Date("2024-09-15"));
  const hairSalon = await getHairSalonByIndex(index);
  const imageUrl = `images/${index}.jpg`;
  await fetchStreetViewImage(hairSalon.lat, hairSalon.lng, imageUrl);
  return tweetWithMedia(hairSalon, imageUrl);
}

tweetHairSalon();
