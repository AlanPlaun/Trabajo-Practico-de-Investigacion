import { useEffect, useState } from "react";
import { PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

function useCurrentLocation() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Geolocation Permission',
            message: 'Can we access your location?',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Ensure that Geolocation is available before calling getCurrentPosition
          if (Geolocation) {
            Geolocation.getCurrentPosition(
              position => {
                setLocation(position);
              },
              error => {
                console.log(error.code, error.message);
                setLocation(null);
              },
              { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
            );
          } else {
            console.error('Geolocation is not available.');
            setLocation(null);
          }
        } else {
          console.log('Location permission denied');
          setLocation(null);
        }
      } catch (err) {
        console.error(err);
        setLocation(null);
      }
    };

    requestLocationPermission();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  return location;
}

export default useCurrentLocation;