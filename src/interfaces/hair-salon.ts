export interface HairSalon {
  name: string;
  city: string | null;
  address: string;
  zipCode: string | null;
  lat: number;
  lng: number;
}

export interface GooglePlace {
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}
