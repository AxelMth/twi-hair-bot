import { config } from "dotenv";
config();

import {
  fetchStreetViewImage,
  findPlaceFromText,
} from "./services/google-maps";
import { tweetWithMedia } from "./services/twitter";
import { getIndexFromDate } from "./helpers/get-index-from-date";
import { getHairSalonByIndex } from "./services/hair-salon";

async function tweetHairSalon() {
  const index = getIndexFromDate(new Date("2024-09-14"));
  const hairSalon = await getHairSalonByIndex(index);

  const {
    geometry: {
      location: { lat, lng },
    },
  } = await findPlaceFromText(`${hairSalon.name} ${hairSalon.city}`);

  const imageUrl = `images/${index}.jpg`;
  await fetchStreetViewImage(lat, lng, imageUrl);
  return tweetWithMedia(hairSalon, imageUrl);
}

tweetHairSalon();
