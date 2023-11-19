import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import SearchInput from "./SearchInput";
import userEvent from "@testing-library/user-event";
import { searchAddressService } from "./services/searchAddressService";
import { makeRandomAddressDetails } from "../../models/AddressDetails";
import { demographicService } from "../../services/demographicService/demographicService";
import { makeRandomDemographicData } from "../../services/demographicService/models/DemographicData";
import { addressDetailsBuilder } from "../../services/addressDetailsBuilder/addressDetailsBuilder";

const mockSetAddress = vi.fn();

describe('SearchInput component', () => {
  const user = userEvent.setup();

  afterEach(cleanup)
  
  it('when user types in address and click submit button, then setAddress called', async () => {
    // Arrange
    render(
      <SearchInput setAddress={mockSetAddress} />
    )

    const addressDetails = makeRandomAddressDetails();
    const searchAddressServiceSpy = vi.spyOn(searchAddressService, 'search')
      .mockResolvedValue(addressDetails);

    const demographicData = makeRandomDemographicData();
    const demographicServiceSpy = vi.spyOn(demographicService, 'getDemographicData')
      .mockResolvedValue(demographicData);

    const addressDetailsWithDemographicData = makeRandomAddressDetails();
    const addressDetailsbuilderSpy = vi.spyOn(addressDetailsBuilder, 'addDemographicData')
      .mockReturnValue(addressDetailsWithDemographicData);

    // Act
    const input = screen.getByRole('textbox');
    await user.type(input, 'some address');

    const submitButton = screen.getByRole('button');
    await user.click(submitButton);

    // Assert
    expect(searchAddressServiceSpy).toHaveBeenCalledWith('some address');
    expect(demographicServiceSpy).toHaveBeenCalledWith(addressDetails.censusLocationIndex);
    expect(addressDetailsbuilderSpy).toHaveBeenCalledWith(addressDetails, demographicData);

    expect(mockSetAddress).toHaveBeenCalledWith(addressDetailsWithDemographicData);
  })
})