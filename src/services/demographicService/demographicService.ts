import { nomisClient } from "../../clients/nomis/nomisClient"
import { DemographicData } from "./models/DemographicData";

const getDemographicData = async (geographyCode: number): Promise<DemographicData | null> => {

  const [ethnicityResponse, ageResponse] = await Promise.all([
    nomisClient.getEthnicity(geographyCode),
    nomisClient.getAge(geographyCode)
  ]);

  if (ethnicityResponse == null || ageResponse == null) return null;

  const demographicData: DemographicData = {
    ethnicity: {
      values: ethnicityResponse.value,
      labels: Object.values(ethnicityResponse.dimension.c2021_eth_20.category.label),
      total: ethnicityResponse.value.reduce((x, y) => x + y)
    },
    age: {
      values: ageResponse.value,
      labels: Object.values(ageResponse.dimension.c2021_age_102.category.label),
      total: ageResponse.value.reduce((x, y) => x + y)
    }
  }

  return demographicData;
}

export class demographicService {
  public static getDemographicData = getDemographicData
}