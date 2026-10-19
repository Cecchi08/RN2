import { useEffect, useState } from 'react';
import { Accelerometer, Gyroscope } from 'expo-sensors';

const EMPTY_READING = { x: 0, y: 0, z: 0 };

export default function useDeviceSensors() {
  const [accelerometer, setAccelerometer] = useState(EMPTY_READING);
  const [gyroscope, setGyroscope] = useState(EMPTY_READING);

  useEffect(() => {
    Accelerometer.setUpdateInterval(250);
    Gyroscope.setUpdateInterval(250);
    const accelerometerSubscription = Accelerometer.addListener(setAccelerometer);
    const gyroscopeSubscription = Gyroscope.addListener(setGyroscope);
    return () => {
      accelerometerSubscription.remove();
      gyroscopeSubscription.remove();
    };
  }, []);

  return { accelerometer, gyroscope };
}
