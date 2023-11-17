export interface NomisEthnicityResponse {
  error: string,
  updated: string,
  value: number[],
  dimension: {
    c2021_eth_20: {
      label: string,
      category: {
        index: { [id: string]: number },
        label: { [id: string]: string }
      }
    }
  }
}

export const makeRandomNomisEthnicityResponse = () => ({
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
    c2021_eth_20: {
      label: Math.random().toString(),
      category: {
        index: {
          "1001": 1,
          "1002": 2,
          "1003": 3,
          "1004": 4,
          "1005": 5
        },
        label: {
          "1001": "Asian, Asian British or Asian Welsh",
          "1002": "Black, Black British, Black Welsh, Caribbean or African",
          "1003": "Mixed or Multiple ethnic groups",
          "1004": "White",
          "1005": "Other ethnic group"
        }
      }
    }
  }
})