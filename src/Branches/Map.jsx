import React, { useState, useCallback, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './Map.scss';
function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
  
      if (delay !== null) {
        const intervalId = setInterval(tick, delay);
        return () => clearInterval(intervalId);
      }
    }, [delay]);
  }
const Maps = () => {
  const [currentLocation, setCurrentLocation] = useState(null);

  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);

  const mapStyles = {
    height: '620px',
    width: '85%',
    marginTop: '-1130px', // Add margin top
    marginLeft: '255px', // Add margin left
    
  };

  const defaultCenter = {
    lat: 40.7128,
    lng: -74.0060,
  };
  const handleGetLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          if (mapRef.current) {
            mapRef.current.panTo({ lat: latitude, lng: longitude });
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser.');
    }
  };

  
  const handleApiloaded = (map) => {
    mapRef.current = map;
  };
  
  const [showBranches, setShowBranches] = useState(false);
  const handleBranchesClick = () => {
    const firstBranchMarker = { lat: 31.552938165859935, lng: 35.09814945767128 };
    const secondBranchMarker = { lat: 31.532651327684096, lng: 35.09804192447833 };

    if (!showBranches) {
      setMarkers([firstBranchMarker, secondBranchMarker]);
      setShowBranches(true);
    } else {
      setMarkers([]);
      setShowBranches(false);
    }

    if (mapRef.current) {
      const zoomLevel = 3; // Set your desired zoom level here
      mapRef.current.setZoom(zoomLevel);
      mapRef.current.panTo(firstBranchMarker); // Center the map to the first branch marker
    }
  };

  return (
    <div className="container">
    <div className="button-container">
      <button onClick={handleGetLocationClick}>Get My Location</button>
      <button onClick={handleBranchesClick}>Branches</button>
    </div>
  
    <div className="map-container">
      <LoadScript googleMapsApiKey="AIzaSyDnF2nn5_JAQoo6xsUYixIQB0Dru7YU-_0" onLoad={handleApiloaded}>
        <GoogleMap
          mapContainerStyle={{
            width: '100%',
            height: '100%',
          }}
          zoom={10}
          center={currentLocation || defaultCenter}
          onLoad={handleApiloaded}
          options={{
            zoomControl: true,
            fullscreenControl: false,
          }}
        >
          {currentLocation && <Marker position={currentLocation} />}
          {markers.map((marker, index) => (
            <Marker key={index} position={marker} />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  </div>
  
  );
};

export default Maps;
