import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import SearchInput from "./SearchInput";
import { AddressContext } from "../../App";
import userEvent from "@testing-library/user-event";
import { searchAddressService } from "./services/searchAddressService";
import { makeRandomAddressDetails } from "../../models/AddressDetails";

const mockSetAddress = vi.fn();

describe('SearchInput component', () => {
  const user = userEvent.setup();

  afterEach(cleanup)
  
  it('when user types in address and click submit button, then setAddress called', async () => {
    // Arrange
    render(
      <AddressContext.Provider value={{address: null, setAddress: mockSetAddress}}>
        <SearchInput />
      </AddressContext.Provider>
    )

    const addressDetails = makeRandomAddressDetails();
    const searchAddressServiceSpy = vi.spyOn(searchAddressService, 'search')
      .mockResolvedValue(addressDetails);

    // Act
    const input = screen.getByRole('textbox');
    await user.type(input, 'some address');

    const submitButton = screen.getByRole('button');
    await user.click(submitButton);

    // Assert
    expect(searchAddressServiceSpy).toHaveBeenCalledWith('some address');
    expect(mockSetAddress).toHaveBeenCalledWith(addressDetails);
  })

  it('when user types in address and press enter, then setAddress called', async () => {
    // Arrange
    render(
      <AddressContext.Provider value={{address: null, setAddress: mockSetAddress}}>
        <SearchInput />
      </AddressContext.Provider>
    )

    const addressDetails = makeRandomAddressDetails();
    const searchAddressServiceSpy = vi.spyOn(searchAddressService, 'search')
      .mockResolvedValue(addressDetails);

    // Act
    const input = screen.getByRole('textbox');
    await user.type(input, 'some address');
    await user.type(input, '{enter}');

    // Assert
    expect(searchAddressServiceSpy).toHaveBeenCalledWith('some address');
    expect(mockSetAddress).toHaveBeenCalledWith(addressDetails);
  })
})