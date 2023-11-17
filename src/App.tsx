import { createContext, useEffect, useState } from 'react'
import './App.scss'
import SearchInput from './components/search-input/SearchInput'
import { AddressDetails } from './models/AddressDetails'
import { DemographicData } from './services/demographicService/models/DemographicData';

export const AddressContext = createContext<{
  address: AddressDetails | null, 
  setAddress: React.Dispatch<React.SetStateAction<AddressDetails | null>>,
  setDemographicData: React.Dispatch<React.SetStateAction<DemographicData | null>>
}>(null as any);

function App() {
  const [address, setAddress] = useState<AddressDetails | null>(null);
  const [demographicData, setDemographicData] = useState<DemographicData | null>(null);

  useEffect(() => {
    console.log(address);
    console.log(demographicData);
  }, [address, demographicData])

  return (
    <AddressContext.Provider value={{address, setAddress, setDemographicData}}>
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

      <div>
        Census Location Label: {address && address.censusLocationLabel}
      </div>

      <div>
        Census Location Code: {address && address.censusLocationCode}
      </div>

      <div>
        Census Location Index: {address && address.censusLocationIndex}
      </div>
    </AddressContext.Provider>
  )
}

export default App
