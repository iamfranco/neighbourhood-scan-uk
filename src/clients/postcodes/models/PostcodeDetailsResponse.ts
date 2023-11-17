export interface PostcodeDetailsResponse {
  status: number,
  result: {
    postcode: string,
    longitude: number,
    latitude: number
    codes: {
      admin_district: string
    }
  }[]
}

export const makeRandomPostcodeDetailsResponse = (): PostcodeDetailsResponse => ({
  status: Math.random(),
  result: [{
    postcode: Math.random().toString(),
    longitude: Math.random(),
    latitude: Math.random(),
    codes: {
      admin_district: Math.random().toString()
    }
  }]
})