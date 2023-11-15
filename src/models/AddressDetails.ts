export interface AddressDetails {
  latitude: string,
  longitude: string
}

export const makeRandomAddressDetails = () : AddressDetails => ({
  latitude: Math.random().toString(),
  longitude: Math.random().toString()
})