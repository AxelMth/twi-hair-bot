import { TwitterApi } from "twitter-api-v2";
import { config } from "dotenv";
config();
import hairSalons from "./hair-salons.json";
import axios from "axios";
import path from "path";
import fs from "fs";

interface HairSalon {
  name: string;
  city: string | null;
  zipCode: string | null;
  lat: number;
  lng: number;
}

function getHairSalon(index: number): HairSalon {
  const hairSalon = hairSalons.data.features[index];

  const name = hairSalon.properties.nom;
  const city = hairSalon.properties.ville;
  const zipCode = hairSalon.properties.codepostal;
  const lat = hairSalon.properties.lat;
  const lng = hairSalon.properties.lng;

  return { name, city, zipCode, lat, lng };
}

const client = new TwitterApi({
  appKey: process.env.TWITTER_CONSUMER_KEY as string,
  appSecret: process.env.TWITTER_CONSUMER_SECRET as string,
  accessToken: process.env.TWITTER_ACCESS_TOKEN as string,
  accessSecret: process.env.TWITTER_ACCESS_SECRET as string,
});

/**
 * Fetches the Street View image from Google Maps API and saves it locally.
 * @param {number} lat - Latitude of the location.
 * @param {number} lng - Longitude of the location.
 * @param {string} outputFile - Path where the image will be saved.
 */
async function fetchStreetViewImage(
  lat: number,
  lng: number,
  outputFile: string
) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${lat},${lng}&fov=90&heading=235&pitch=10&key=${apiKey}`;

  try {
    // Fetch the image as a stream
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });

    // Ensure the directory exists
    const dir = path.dirname(outputFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Pipe the response stream to a file
    const writer = fs.createWriteStream(outputFile);
    response.data.pipe(writer);

    // Return a promise that resolves when the file has been written
    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching the Street View image:", error.message);
    }
  }
}

async function tweetWithMedia(hairSalon: HairSalon, imgUrl: string) {
  const mediaId = await client.v1.uploadMedia(imgUrl);

  return client.v2.tweet({
    text: `
💇 Salon: ${hairSalon.name}
📍 Ville: ${hairSalon.city} (${hairSalon.zipCode})
    `,
    media: { media_ids: [mediaId] },
  });
}

async function tweetHairSalon(index: number) {
  const hairSalon = await getHairSalon(index);
  const imageUrl = `images/${index}.jpg`;
  await fetchStreetViewImage(hairSalon.lat, hairSalon.lng, imageUrl);
  return tweetWithMedia(hairSalon, imageUrl);
}

tweetHairSalon(1);
