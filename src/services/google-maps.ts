import axios from "axios";
import path from "path";
import fs from "fs";
import { GooglePlace } from "../interfaces/hair-salon";

/**
 * Fetches the Street View image from Google Maps API and saves it locally.
 * @param {number} lat - Latitude of the location.
 * @param {number} lng - Longitude of the location.
 * @param {string} outputFile - Path where the image will be saved.
 */
export async function fetchStreetViewImage(
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

/**
 * Finds a place using the Google Maps Places API.
 * @param text - The text to search for.
 * @returns The place data.
 */
export async function findPlaceFromText(text: string): Promise<GooglePlace> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURI(
    text
  )}&inputtype=textquery&fields=geometry&key=${apiKey}`;
  const place = await axios.get<{
    status: string;
    candidates: GooglePlace[];
  }>(url);
  if (place.data.status !== "OK") {
    throw new Error(`Error fetching place: ${place.status}`);
  }
  if (!place.data.candidates || place.data.candidates.length === 0) {
    throw new Error(`No results found for: ${text}`);
  }
  return place.data.candidates[0];
}
