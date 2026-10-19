import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export default function useLocationData() {
  const [location, setLocation] = useState(null);
  const [heading, setHeading] = useState(null);
  const [status, setStatus] = useState('LISTO PARA LEER');

  useEffect(() => {
    if (!location) return undefined;
    let active = true;
    let subscription;
    Location.watchHeadingAsync((value) => setHeading(value.trueHeading >= 0 ? value.trueHeading : value.magHeading))
      .then((value) => {
        if (active) subscription = value;
        else value.remove();
      })
      .catch(() => setHeading(null));
    return () => {
      active = false;
      subscription?.remove();
    };
  }, [location]);

  const readLocation = async () => {
    setStatus('SOLICITANDO PERMISO');
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (!permission.granted) {
        setStatus('PERMISO DENEGADO');
        return;
      }
      setStatus('BUSCANDO SEÑAL GPS');
      const result = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      setLocation(result);
      setStatus('SEÑAL ADQUIRIDA');
    } catch {
      setStatus('GPS NO DISPONIBLE');
    }
  };

  return { location, heading, status, readLocation };
}
