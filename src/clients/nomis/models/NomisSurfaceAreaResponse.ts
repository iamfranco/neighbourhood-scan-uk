export interface NomisSurfaceAreaResponse {
  error: string,
  updated: string,
  value: number[],
  dimension: {
    cell: {
      category: {
        index: { [id: string]: number },
        label: { [id: string]: string }
      }
    }
  }
}

export const makeRandomNomisSurfaceAreaResponse = (): NomisSurfaceAreaResponse => {  
  return {
    error: Math.random().toString(),
    updated: Math.random().toString(),
    value: [Math.random()],
    dimension: {
      cell: {
        category: {
          index: {
            "6": 0
          },
          label: {
            "6": "Area (Hectares)"
          }
        }
      }
    }
  }
}