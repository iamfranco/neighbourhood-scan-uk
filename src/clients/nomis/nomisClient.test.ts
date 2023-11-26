import { describe, expect, it} from "vitest";
import { nomisClient } from "./nomisClient";

describe('nomisClient', () => {
  it('When getGeographyType154Cached, then return same response as getGeographyType154', async () => {
    // Arrange
    const expectedResult = await nomisClient.getGeographyType154();

    // Act
    const result = nomisClient.getGeographyType154Cached();

    // Assert
    expect(result).toEqual(expectedResult);
  })

  it('When getGeographyType464Cached, then return same response as getGeographyType464', async () => {
    // Arrange
    const expectedResult = await nomisClient.getGeographyType464();

    // Act
    const result = nomisClient.getGeographyType464Cached();

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
    const geographyCode = 12345;

    // Act
    const result = await nomisClient.getEthnicity(geographyCode);

    // Assert
    expect(result).toBeNull();
  })

  it('Given valid geography code, when getAge, then return correct response', async () => {
    // Arrange
    const geographyCode = 645922843;

    // Act
    const result = await nomisClient.getAge(geographyCode);

    // Assert
    expect(result).not.toBeNull();
    if (result == null) return;

    expect(result.value).toEqual([
      6581,
      7057,
      6819,
      6782,
      7139,
      7133,
      7241,
      7311,
      7405,
      7472,
      7429,
      7358,
      7269,
      7261,
      7027,
      6696,
      6645,
      6328,
      9288,
      13461,
      13837,
      13053,
      12141,
      11562,
      11294,
      10737,
      10673,
      10587,
      10358,
      10228,
      10278,
      9812,
      9493,
      9539,
      8879,
      9015,
      8709,
      8187,
      8209,
      7932,
      7950,
      7654,
      7137,
      6635,
      6402,
      6385,
      6282,
      6175,
      6089,
      6136,
      6206,
      6075,
      6243,
      5887,
      5959,
      5690,
      5712,
      5232,
      5188,
      4871,
      4681,
      4567,
      4161,
      4190,
      4043,
      3650,
      3507,
      3164,
      3187,
      2974,
      2982,
      2773,
      2724,
      2768,
      2570,
      1983,
      2062,
      1876,
      1663,
      1622,
      1564,
      1395,
      1326,
      1278,
      1126,
      1018,
      841,
      715,
      673,
      616,
      426,
      391,
      339,
      232,
      214,
      156,
      116,
      90,
      46,
      42,
      59
    ]);

    const c2021_age_102 = result.dimension.c2021_age_102;
    expect(c2021_age_102.label).toBe('Age');
  })

  it('Given invalid geography code, when getAge, then return null', async () => {
    // Arrange
    const geographyCode = 12345;

    // Act
    const result = await nomisClient.getAge(geographyCode);

    // Assert
    expect(result).toBeNull();
  })

  it('Given valid geography code, when getSurfaceArea, then return correct response', async () => {
    // Arrange
    const geographyCode = 1946157083;

    // Act
    const result = await nomisClient.getSurfaceArea(geographyCode);

    // Assert
    expect(result).not.toBeNull();
    if (result == null) return;

    expect(result.value).toEqual([
      11564.49
    ]);

    const cell = result.dimension.cell;
    expect(cell.category.index).toEqual({
      "6": 0
    });
    expect(cell.category.label).toEqual({
      "6": "Area (Hectares)"
    });
  })
})