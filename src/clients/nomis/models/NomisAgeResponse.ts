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

export const makeRandomNomisAgeResponse = (): NomisAgeResponse => {
  var indices: {[id: string]: number} = {};
  var labels: {[id: string]: string} = {};
  for (var i=0; i<101; i++) {
    indices[i+1] = 0;
    labels[i+1] = `Aged ${i} year`;
  }
  labels[1] = "Aged under 1 year";
  labels[2] = "Aged 1 year";
  
  return {
    error: Math.random().toString(),
    updated: Math.random().toString(),
    value: [...Array(101).keys()].map(() => Math.random()),
    dimension: {
      c2021_age_102: {
        label: Math.random().toString(),
        category: {
          index: indices,
          label: labels
        }
      }
    }
  }
}