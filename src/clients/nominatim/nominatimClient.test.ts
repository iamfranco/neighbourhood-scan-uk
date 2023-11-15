import { describe, expect, it } from "vitest";
import { nominatimClient } from "./nominatimClient";

describe('nominatimClient', () => {
  it('Given valid postcode, when search, then returns correct parsed response', async () => {
    //Arrange
    const address = 'M6 6HF';

    //Act
    const result = await nominatimClient.search(address);

    //Assert
    expect(result).not.toBe(null);
    if (result == null) return;

    expect(result.lat).toBe('53.49522');
    expect(result.lon).toBe('-2.27064');
    expect(result.display_name).toBe('Salford, Greater Manchester, England, M6 6HF, United Kingdom');
    expect(result.address.country).toBe('United Kingdom');
  })

  it('Given valid address, when search, then returns correct parsed response', async () => {
    //Arrange
    const address = 'manchester city centre';

    //Act
    const result = await nominatimClient.search(address);

    //Assert
    expect(result).not.toBe(null);
    if (result == null) return;
    
    expect(result.lat).toBe('53.4815221');
    expect(result.lon).toBe('-2.2417753');
    expect(result.display_name).toBe('City Centre, Manchester, Greater Manchester, England, United Kingdom');
    expect(result.address.country).toBe('United Kingdom');
  })

  it('Given invalid address, when search, then returns null', async () => {
    //Arrange
    const address = 'asjdklfjawklejfawlek';

    //Act
    const result = await nominatimClient.search(address);

    //Assert
    expect(result).toBe(null);
  })
})