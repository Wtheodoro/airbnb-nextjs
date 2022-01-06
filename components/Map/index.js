import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';

const Map = ({ searchResults }) => {
  const [selectedLocation, setSelectedLocation] = useState({});
  // Transform the search results into a list of locations as geolib requires
  // [{ latitude: 52.516272, longitude: 13.377722 }]
  
  // direct return () => ({
    //  something
    //})
    
    //normal return () => {
    // return something
    //}
    const coordinates = searchResults.map((result) => ({
      latitude: result.lat,
      longitude: result.long,
    }))
    
    const center = getCenter(coordinates)
    
    const [viewport, setViewport] = useState({
      width: '100%',
      height: '100%',
      latitude: center.latitude,
      longitude: center.longitude,
      zoom: 11,
    })
  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapStyle='mapbox://styles/wteodoro/cky30850m1w4v14qjywodsx8o'
      mapboxApiAccessToken={process.env.MAPBOX_KEY}
    >
      {
        searchResults.map((result) => (
          <div key={`${result.long}_${result.lat}`}>
            <Marker
              latitude={result.lat}
              longitude={result.long}
              offsetLeft={-10}
            >
              <p
                role="img"
                className='cursor-pointer text-2xl animate-bounce'
                onClick={() => setSelectedLocation(result)}
                aria-label="push-pin"
              >
                📌
              </p>
            </Marker>
            {
              selectedLocation.long === result.long &&
              <Popup
                onClose={() => setSelectedLocation({})}
                closeOnClick
                latitude={result.lat}
                longitude={result.long}
              >
                {result.title}
              </Popup>
            }
          </div>
        ))
      }
    </ReactMapGL>
  )
}

export default Map