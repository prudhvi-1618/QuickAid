import React, { useState, useEffect } from 'react'

import LocationMarker from './LocationMarker';
import Booking  from './Booking';
import RoutingMachine from './RoutingMachine';

import 'leaflet/dist/leaflet.css';
import '../styles/App.css'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { Icon } from "leaflet"

import LocomotiveScroll from 'locomotive-scroll';
import { ToastContainer,toast } from 'react-toastify';

import {USERNAME} from '../constants';
import { connectUserSocket ,bookRide,subscribeToAcceptance } from '../utils/Socket';


const UserHome = () => {

  const [userLocation, setUserLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState(null);
  const [markers,setMarkers] = useState([]);

  const username = localStorage.getItem(USERNAME);

  useEffect(() => {
    const scroll = new LocomotiveScroll();
  }, []);

  // const markers = [
  //   {
  //     geoCode: [17.615377939002183, 83.08635078174933],
  //     PopUp: "You are at home"
  //   },
  //   {
  //     geoCode: [17.62887490030905, 83.08978932677337],
  //     PopUp: "You are at bus Stop No. 2"
  //   },
  //   {
  //     geoCode: [17.62077503583411, 83.07993409419143],
  //     PopUp: "You are at bus Stop No. 1"
  //   }
  // ]
  const CustomIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/10523/10523013.png",
    iconSize: [48, 48]
  })


  const handleReverseGeocode = async (latitude, longitude) => {
    try {
      if (!latitude || !longitude) {
        setAddress('Please provide both latitude and longitude.');
        return;
      }

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );

      if (!response.ok) {
        setAddressError('Error fetching geocode data');
        throw new Error('Error fetching geocode data');
      }

      const data = await response.json();

      if (data.error) {
        setAddressError('No address found for these coordinates.');
      } else {
        const place = data.display_name;
        setAddress(place);
      }
    } catch (error) {
      console.error('Error fetching geocode data', error);
      setAddressError('Failed to fetch address.');
    }
  };


  useEffect(() => {
    const fetchLocation = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setUserLocation([latitude, longitude]); 
            },
            (error) => {
              console.log(error);
            }
          );
        } else {
          console.log('Geolocation is not supported by this browser.');
        }
        
      } catch (error) {
        console.error('Error getting location:', error); 
      }
    };

    fetchLocation();
  }, []);

  const MapFlyTo = () => {
    const map = useMap();
    useEffect(() => {
      if (userLocation) {
        map.flyTo(userLocation, 15, { animate: true });
      }
    }, [userLocation, map]);

    return null;
  };

  useEffect(() => {
    userLocation ? handleReverseGeocode(userLocation[0], userLocation[1]) : null;
  }, [userLocation]);

  const [drivers, setDrivers] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [driverInfo, setDriverInfo] = useState(null);
  

  const [bookingSent, setBookingSent] = useState('');

  const handleBook = (e) => {
    e.preventDefault();
      if (!isConnected) {
        alert("Please wait for WebSocket connection.");
        return;
      }
  
      bookRide({
        username:username,
        latitude:userLocation[0],
        longitude:userLocation[1],
      });
      toast.success("Your Booking is successful. ")
      setBookingSent(true);
  };

  const [driverLocation, setDriverLocation] = useState(null); 

  useEffect(() => {
    connectUserSocket({
      username,
      onConnect: (frame) => {
        console.log('Connected to WebSocket', frame);
        setIsConnected(true);
  
        // ✅ Safe to subscribe only after connection is established
        subscribeToAcceptance({
          userUsername: username,
          onUserUpdate: (data) => {
            console.log('🚨 User received driver acceptance:', data);
            toast.success(`Driver ${data?.Driverusername} accepted your ride!`);
            setDriverInfo(data);
            setMarkers([{
                 geoCode: [data.latitude, data.longitude],
                 PopUp: `${data.vehicleNumber}`
             }]);
            setBookingSent(false);
            // Start listening to driver location after booking
            // subscribeToDriverLocation({
            //   driverUsername: data?.Driverusername, // pass driver username here
            //   onLocationUpdate: (location) => {
            //     console.log('📍 Driver location updated:', location);
            //     setDriverLocation([location.Latitude, location.Longitude]); // update driver's location
            //   },
            // });
          },
        });
      },
      onError: (error) => {
        console.error('WebSocket error:', error);
        setIsConnected(false);
      },
      onMessage: (data) => {
        console.log('Drivers Data:', data);
        setDrivers(data);
      },
    });
  }, [username]);

  

  
  return (
   <div>
    {!bookingSent?( <div  className='relative sm:mx-8 text-zinc-800 flex justify-center p-3'>
      {/* Map Container */}
      <div data-scroll data-scroll-speed="-0.8" className="container max-w-[1250px] flex justify-between gap-5">
      <MapContainer
        center={[17.6868, 83.2185]}
        zoom={10}
        scrollWheelZoom={true}
        className="map-container"
      >
        <TileLayer
          attribution="Ambulance Booking System"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markers.map((marker, index) => (
          <Marker key={index} position={marker.geoCode} icon={CustomIcon}>
            <Popup>{marker.PopUp}</Popup>
          </Marker>
        ))}

        {userLocation && (
          <Marker position={userLocation}>
            <Popup>Your Location</Popup>
          </Marker>
        )}

        <LocationMarker setUserLocation={setUserLocation} />
        <MapFlyTo />

        {/* Add this for path display */}
        {userLocation && driverInfo && (
          <RoutingMachine
            from={userLocation}
            to={[driverInfo.latitude, driverInfo.longitude]}
          />
        )}
      </MapContainer>

      </div>
      {/* User Ambulance Booking */}
      <div  className="content absolute max-w-[1300px] bottom-5 left-1/2 transform -translate-x-[50%] w-full h-[20vh] sm:h-[70px] z-[1000] ">
        <div className="h-[100vh] mt-7 bg-white rounded-t-3xl p-2 shadow-md z-[1000]">
          {/* line bar */}
          <div className="bar mt-4 flex justify-center items-center">
            <div className="sm:w-[10%] w-[25%] border-t-6 border-zinc-500 rounded-2xl "></div>
          </div>
          <div className="overflow-y-auto h-full">
            {driverInfo?(
              <div className=' w-[40vw]'>
                <div className="p-4  flex justify-between items-center">
                  <div className="text-2xl ">Name:</div>
                  <div className='text-xl' >{driverInfo.driverUsername}</div>
                  </div>
                <div className="p-4  flex justify-between items-center">
                  <div className="text-2xl">Vechile Number:</div>
                  <div className='text-xl' >{ driverInfo.vehicleNumber}</div>
                   </div>
                <div className="p-4 flex justify-between items-center ">
                  <div className="text-2xl">Phone Number:</div>
                  <div className='text-xl' >{ driverInfo.phone}</div>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <div className="text-2xl">Distance:</div>
                  <div className='text-xl'>{ driverInfo.distance} </div>
                  </div>
              </div>
            ):(
              <div>
                {/* Booking Form */}
                <Booking address={address} addressError={addressError} handleBook={handleBook} isConnected={isConnected}/>
                {/* Near By Amblances */}
                <div className='mx-2 sm:mx-8'>
                  <h1 className='text-3xl'>Near by Ambulances</h1>
                  {drivers ?(
                    <div className="shadow-md my-3 mx-1 p-3 rounded-2xl flex gap-4">
                    <div className="img w-[80px] h-[80px] bg-zinc-400 rounded-full "></div>
                    <div className="ambulance-details">
                      <h3 className='text-xl'>Driver Name : {drivers}</h3>
                      <div className="ambulance-no">Amubulance no : ######</div>
                      <div className="location">Hyderabad</div>
                    </div>
                  </div>
                  ): <div className='text-2xl font-medium text-center my-6 py-6'>There are no nearby Ambulances</div>}
                </div>
                  </div>
            )}
          </div>
        </div>

      </div>
      
    </div>):( <div className="m-4 p-4 border border-blue-300 bg-blue-50 rounded shadow">
    <h3 className="text-blue-600 font-semibold">🚑 Booking Request Sent</h3>
    <p className="mt-2">Please wait while we connect you to the nearest available driver.</p>
    <p className="text-sm text-gray-500 mt-1">You'll receive driver details once your request is accepted.</p>
    <div className="mt-4 animate-pulse text-blue-500">
      <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
      <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
      <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
    </div>
  </div>)}
  <ToastContainer />
   </div>
  )
}

export default UserHome;