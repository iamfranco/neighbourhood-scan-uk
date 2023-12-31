import { createContext, useEffect, useState } from 'react'
import './App.scss'
import SearchInput from './components/search-input/SearchInput'
import { AddressDetails } from './models/AddressDetails'
import BarChart from './components/bar-chart/BarChart'

export const AddressContext = createContext<{
  address: AddressDetails | null, 
  setAddress: React.Dispatch<React.SetStateAction<AddressDetails | null>>
}>(null as any);

function App() {
  const [address1, setAddress1] = useState<AddressDetails | null>(null);
  const [address2, setAddress2] = useState<AddressDetails | null>(null);

  useEffect(() => {
    console.log(address1);
    console.log(address2);
  }, [address1, address2])

  const getMap = (address: AddressDetails | null) => {
    if (address == null) return <div className='full-width'></div>

    return <div className='full-width'>
      <div className='map-title'>
        {address.censusLocationLabel}
      </div>
      <iframe
        className='full-width'
        referrerPolicy={'no-referrer-when-downgrade'}
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCNJoGMJ6ZYYZCXgg1ggqwGGQp9iAiltjo&q=(${address.latitude},${address.longitude})`}
        >
      </iframe>
    </div>
  }

  const demographicData1 = address1 && address1.demographicData;
  const demographicData2 = address2 && address2.demographicData;

  const barCharts = (demographicData1 || demographicData2) && <>
    <div className='line-chart-container'>
      <BarChart 
        labels={demographicData1?.ethnicity.labels || demographicData2?.ethnicity.labels as string[]} 
        v1={demographicData1 ? demographicData1.ethnicity.values.map(x => x / demographicData1.ethnicity.total * 100) : []} 
        v2={demographicData2 ? demographicData2.ethnicity.values.map(x => x / demographicData2.ethnicity.total * 100) : []} 
        v1Label={address1?.censusLocationLabel}
        v2Label={address2?.censusLocationLabel}
        isHorizontal />
    </div>

    <div className='line-chart-container'>
      <BarChart 
        labels={demographicData1?.age.labels || demographicData2?.age.labels as string[]} 
        v1={demographicData1 ? demographicData1.age.values.map(x => x / demographicData1.age.total * 100) : []} 
        v2={demographicData2 ? demographicData2.age.values.map(x => x / demographicData2.age.total * 100) : []} 
        v1Label={address1?.censusLocationLabel}
        v2Label={address2?.censusLocationLabel}
        isHorizontal />
    </div>
  </>

  return (
    <div id='container'>
      <AddressContext.Provider value={{address: address1, setAddress: setAddress1}}>
        <h1>Neighbourhood Scan UK</h1>

        <p id='intro-description'>
          Getting local population demographic data, internet speed, crime data
        </p>

        <div className='column-container'>
          <SearchInput setAddress={setAddress1} />
          <SearchInput setAddress={setAddress2} />
        </div>

        <div className='column-container'>
          {getMap(address1)}
          {getMap(address2)}
        </div>

        {barCharts}

      </AddressContext.Provider>
    </div>
  )
}

export default App
