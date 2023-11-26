import { describe, expect, it } from "vitest";
import { makeRandomNomisAgeResponse } from "../../clients/nomis/models/NomisAgeResponse";
import { nomisResponseService } from "./nomisResponseService";

describe('nomisResponseService', () => {
  it('Given nomisAgeResponse, when simplifyAgeData, then return simplifiedAgeData', () => {
    // Arrange
    const nomisAgeResponse = makeRandomNomisAgeResponse();

    // Act
    const result = nomisResponseService.simplifyAgeData(nomisAgeResponse);

    // Assert
    const expectedValue: number[] = [];
    for (var i=0; i<20; i++) {
      var index = i*5;
      expectedValue.push(
        nomisAgeResponse.value[index] + 
        nomisAgeResponse.value[index + 1] + 
        nomisAgeResponse.value[index + 2] + 
        nomisAgeResponse.value[index + 3] + 
        nomisAgeResponse.value[index + 4]
      );
    }

    expectedValue[expectedValue.length - 1] += nomisAgeResponse.value[nomisAgeResponse.value.length - 1];

    expect(result.value).toEqual(expectedValue);

    expect(result.label).toEqual([
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
      "95 years or above",
    ]);
  })
})