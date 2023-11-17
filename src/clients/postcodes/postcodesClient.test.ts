import { describe, expect, it } from "vitest";
import { postcodesClient } from "./postcodesClient";

describe('postcodeClient', () => {
  it('Given valid lat lon, When getPostcodeDetails, Then returns correct postcode details', async () => {
    // Arrange
    const lon = '-2.285372';
    const lat = '53.467597';

    // Act
    const response = await postcodesClient.getPostcodeDetails(lat, lon);

    // Assert
    expect(response).not.toBeNull();
    if (response == null) return;

    const result = response.result[0];
    expect(result.postcode).toBe('M50 3BL');
    expect(result.longitude).toBe(-2.285372);
    expect(result.latitude).toBe(53.467597);
    expect(result.codes.admin_district).toBe('E08000006');
  })

  it('Given invalid string lat lon, When getPostcodeDetails, Then return null', async () => {
    // Arrange Act
    const response = await postcodesClient.getPostcodeDetails('something', 'something');

    // Assert
    expect(response).toBeNull();
  })

  it('Given invalid number lat lon, When getPostcodeDetails, Then return null', async () => {
    // Arrange Act
    const response = await postcodesClient.getPostcodeDetails('-1000', '-1000');

    // Assert
    expect(response).toBeNull();
  })
})