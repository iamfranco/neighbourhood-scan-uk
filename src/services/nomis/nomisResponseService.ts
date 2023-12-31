import { NomisAgeResponse } from "../../clients/nomis/models/NomisAgeResponse";

const simplifyAgeData = (nomisAgeResponse: NomisAgeResponse): {label: string[], value: number[]} => {
  const label: string[] = [
    "4 years or under",
    "5 to 9 years",
    "10 to 14 years",
    "15 to 19 years",
    "20 to 24 years",
    "25 to 29 years",
    "30 to 34 years",
    "35 to 39 years",
    "40 to 44 years",
    "45 to 49 years",
    "50 to 54 years",
    "55 to 59 years",
    "60 to 64 years",
    "65 to 69 years",
    "70 to 74 years",
    "75 to 79 years",
    "80 to 84 years",
    "85 to 89 years",
    "90 to 94 years",
    "95 years or above"
  ]
  const value = [...Array(20)].map((_, index) => nomisAgeResponse.value.slice(index * 5, index * 5 + 5).reduce((x, y) => x + y));
  value[value.length - 1] += nomisAgeResponse.value[nomisAgeResponse.value.length - 1];

  return {label: label, value: value}
}

export class nomisResponseService {
  public static simplifyAgeData = simplifyAgeData
}