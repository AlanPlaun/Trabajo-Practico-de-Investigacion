import { useEffect, useState } from "react";
import { PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

// Inicialización de react-native-geolocation-service
Geolocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'whenInUse',
});

async function getCurrentLocation() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Permiso de ubicación',
                message: 'Necesitamos tu permiso para acceder a tu ubicación',
                buttonNeutral: 'Preguntar después',
                buttonNegative: 'Cancelar',
                buttonPositive: 'OK',
            },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return new Promise((resolve, reject) => {
                console.log(Geolocation.getCurrentPosition)
                Geolocation.getCurrentPosition(
                    (position) => {
                        console.log(position)
                        const { latitude, longitude } = position.coords;
                        console.log(latitude)
                        console.log(longitude)
                        resolve({ latitude, longitude });
                    },
                    (error) => {
                        console.error('Error en getCurrentPosition:', error);
                        reject(error);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );
            });
        } else {
            console.log('Permiso de ubicación denegado');
            throw new Error('Permiso de ubicación denegado');
        }
    } catch (err) {
        console.warn('Error en getCurrentLocation (try-catch):', err);
        throw err;
    }
}

export default getCurrentLocation;
