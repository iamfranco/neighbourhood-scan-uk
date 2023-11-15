import { ChangeEvent, useContext, useState } from 'react'
import { searchAddressService } from './services/searchAddressService'
import { AddressContext } from '../../App';

const SearchInput = () => {
  const {setAddress} = useContext(AddressContext);

  const [addressText, setAddressText] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const addressText = e.target.value;
    setAddressText(addressText)
  }

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const addressDetails = await searchAddressService.search(addressText);
    setAddress(addressDetails);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleChange} />
      <button>Submit</button>
    </form>
  )
}

export default SearchInput