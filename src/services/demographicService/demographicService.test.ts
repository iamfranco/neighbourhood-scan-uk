import { SpyInstance, beforeEach, describe, expect, it, vi } from "vitest";
import { demographicService } from "./demographicService";
import { NomisEthnicityResponse, makeRandomNomisEthnicityResponse } from "../../clients/nomis/models/NomisEthnicityResponse";
import { nomisClient } from "../../clients/nomis/nomisClient";
import { NomisAgeResponse, makeRandomNomisAgeResponse } from "../../clients/nomis/models/NomisAgeResponse";
import { nomisResponseService } from "../nomis/nomisResponseService";
import { NomisSurfaceAreaResponse, makeRandomNomisSurfaceAreaResponse } from "../../clients/nomis/models/NomisSurfaceAreaResponse";

describe('demographicService', () => {
  const geographyCode = 645922843;
  const geographyCodeType464 = 1946157083;

  const nomisEthnicityResponse = makeRandomNomisEthnicityResponse();
  const nomisAgeResponse = makeRandomNomisAgeResponse();
  const nomisSurfaceAreaResponse = makeRandomNomisSurfaceAreaResponse();

  const nomisAgeSimplifiedResponse = {
    value: [...Array(5)].map(() => Math.random()),
    label: [...Array(5)].map(() => Math.random().toString())
  };

  var getEthnicitySpy: SpyInstance<[geographyCode: number], Promise<NomisEthnicityResponse | null>> = null as any;
  var getAgeSpy: SpyInstance<[geographyCode: number], Promise<NomisAgeResponse | null>> = null as any;
  var getSurfaceAreaSpy: SpyInstance<[geographyCode: number], Promise<NomisSurfaceAreaResponse | null>> = null as any;

  beforeEach(() => {
    getEthnicitySpy = vi.spyOn(nomisClient, 'getEthnicity')
      .mockResolvedValue(nomisEthnicityResponse);

    getAgeSpy = vi.spyOn(nomisClient, 'getAge')
      .mockResolvedValue(nomisAgeResponse);
    
    getSurfaceAreaSpy = vi.spyOn(nomisClient, 'getSurfaceArea')
      .mockResolvedValue(nomisSurfaceAreaResponse);

    vi.spyOn(nomisResponseService, 'simplifyAgeData')
      .mockReturnValue(nomisAgeSimplifiedResponse);
  })

  it('Given valid geographyCode, when getDemographicData, then return correct demographic data', async () => {
    // Act
    const result = await demographicService.getDemographicData(geographyCode, geographyCodeType464);
    
    // Assert
    expect(getEthnicitySpy).toHaveBeenCalledWith(geographyCode);
    expect(getAgeSpy).toHaveBeenCalledWith(geographyCode);
    expect(getSurfaceAreaSpy).toHaveBeenCalledWith(geographyCodeType464);

    expect(result).toEqual({
      ethnicity: {
        values: nomisEthnicityResponse.value,
        labels: Object.values(nomisEthnicityResponse.dimension.c2021_eth_20.category.label),
        total: nomisEthnicityResponse.value.reduce((x, y) => x + y)
      },
      age: {
        values: nomisAgeSimplifiedResponse.value,
        labels: nomisAgeSimplifiedResponse.label,
        total: nomisAgeSimplifiedResponse.value.reduce((x, y) => x + y)
      },
      surfaceAreaHectares: nomisSurfaceAreaResponse.value[0]
    })
  })

  it('Given ethnicity client returns null, when getDemographicData, then return null', async () => {
    // Arrange
    vi.spyOn(nomisClient, 'getEthnicity')
      .mockResolvedValue(null);
    
    // Act
    const result = await demographicService.getDemographicData(geographyCode, geographyCodeType464);
    
    // Assert
    expect(result).toBeNull();
  })

  it('Given age client returns null, when getDemographicData, then return null', async () => {
    // Arrange
    vi.spyOn(nomisClient, 'getAge')
      .mockResolvedValue(null);
    
    // Act
    const result = await demographicService.getDemographicData(geographyCode, geographyCodeType464);
    
    // Assert
    expect(result).toBeNull();
  })

  it('Given surface area client returns null, when getDemographicData, then return null', async () => {
    // Arrange
    vi.spyOn(nomisClient, 'getSurfaceArea')
      .mockResolvedValue(null);
    
    // Act
    const result = await demographicService.getDemographicData(geographyCode, geographyCodeType464);
    
    // Assert
    expect(result).toBeNull();
  })
})