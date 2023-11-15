export interface AddressDetails {
  latitude: string,
  longitude: string,
  postcode: string,
  city: string
}

export const makeRandomAddressDetails = () : AddressDetails => ({
  latitude: Math.random().toString(),
  longitude: Math.random().toString(),
  postcode: Math.random().toString(),
  city: Math.random().toString()
})