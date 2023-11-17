import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import SearchInput from "./SearchInput";
import { AddressContext } from "../../App";
import userEvent from "@testing-library/user-event";
import { searchAddressService } from "./services/searchAddressService";
import { makeRandomAddressDetails } from "../../models/AddressDetails";
import { demographicService } from "../../services/demographicService/demographicService";
import { makeRandomDemographicData } from "../../services/demographicService/models/DemographicData";

const mockSetAddress = vi.fn();
const mockSetDemographicData = vi.fn();

describe('SearchInput component', () => {
  const user = userEvent.setup();

  afterEach(cleanup)
  
  it('when user types in address and click submit button, then setters called', async () => {
    // Arrange
    render(
      <AddressContext.Provider value={{address: null, setAddress: mockSetAddress, setDemographicData: mockSetDemographicData}}>
        <SearchInput />
      </AddressContext.Provider>
    )

    const addressDetails = makeRandomAddressDetails();
    const searchAddressServiceSpy = vi.spyOn(searchAddressService, 'search')
      .mockResolvedValue(addressDetails);

    const demographicData = makeRandomDemographicData();
    const demographicServiceSpy = vi.spyOn(demographicService, 'getDemographicData')
      .mockResolvedValue(demographicData);

    // Act
    const input = screen.getByRole('textbox');
    await user.type(input, 'some address');

    const submitButton = screen.getByRole('button');
    await user.click(submitButton);

    // Assert
    expect(searchAddressServiceSpy).toHaveBeenCalledWith('some address');
    expect(mockSetAddress).toHaveBeenCalledWith(addressDetails);

    expect(demographicServiceSpy).toHaveBeenCalledWith(addressDetails.censusLocationIndex);
    expect(mockSetDemographicData).toHaveBeenCalledWith(demographicData);
  })

  it('when user types in address and press enter, then setters called', async () => {
    // Arrange
    render(
      <AddressContext.Provider value={{address: null, setAddress: mockSetAddress, setDemographicData: mockSetDemographicData}}>
        <SearchInput />
      </AddressContext.Provider>
    )

    const addressDetails = makeRandomAddressDetails();
    const searchAddressServiceSpy = vi.spyOn(searchAddressService, 'search')
      .mockResolvedValue(addressDetails);

    const demographicData = makeRandomDemographicData();
    const demographicServiceSpy = vi.spyOn(demographicService, 'getDemographicData')
      .mockResolvedValue(demographicData);
  
    // Act
    const input = screen.getByRole('textbox');
    await user.type(input, 'some address');
    await user.type(input, '{enter}');

    // Assert
    expect(searchAddressServiceSpy).toHaveBeenCalledWith('some address');
    expect(mockSetAddress).toHaveBeenCalledWith(addressDetails);
    
    expect(demographicServiceSpy).toHaveBeenCalledWith(addressDetails.censusLocationIndex);
    expect(mockSetDemographicData).toHaveBeenCalledWith(demographicData);
  })
})