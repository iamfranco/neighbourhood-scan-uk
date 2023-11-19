import { describe, expect, it, vi } from "vitest";
import { demographicService } from "./demographicService";
import { makeRandomNomisEthnicityResponse } from "../../clients/nomis/models/NomisEthnicityResponse";
import { nomisClient } from "../../clients/nomis/nomisClient";
import { makeRandomNomisAgeResponse } from "../../clients/nomis/models/NomisAgeResponse";

describe('demographicService', () => {
  it('Given valid geographyCode, when getDemographicData, then return correct demographic data', async () => {
    // Arrange
    const geographyCode = 645922843;

    const nomisEthnicityResponse = makeRandomNomisEthnicityResponse();
    vi.spyOn(nomisClient, 'getEthnicity')
      .mockResolvedValue(nomisEthnicityResponse);

    const nomisAgeResponse = makeRandomNomisAgeResponse();
    vi.spyOn(nomisClient, 'getAge')
      .mockResolvedValue(nomisAgeResponse);

    // Act
    const result = await demographicService.getDemographicData(geographyCode);
    
    // Assert
    expect(result).toEqual({
      ethnicity: {
        values: nomisEthnicityResponse.value,
        labels: Object.values(nomisEthnicityResponse.dimension.c2021_eth_20.category.label),
        total: nomisEthnicityResponse.value.reduce((x, y) => x + y)
      },
      age: {
        values: nomisAgeResponse.value,
        labels: Object.values(nomisAgeResponse.dimension.c2021_age_102.category.label),
        total: nomisAgeResponse.value.reduce((x, y) => x + y)
      }
    })
  })

  it('Given ethnicity client returns null, when getDemographicData, then return null', async () => {
    // Arrange
    const geographyCode = 645922843;
    
    vi.spyOn(nomisClient, 'getEthnicity')
      .mockResolvedValue(null);

    // Act
    const result = await demographicService.getDemographicData(geographyCode);
    
    // Assert
    expect(result).toBeNull();
  })

  it('Given age client returns null, when getDemographicData, then return null', async () => {
    // Arrange
    const geographyCode = 645922843;
    
    vi.spyOn(nomisClient, 'getAge')
      .mockResolvedValue(null);

    // Act
    const result = await demographicService.getDemographicData(geographyCode);
    
    // Assert
    expect(result).toBeNull();
  })
})