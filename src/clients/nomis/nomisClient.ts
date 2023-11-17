import { NomisEthnicityResponse } from "./models/NomisEthnicityResponse";
import { NomisGeographyResponseItem } from "./models/NomisGeographyResponseItem";
import geography from './cachedResponse/geography.json';

const getGeography = async (): Promise<NomisGeographyResponseItem[] | null> => {
  const url = 'https://www.nomisweb.co.uk/json/geography/type154.json?1';

  const response = await fetch(url);
  const result = await (response.json() as Promise<NomisGeographyResponseItem[]>);

  return result;
}

const getGeographyCached = (): NomisGeographyResponseItem[] => geography;

const getEthnicity = async (geographyCode: number) : Promise<NomisEthnicityResponse | null> => {
  const url = `https://www.nomisweb.co.uk/api/v01/dataset/NM_2041_1.jsonstat.json?date=latest&geography=${geographyCode}&` +
    'c2021_eth_20=1001,1002,1003,1004,1005&measures=20100&_=730877';

  const response = await fetch(url);
  const result = await (response.json() as Promise<NomisEthnicityResponse>);

  if (result.error != null) {
    return null;
  }

  return result;
}

export class nomisClient {
  public static getGeography = getGeography
  public static getGeographyCached = getGeographyCached
  public static getEthnicity = getEthnicity
}