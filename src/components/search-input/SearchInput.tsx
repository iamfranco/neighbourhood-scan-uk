import { ChangeEvent, useContext, useState } from 'react'
import { searchAddressService } from './services/searchAddressService'
import { AddressContext } from '../../App';
import { demographicService } from '../../services/demographicService/demographicService';

const SearchInput = () => {
  const {setAddress, setDemographicData} = useContext(AddressContext);

  const [addressText, setAddressText] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const addressText = e.target.value;
    setAddressText(addressText)
  }

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const addressDetails = await searchAddressService.search(addressText);
    setAddress(addressDetails);

    if (addressDetails == null) return;

    const demographicData = await demographicService.getDemographicData(addressDetails.censusLocationIndex);
    setDemographicData(demographicData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleChange} />
      <button>Submit</button>
    </form>
  )
}

export default SearchInput