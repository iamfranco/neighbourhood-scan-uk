import { createContext, useEffect, useState } from 'react'
import './App.scss'
import SearchInput from './components/search-input/SearchInput'
import { AddressDetails } from './models/AddressDetails'

export const AddressContext = createContext<{
  address: AddressDetails | null, 
  setAddress: React.Dispatch<React.SetStateAction<AddressDetails | null>>
}>(null as any);

function App() {
  const [address, setAddress] = useState<AddressDetails | null>(null);

  useEffect(() => {
    console.log(address)
  }, [address])

  return (
    <AddressContext.Provider value={{address, setAddress}}>
      <h1>Neighbourhood Scan UK</h1>

      <SearchInput />

      <div>
        (lat, lon): {address && `(${address.latitude}, ${address.longitude})`} 
      </div>

      <div>
        Postcode: {address && address.postcode}
      </div>

      <div>
        City: {address && address.city}
      </div>
    </AddressContext.Provider>
  )
}

export default App
