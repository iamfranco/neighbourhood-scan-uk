import { nomisClient } from "../../clients/nomis/nomisClient"
import { nomisResponseService } from "../nomis/nomisResponseService";
import { DemographicData } from "./models/DemographicData";

const getDemographicData = async (geographyCode: number, geographyCodeType464: number): Promise<DemographicData | null> => {

  const [ethnicityResponse, ageResponse, surfaceAreaResponse] = await Promise.all([
    nomisClient.getEthnicity(geographyCode),
    nomisClient.getAge(geographyCode),
    nomisClient.getSurfaceArea(geographyCodeType464)
  ]);

  if (ethnicityResponse == null || ageResponse == null || surfaceAreaResponse == null) return null;

  const simplifiedAgeResponse = nomisResponseService.simplifyAgeData(ageResponse);

  const demographicData: DemographicData = {
    ethnicity: {
      values: ethnicityResponse.value,
      labels: Object.values(ethnicityResponse.dimension.c2021_eth_20.category.label),
      total: ethnicityResponse.value.reduce((x, y) => x + y)
    },
    age: {
      values: simplifiedAgeResponse.value,
      labels: simplifiedAgeResponse.label,
      total: simplifiedAgeResponse.value.reduce((x, y) => x + y)
    },
    surfaceAreaHectares: surfaceAreaResponse.value[0]
  }

  return demographicData;
}

export class demographicService {
  public static getDemographicData = getDemographicData
}