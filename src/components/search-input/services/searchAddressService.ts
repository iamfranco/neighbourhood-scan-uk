import { nominatimClient } from "../../../clients/nominatim/nominatimClient";
import { nomisClient } from "../../../clients/nomis/nomisClient";
import { postcodesClient } from "../../../clients/postcodes/postcodesClient";
import { AddressDetails } from "../../../models/AddressDetails"

const search = async (address: string) : Promise<AddressDetails | null> => {
  const nominatimSearchResponse = await nominatimClient.search(address);
  if (nominatimSearchResponse == null) return null;

  const nomisGeographyType154Response = nomisClient.getGeographyType154Cached();
  const nomisGeographyType464Response = nomisClient.getGeographyType464Cached();
  
  const lat = nominatimSearchResponse.lat;
  const lon = nominatimSearchResponse.lon;

  const postcodesDetails = await postcodesClient.getPostcodeDetails(lat, lon);
  if (postcodesDetails == null) return null;

  const nearestPostcodeDetails = postcodesDetails.result[0];

  const censusLocationCode = nearestPostcodeDetails.codes.admin_district;
  const nomisGeographyType154ResponseMatchingItem = nomisGeographyType154Response.find(x => x.gss == censusLocationCode);
  const nomisGeographyType464ResponseMatchingItem = nomisGeographyType464Response.find(x => x.gss == censusLocationCode);

  if (nomisGeographyType154ResponseMatchingItem == undefined || nomisGeographyType464ResponseMatchingItem == undefined) {
    return null;
  }

  const addressDetails: AddressDetails = {
    latitude: nominatimSearchResponse.lat,
    longitude: nominatimSearchResponse.lon,
    postcode: nearestPostcodeDetails.postcode,
    city: nominatimSearchResponse.address.city,
    censusLocationLabel: nomisGeographyType154ResponseMatchingItem.label,
    censusLocationCode: censusLocationCode,
    censusLocationIndex: nomisGeographyType154ResponseMatchingItem.value,
    type464LocationIndex: nomisGeographyType464ResponseMatchingItem.value
  }

  return addressDetails;
}

export class searchAddressService {
  public static search = search
}