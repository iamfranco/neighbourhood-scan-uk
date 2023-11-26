export interface DemographicData {
  ethnicity: {
    values: number[],
    labels: string[],
    total: number
  },
  age: {
    values: number[],
    labels: string[],
    total: number
  },
  surfaceAreaHectares: number
}

export const makeRandomDemographicData = (): DemographicData => ({
  ethnicity: {
    values: [...Array(5).keys()].map(() => Math.random()),
    labels: [...Array(5).keys()].map(() => Math.random().toString()),
    total: Math.random()
  },
  age: {
    values: [...Array(5).keys()].map(() => Math.random()),
    labels: [...Array(5).keys()].map(() => Math.random().toString()),
    total: Math.random()
  },
  surfaceAreaHectares: Math.random()
})