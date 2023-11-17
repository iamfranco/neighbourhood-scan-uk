import { NomisEthnicityResponse } from "../../clients/nomis/models/NomisEthnicityResponse";
import { nomisClient } from "../../clients/nomis/nomisClient"
import { DemographicData } from "./models/DemographicData";

const getDemographicData = async (geographyCode: number): Promise<DemographicData> => {
  const ethnicityResponse = await nomisClient.getEthnicity(geographyCode) as NomisEthnicityResponse;

  const demographicData: DemographicData = {
    ethnicity: {
      values: ethnicityResponse.value,
      labels: Object.values(ethnicityResponse.dimension.c2021_eth_20.category.label),
      total: ethnicityResponse.value.reduce((x, y) => x + y)
    }
  }

  return demographicData;
}

export class demographicService {
  public static getDemographicData = getDemographicData
}