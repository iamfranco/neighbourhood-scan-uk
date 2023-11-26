import { NomisEthnicityResponse } from "./models/NomisEthnicityResponse";
import { NomisGeographyResponseItem } from "./models/NomisGeographyResponseItem";
import geographyType154 from './cachedResponse/geographyType154.json';
import geographyType464 from './cachedResponse/geographyType464.json';
import { NomisAgeResponse } from "./models/NomisAgeResponse";
import { NomisSurfaceAreaResponse } from "./models/NomisSurfaceAreaResponse";

const getGeographyType154 = async (): Promise<NomisGeographyResponseItem[] | null> => {
  const url = 'https://www.nomisweb.co.uk/json/geography/type154.json?1';

  const response = await fetch(url);
  const result = await (response.json() as Promise<NomisGeographyResponseItem[]>);

  return result;
}

const getGeographyType154Cached = (): NomisGeographyResponseItem[] => geographyType154;

const getGeographyType464 = async (): Promise<NomisGeographyResponseItem[] | null> => {
  const url = 'https://www.nomisweb.co.uk/json/geography/type464.json?1';

  const response = await fetch(url);
  const result = await (response.json() as Promise<NomisGeographyResponseItem[]>);

  return result;
}

const getGeographyType464Cached = (): NomisGeographyResponseItem[] => geographyType464;

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

const getSurfaceArea = async (geographyCode: number) : Promise<NomisSurfaceAreaResponse | null> => {
  const url = 'https://www.nomisweb.co.uk/api/v01/dataset/NM_144_1.jsonstat.json?rural_urban=0&measures=20100&cell=6&' + 
    `geography=${geographyCode}`;

  const response = await fetch(url);
  const result = await (response.json() as Promise<NomisSurfaceAreaResponse>);

  return result;
}

export class nomisClient {
  public static getGeographyType154 = getGeographyType154
  public static getGeographyType154Cached = getGeographyType154Cached
  public static getGeographyType464 = getGeographyType464
  public static getGeographyType464Cached = getGeographyType464Cached
  public static getEthnicity = getEthnicity
  public static getAge = getAge
  public static getSurfaceArea = getSurfaceArea
}