import { describe, expect, it, vi } from 'vitest';
import { nominatimClient } from '../../../clients/nominatim/nominatimClient';
import { makeRandomNominatimSearchResponse } from '../../../clients/nominatim/models/NominatimSearchResponse';
import { searchAddressService } from './searchAddressService';
import { AddressDetails } from '../../../models/AddressDetails';

describe('searchAddressService', () => {
  it('given client returns address successfully, when search, then return address', async () => {
    // Arrange
    const nominatimSearchResponse = makeRandomNominatimSearchResponse();
    vi.spyOn(nominatimClient, 'search')
      .mockResolvedValue(nominatimSearchResponse);

    // Act
    const result = await searchAddressService.search('some address');

    // Assert
    const addressDetails: AddressDetails = {
      latitude: nominatimSearchResponse.lat,
      longitude: nominatimSearchResponse.lon,
      postcode: nominatimSearchResponse.address.postcode,
      city: nominatimSearchResponse.address.city
    }
    expect(result).toEqual(addressDetails);
  })

  it('given client returns null, when search, then return null', async () => {
    // Arrange
    vi.spyOn(nominatimClient, 'search')
      .mockResolvedValue(null);

    // Act
    const result = await searchAddressService.search('some address');

    // Assert
    expect(result).toBeNull();
  })
})