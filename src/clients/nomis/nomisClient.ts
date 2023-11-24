import { NomisEthnicityResponse } from "./models/NomisEthnicityResponse";
import { NomisGeographyResponseItem } from "./models/NomisGeographyResponseItem";
import geography from './cachedResponse/geography.json';
import { NomisAgeResponse } from "./models/NomisAgeResponse";

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

const getAge = async (geographyCode: number) : Promise<NomisAgeResponse | null> => {
  const url = 'https://www.nomisweb.co.uk/api/v01/dataset/NM_2027_1.jsonstat.json?date=latest&' + 
    `measures=20100&c2021_age_102=1...101&geography=${geographyCode}`;
  
  const response = await fetch(url);
  const result = await (response.json() as Promise<NomisAgeResponse>);

  if (result.error != null) {
    return null;
  }

  return result;
}

export class nomisClient {
  public static getGeography = getGeography
  public static getGeographyCached = getGeographyCached
  public static getEthnicity = getEthnicity
  public static getAge = getAge
}