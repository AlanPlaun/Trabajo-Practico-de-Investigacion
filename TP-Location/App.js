import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import getCurrentLocation from "./Components/geolocation";

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

  useEffect(() => {
    const obtenerDistancia = async () => {
      try {
        const posicion = await getCurrentLocation();
        setPosicionActual(posicion);

        const distancia = calcularDistancia(posicion, casaTia);
        setDistanciaCasaTia(distancia);
      } catch (error) {
        console.error("Error al obtener la ubicación:", error);
        // Puedes manejar el error de otra manera si es necesario
      }
    };

    obtenerDistancia();
  }, []);

  // Coordenadas geográficas de los lugares de interés
  const casaTia = { latitude: 8.520878126024456, longitude: -80.34593715413044 };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Distancia a la casa de tu tía: {distanciaCasaTia} metros</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default App;
