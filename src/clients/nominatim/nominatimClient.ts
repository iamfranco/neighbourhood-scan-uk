import { NominatimSearchResponse } from "./models/NominatimSearchResponse"

const search = async (address: string) : Promise<NominatimSearchResponse | null> => {
  const url = `https://nominatim.openstreetmap.org/search?q=${address}&format=json&addressdetails=1&limit=1`;

  const response = await fetch(url);
  const results = await (response.json() as Promise<NominatimSearchResponse[]>);

  if (results.length == 0) return null;

  return results[0];
}

export class nominatimClient {
  public static search = search
}