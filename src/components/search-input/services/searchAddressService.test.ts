import { describe, expect, it, vi } from 'vitest';
import { nominatimClient } from '../../../clients/nominatim/nominatimClient';
import { makeRandomNominatimSearchResponse } from '../../../clients/nominatim/models/NominatimSearchResponse';
import { searchAddressService } from './searchAddressService';
import { AddressDetails } from '../../../models/AddressDetails';
import { makeRandomPostcodeDetailsResponse } from '../../../clients/postcodes/models/PostcodeDetailsResponse';
import { postcodesClient } from '../../../clients/postcodes/postcodesClient';
import { makeRandomNomisGeographyResponseItem } from '../../../clients/nomis/models/NomisGeographyResponseItem';
import { nomisClient } from '../../../clients/nomis/nomisClient';

describe('searchAddressService', () => {
  it('given client returns address successfully, when search, then return address', async () => {
    // Arrange
    const nominatimSearchResponse = makeRandomNominatimSearchResponse();
    vi.spyOn(nominatimClient, 'search')
      .mockResolvedValue(nominatimSearchResponse);

    const postcodesResponse = makeRandomPostcodeDetailsResponse();
    vi.spyOn(postcodesClient, 'getPostcodeDetails')
      .mockResolvedValue(postcodesResponse);

    const nomisGeographyResponseMatchingItem = {
      value: Math.random(),
      label: Math.random().toString(),
      gss: postcodesResponse.result[0].codes.admin_district
    };
    vi.spyOn(nomisClient, 'getGeographyCached')
      .mockReturnValue([
        makeRandomNomisGeographyResponseItem(),
        nomisGeographyResponseMatchingItem,
        makeRandomNomisGeographyResponseItem()
      ]);

    // Act
    const result = await searchAddressService.search('some address');

    // Assert
    const addressDetails: AddressDetails = {
      latitude: nominatimSearchResponse.lat,
      longitude: nominatimSearchResponse.lon,
      postcode: postcodesResponse.result[0].postcode,
      city: nominatimSearchResponse.address.city,
      censusLocationLabel: nomisGeographyResponseMatchingItem.label,
      censusLocationCode: postcodesResponse.result[0].codes.admin_district,
      censusLocationIndex: nomisGeographyResponseMatchingItem.value
    }
    expect(result).toEqual(addressDetails);
  })

  it('given nominatimClient returns null, when search, then return null', async () => {
    // Arrange
    vi.spyOn(nominatimClient, 'search')
      .mockResolvedValue(null);

    vi.spyOn(nomisClient, 'getGeographyCached')
      .mockReturnValue([makeRandomNomisGeographyResponseItem()]);

    // Act
    const result = await searchAddressService.search('some address');

    // Assert
    expect(result).toBeNull();
  })

  it('given postcodesClient returns null, when search, then return null', async () => {
    // Arrange
    const nominatimSearchResponse = makeRandomNominatimSearchResponse();
    vi.spyOn(nominatimClient, 'search')
      .mockResolvedValue(nominatimSearchResponse);

    vi.spyOn(nomisClient, 'getGeographyCached')
      .mockReturnValue([makeRandomNomisGeographyResponseItem()]);

    vi.spyOn(postcodesClient, 'getPostcodeDetails')
      .mockResolvedValue(null);

    // Act
    const result = await searchAddressService.search('some address');

    // Assert
    expect(result).toBeNull();
  })

  it('given no matching nomisGeographyResponse item, when search, then return null', async () => {
    // Arrange
    const nominatimSearchResponse = makeRandomNominatimSearchResponse();
    vi.spyOn(nominatimClient, 'search')
      .mockResolvedValue(nominatimSearchResponse);

    vi.spyOn(nomisClient, 'getGeographyCached')
      .mockReturnValue([makeRandomNomisGeographyResponseItem()]);

    const postcodesResponse = makeRandomPostcodeDetailsResponse();
    vi.spyOn(postcodesClient, 'getPostcodeDetails')
      .mockResolvedValue(postcodesResponse);

    // Act
    const result = await searchAddressService.search('some address');

    // Assert
    expect(result).toBeNull();
  })
})