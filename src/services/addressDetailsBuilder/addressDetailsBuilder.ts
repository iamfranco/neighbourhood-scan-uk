import { produce } from "immer";
import { AddressDetails } from "../../models/AddressDetails";
import { DemographicData } from "../demographicService/models/DemographicData";

const addDemographicData = (addressDetails: AddressDetails, demographicData: DemographicData): AddressDetails => {
  const addressDetailsPopulated = produce(addressDetails, draft => {
    draft.demographicData = demographicData
  })

  return addressDetailsPopulated;
}

export class addressDetailsBuilder {
  public static addDemographicData = addDemographicData
}