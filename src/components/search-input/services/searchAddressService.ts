import { nominatimClient } from "../../../clients/nominatim/nominatimClient";
import { AddressDetails } from "../../../models/AddressDetails"

const search = async (address: string) : Promise<AddressDetails | null> => {
  const nominatimSearchResponse = await nominatimClient.search(address);

  if (nominatimSearchResponse == null) return null;

  const addressDetails: AddressDetails = {
    latitude: nominatimSearchResponse.lat,
    longitude: nominatimSearchResponse.lon,
    postcode: nominatimSearchResponse.address.postcode,
    city: nominatimSearchResponse.address.city
  }

  return addressDetails;
}

export class searchAddressService {
  public static search = search
}