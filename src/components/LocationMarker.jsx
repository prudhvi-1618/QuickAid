import React,{useState} from 'react'
import { Marker,Popup,useMapEvents} from 'react-leaflet'

function LocationMarker({setUserLocation}) {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition(e.latlng);
        setUserLocation([lat,lng]);
        map.flyTo(e.latlng, map.getZoom());
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    // return position === null ? null : (
    //   <Marker position={position}>
    //     <Popup>From address Location</Popup>
    //   </Marker>
    // )
  }

  export default LocationMarker;