import { describe, expect, it } from "vitest";
import { AddressDetails, makeRandomAddressDetails } from "../../models/AddressDetails";
import { makeRandomDemographicData } from "../demographicService/models/DemographicData";
import { addressDetailsBuilder } from "./addressDetailsBuilder";

describe('addressDetailsBuilder', () => {
  it('When addDemographicData, then returns addressDetails with demographicData', () => {
    // Arrange
    const addressDetails = makeRandomAddressDetails();
    const demographicData = makeRandomDemographicData();

    // Act
    const addressDetailsWithDemographicData = addressDetailsBuilder.addDemographicData(addressDetails, demographicData);

    // Assert
    const expectedAddressDetails: AddressDetails = {
      latitude: addressDetails.latitude,
      longitude: addressDetails.longitude,
      postcode: addressDetails.postcode,
      city: addressDetails.city,
      censusLocationLabel: addressDetails.censusLocationLabel,
      censusLocationCode: addressDetails.censusLocationCode,
      censusLocationIndex: addressDetails.censusLocationIndex,
      type464LocationIndex: addressDetails.type464LocationIndex,
      demographicData: demographicData,
    }

    expect(addressDetailsWithDemographicData).toEqual(expectedAddressDetails);
  })
})