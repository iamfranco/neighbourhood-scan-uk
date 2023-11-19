export interface NomisAgeResponse {
  error: string,
  updated: string,
  value: number[],
  dimension: {
    c2021_age_102: {
      label: string,
      category: {
        index: { [id: string]: number },
        label: { [id: string]: string }
      }
    }
  }
}

export const makeRandomNomisAgeResponse = (): NomisAgeResponse => ({
  error: Math.random().toString(),
  updated: Math.random().toString(),
  value: [
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random()
  ],
  dimension: {
    c2021_age_102: {
      label: Math.random().toString(),
      category: {
        index: {
          "1": 0,
          "2": 1,
          "3": 2,
          "4": 3,
          "5": 4
        },
        label: {
          "1": "Aged under 1 year",
          "2": "Aged 1 year",
          "3": "Aged 2 years",
          "4": "Aged 3 years",
          "5": "Aged 4 years"
        }
      }
    }
  }
})