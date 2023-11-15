export interface NominatimSearchResponse {
  place_id: number,
  licence: string,
  lat: string,
  lon: string,
  place_rank: number,
  importance: number,
  name: string,
  display_name: string,
  address: {
    city: string,
    state_district: string,
    state: string,
    country: string
  },
  boundingbox: [number, number, number, number]
}

export const makeRandomNominatimSearchResponse = (): NominatimSearchResponse => ({
  place_id: Math.random(),
  licence: Math.random().toString(),
  lat: Math.random().toString(),
  lon: Math.random().toString(),
  place_rank: Math.random(),
  importance: Math.random(),
  name: Math.random().toString(),
  display_name: Math.random().toString(),
  address: {
    city: Math.random().toString(),
    state_district: Math.random().toString(),
    state: Math.random().toString(),
    country: Math.random().toString()
  },
  boundingbox: [Math.random(), Math.random(), Math.random(), Math.random()]
})