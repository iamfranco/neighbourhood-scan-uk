import { describe, expect, it, vi } from "vitest";
import { demographicService } from "./demographicService";
import { makeRandomNomisEthnicityResponse } from "../../clients/nomis/models/NomisEthnicityResponse";
import { nomisClient } from "../../clients/nomis/nomisClient";

describe('demographicService', () => {
  it('Given valid geographyCode, when getDemographicData, then return correct demographic data', async () => {
    // Arrange
    const geographyCode = 645922843;

    const nomisEthnicityResponse = makeRandomNomisEthnicityResponse();
    vi.spyOn(nomisClient, 'getEthnicity')
      .mockResolvedValue(nomisEthnicityResponse);

    // Act
    const result = await demographicService.getDemographicData(geographyCode);
    
    // Assert
    expect(result).toEqual({
      ethnicity: {
        values: nomisEthnicityResponse.value,
        labels: Object.values(nomisEthnicityResponse.dimension.c2021_eth_20.category.label),
        total: nomisEthnicityResponse.value.reduce((x, y) => x + y)
      }
    })
  })
})