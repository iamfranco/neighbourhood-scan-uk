import { ChangeEvent, useState } from 'react';
import { searchAddressService } from './services/searchAddressService';
import { demographicService } from '../../services/demographicService/demographicService';
import { addressDetailsBuilder } from '../../services/addressDetailsBuilder/addressDetailsBuilder';
import { AddressDetails } from '../../models/AddressDetails';
import LoadingSpinner from '../loading-spinner/LoadingSpinner';
import { FetchStatus } from '../../models/FetchStatus';
import './SearchInput.scss';

interface Props {
  setAddress: React.Dispatch<React.SetStateAction<AddressDetails | null>>
}

const SearchInput = ({setAddress}: Props) => {
  const [addressText, setAddressText] = useState('');

  const [addressDetailsFetchStatus, setAddressDetailsFetchStatus] = useState(FetchStatus.BeforeFetching);
  const [demographicDataFetchStatus, setDemographicDataFetchStatus] = useState(FetchStatus.BeforeFetching);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const addressText = e.target.value;
    setAddressText(addressText)
  }

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAddressDetailsFetchStatus(FetchStatus.Fetching);
    setDemographicDataFetchStatus(FetchStatus.Fetching);
    
    const addressDetails = await searchAddressService.search(addressText);
    if (addressDetails == null) {
      setAddressDetailsFetchStatus(FetchStatus.Error);
      setDemographicDataFetchStatus(FetchStatus.Error);
      return;
    }
    setAddressDetailsFetchStatus(FetchStatus.Done);

    setAddress(addressDetails);

    const demographicData = await demographicService.getDemographicData(addressDetails.censusLocationIndex, addressDetails.type464LocationIndex);
    if (demographicData == null) {
      setDemographicDataFetchStatus(FetchStatus.Error);
      return;
    }

    setDemographicDataFetchStatus(FetchStatus.Done);

    const addressDetailsWithDemographicData = addressDetailsBuilder.addDemographicData(addressDetails, demographicData);
    setAddress(addressDetailsWithDemographicData);
  }

  const getLoadingIcon = (fetchStatus: FetchStatus) => {
    if (fetchStatus == FetchStatus.Fetching) return <LoadingSpinner />;
    if (fetchStatus == FetchStatus.Done) return '✅';
    if (fetchStatus == FetchStatus.Error) return '❌';

    return '';
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} />
      </form>

      <div className='align-right'>
        address details {getLoadingIcon(addressDetailsFetchStatus)}
      </div>
      <div className='align-right'>
        demographic data {getLoadingIcon(demographicDataFetchStatus)}
      </div>
    </div>
  )
}

export default SearchInput