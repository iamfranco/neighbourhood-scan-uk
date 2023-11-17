import { nominatimClient } from "../../../clients/nominatim/nominatimClient";
import { nomisClient } from "../../../clients/nomis/nomisClient";
import { postcodesClient } from "../../../clients/postcodes/postcodesClient";
import { AddressDetails } from "../../../models/AddressDetails"

const search = async (address: string) : Promise<AddressDetails | null> => {
  const nominatimSearchResponse = await nominatimClient.search(address);
  if (nominatimSearchResponse == null) return null;

  const nomisGeographyResponse = nomisClient.getGeographyCached();
  
  const lat = nominatimSearchResponse.lat;
  const lon = nominatimSearchResponse.lon;

  const postcodesDetails = await postcodesClient.getPostcodeDetails(lat, lon);
  if (postcodesDetails == null) return null;

  const nearestPostcodeDetails = postcodesDetails.result[0];

  const censusLocationCode = nearestPostcodeDetails.codes.admin_district;
  const nomisGeographyResponseMatchingItem = nomisGeographyResponse.find(x => x.gss == censusLocationCode);

  if (nomisGeographyResponseMatchingItem == undefined) return null;

  const addressDetails: AddressDetails = {
    latitude: nominatimSearchResponse.lat,
    longitude: nominatimSearchResponse.lon,
    postcode: nearestPostcodeDetails.postcode,
    city: nominatimSearchResponse.address.city,
    censusLocationLabel: nomisGeographyResponseMatchingItem.label,
    censusLocationCode: censusLocationCode,
    censusLocationIndex: nomisGeographyResponseMatchingItem.value
  }

  return addressDetails;
}

export class searchAddressService {
  public static search = search
}