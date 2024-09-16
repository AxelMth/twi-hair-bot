import hairSalons from "../data/hair-salons.json";
import { HairSalon } from "../interfaces/hair-salon";

export function getHairSalonByIndex(index: number): HairSalon {
  const hairSalon = hairSalons.data.features[index];

  const name = hairSalon.properties.nom;
  const city = hairSalon.properties.ville;
  const zipCode = hairSalon.properties.codepostal;
  const lat = hairSalon.properties.lat;
  const lng = hairSalon.properties.lng;

  return { name, city, zipCode, lat, lng };
}
