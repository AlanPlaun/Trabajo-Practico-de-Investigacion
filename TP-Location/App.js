import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import useCurrentLocation from "./Components/geolocation";

function calcularDistancia(posicionActual, lugar) {
  const radioTierra = 6371; // Radio de la Tierra en kilómetros

  const lat1 = posicionActual.latitude;
  const lon1 = posicionActual.longitude;
  const lat2 = lugar.latitude;
  const lon2 = lugar.longitude;

  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distancia = radioTierra * c;

  return distancia;
}

function App() {
  const [distanciaCasaTia, setDistanciaCasaTia] = useState(0);
  const [posicionActual, setPosicionActual] = useState(null);

  const location = useCurrentLocation();

  useEffect(() => {
    if (location) {
      setPosicionActual(location);

      const distancia = calcularDistancia(location, casaTia);
      setDistanciaCasaTia(distancia);
    }
  }, [location]);

  // Coordenadas geográficas de los lugares de interés
  const casaTia = { latitude: 8.520878126024456, longitude: -80.34593715413044 };

  return (
    <View style={styles.container}>
      <Text>Bienvenidos!</Text>
      {/*<View
        style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
        <Button title="Get Location" onPress={getCurrentLocation} />
      </View>
      <Text>Latitude: {location ? location.coords.latitude : null}</Text>
      <Text>Longitude: {location ? location.coords.longitude : null}</Text>
      <View
        style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
        <Button title="Send Location" />
        </View>*/}
      <Text style={styles.title}>Distancia a la casa de tu tía: {distanciaCasaTia} metros</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default App;
