import { DemographicData, makeRandomDemographicData } from "../services/demographicService/models/DemographicData"

export interface AddressDetails {
  latitude: string,
  longitude: string,
  postcode: string,
  city: string,
  censusLocationLabel: string,
  censusLocationCode: string,
  censusLocationIndex: number,
  type464LocationIndex: number,
  demographicData?: DemographicData | null
}

export const makeRandomAddressDetails = () : AddressDetails => ({
  latitude: Math.random().toString(),
  longitude: Math.random().toString(),
  postcode: Math.random().toString(),
  city: Math.random().toString(),
  censusLocationLabel: Math.random().toString(),
  censusLocationCode: Math.random().toString(),
  censusLocationIndex: Math.random(),
  type464LocationIndex: Math.random(),
  demographicData: makeRandomDemographicData()
})