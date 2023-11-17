import { describe, expect, it} from "vitest";
import { nomisClient } from "./nomisClient";

describe('nomisClient', () => {
  it('When getGeographyCached, then return same response as getGeography', async () => {
    // Arrange
    const expectedResult = await nomisClient.getGeography();

    // Act
    const result = nomisClient.getGeographyCached();

    // Assert
    expect(result).toEqual(expectedResult);
  })

  it('Given valid geography code, when getEthnicity, then return correct response', async () => {
    // Arrange
    const geographyCode = 645922843;

    // Act
    const result = await nomisClient.getEthnicity(geographyCode);

    // Assert
    expect(result).not.toBeNull();
    if (result == null) return;

    expect(result.value).toEqual([
      115109,
      65893,
      29026,
      313632,
      28278
    ]);

    const c2021_eth_20 = result.dimension.c2021_eth_20;
    expect(c2021_eth_20.label).toBe('Ethnic group');
    expect(c2021_eth_20.category.index).toEqual({
      "1001": 0,
      "1002": 1,
      "1003": 2,
      "1004": 3,
      "1005": 4
    });
    expect(c2021_eth_20.category.label).toEqual({
      "1001": "Asian, Asian British or Asian Welsh",
      "1002": "Black, Black British, Black Welsh, Caribbean or African",
      "1003": "Mixed or Multiple ethnic groups",
      "1004": "White",
      "1005": "Other ethnic group"
    });
  })

  it('Given invalid geography code, when getEthnicity, then return null', async () => {
    // Arrange
    // Arrange
    const geographyCode = 12345;

    // Act
    const result = await nomisClient.getEthnicity(geographyCode);

    // Assert
    expect(result).toBeNull();
  })
})