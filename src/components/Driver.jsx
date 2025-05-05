import React, { useState, useEffect } from 'react';
import {
  connectDriverSocket,
  sendDriverLiveLocation,
  disconnectDriverSocket,
  acceptRide,
  subscribeToAcceptance
} from '../utils/Socket';

import { USERNAME } from '../constants';
import { ToastContainer,toast } from 'react-toastify';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import RoutingMachine from '../components/RoutingMachine'; 
import 'leaflet/dist/leaflet.css';


const Driver = () => {
  const [incomingBooking, setIncomingBooking] = useState(null);
  const [location, setLocation] = useState(null);
  const [userLocation,setUserLocation] = useState([]);
  const [userId,setUserId] = useState(null);
  const [distance,setDistance] = useState(null);
  const username = localStorage.getItem(USERNAME);

  // Get driver location on load
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setLocation([latitude, longitude]);
            },
            (error) => {
              console.error("❌ Error getting location:", error);
            }
          );
        } else {
          console.log('❌ Geolocation is not supported by this browser.');
        }
      } catch (error) {
        console.error('❌ Error getting location:', error);
      }
    };

    fetchLocation();

    return () => {
      clearInterval(interval);
      disconnectDriverSocket();
    };
  }, []);

  // Connect to WebSocket and send location periodically
  useEffect(() => {
    if (!location) return;

    connectDriverSocket({
      driverUsername: username,
      onError: (err) => alert("⚠️ Location failed to save: " + JSON.stringify(err)),
      onAlert: (data) => {
        setUserId(data);
        const k = "New booking alert from "+data;
        toast.success(k);
        console.log("📩 New booking alert from user:", data);
      },
      onConnect: () => {
        console.log("🟢 Connected as driver:", username);
      }
    });
    const interval = setInterval(() => {
      sendDriverLiveLocation({
        username:username,
        latitude: location[0],
        longitude: location[1]
      });
    }, 1000*60*2);

    return () => {
      clearInterval(interval);
      disconnectDriverSocket();
    };
  }, [username, location]);

  const handleRide = (e)=>{
    acceptRide({
      userUsername: userId,
      driverUsername: username,
      latitude: location[0],
      longitude: location[1]
    });
    
    // Optional: listen to confirmation
    subscribeToAcceptance({
      driverUsername: username,
      onDriverUpdate: (data) => {
        setUserLocation([data.latitude,data.longitude]);
        setDistance(data.distance);
        console.log("User info received after accepting ride:", data);
        toast.success("Sent Acceptance request to user");
      }
    });    

    // const intervalId = setInterval(() => {
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(
    //       (position) => {
    //         const { latitude, longitude } = position.coords;
  
    //         // Send fresh location to backend
    //         sendDriverLiveLocation({
    //           userUsername:userId,
    //           driverUsername: username,
    //           latitude,
    //           longitude
    //         });
    //       },
    //       (error) => {
    //         console.error("❌ Error getting live position:", error);
    //       }
    //     );
    //   }
    // }, 3000);
  
    // Save interval cleanup function
    // setStopLiveUpdatesFn(() => () => clearInterval(intervalId));
    
  }

  
  return (
    <div>
      <div className='flex flex-col items-center'>
        <h2 className="text-6xl m-5">🚑 Driver Dashboard</h2>
  
        {userId && userLocation.length <= 0 ? (
          <div className="mt-4 p-4 shadow-md rounded-2xl w-[50vw]">
            <div className='w-full text-end flex justify-end'>
              <div className='bg-zinc-900 w-5 h-5 rounded-full'/>
            </div>
            <div className='flex gap-5 px-6 py-3 '>
              <div className='text-2xl font-medium'>User :</div>
              <div className="text-2xl">{userId}</div>
            </div>
            <div className='w-full text-end flex justify-end'>
              <button
                type="button"
                onClick={handleRide}
                className='w-fit px-4 py-2 bg-green-500 text-2xl rounded-2xl'>
                Accept
              </button>
            </div>
          </div>
        ) : (
         <div>
          {(userLocation.length <= 0) && <p>No incoming bookings yet.</p>}
         </div>
        )}
      </div>
  
      {/*  Route Map */}
      {location && userLocation.length > 0 && (
        <div className='my-6'>
          <MapContainer
            center={location}
            zoom={13}
            style={{ height: "400px", width: "80%", margin: "0 auto", borderRadius: "10px" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={location}>
              <Popup>Driver Location</Popup>
            </Marker>
            <Marker position={userLocation}>
              <Popup>User Pickup Location</Popup>
            </Marker>
            <RoutingMachine from={location} to={userLocation} />
          </MapContainer>
        </div>
      )}
  
      <ToastContainer />
    </div>
  );
  
};

export default Driver;