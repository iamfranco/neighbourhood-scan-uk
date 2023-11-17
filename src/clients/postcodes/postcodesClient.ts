import { PostcodeDetailsResponse } from "./models/PostcodeDetailsResponse"

const getPostcodeDetails = async (lat: string, lon: string) : Promise<PostcodeDetailsResponse | null> => {
  const url = `https://api.postcodes.io/postcodes?lat=${lat}&lon=${lon}`;

  const response = await fetch(url);
  const result = await (response.json() as Promise<PostcodeDetailsResponse>);

  if (result.status !== 200) {
    return null;
  }

  if (result.result == null) {
    return null;
  }

  return result;
}

export class postcodesClient {
  public static getPostcodeDetails = getPostcodeDetails
}