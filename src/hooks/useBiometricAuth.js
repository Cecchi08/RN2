import { useEffect, useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

// Comprueba al entrar si el teléfono ofrece lector de huellas.
export default function useBiometricAuth() {
  const [status, setStatus] = useState('COMPROBANDO HUELLA');
  const [busy, setBusy] = useState(false);

  // Muestra la disponibilidad sin esperar a que el usuario pulse el botón.
  useEffect(() => {
    let active = true;
    LocalAuthentication.supportedAuthenticationTypesAsync()
      .then((types) => {
        if (!active) return;
        const hasFingerprint = types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT);
        setStatus(hasFingerprint ? 'HUELLA DACTILAR DISPONIBLE' : 'HUELLA DACTILAR NO DISPONIBLE EN ESTE DISPOSITIVO');
      })
      .catch(() => {
        if (active) setStatus('HUELLA DACTILAR NO DISPONIBLE EN ESTE DISPOSITIVO');
      });
    return () => { active = false; };
  }, []);

  // Abre la autenticación del sistema solo si hay una huella registrada.
  const authenticate = async () => {
    setBusy(true);
    setStatus('COMPROBANDO HUELLA');
    try {
      const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
      const hasFingerprint = types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT);
      if (!hasFingerprint) {
        setStatus('HUELLA DACTILAR NO DISPONIBLE EN ESTE DISPOSITIVO');
        return;
      }
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      if (!enrolled) {
        setStatus('NO HAY HUELLA DACTILAR REGISTRADA');
        return;
      }
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Verifica tu huella dactilar',
        cancelLabel: 'Cancelar',
        fallbackLabel: 'Usar código del dispositivo',
        biometricsSecurityLevel: 'weak',
      });
      setStatus(result.success ? 'IDENTIDAD VERIFICADA' : 'VERIFICACIÓN CANCELADA');
    } catch {
      setStatus('ERROR DE AUTENTICACIÓN');
    } finally {
      setBusy(false);
    }
  };

  return { status, busy, authenticate };
}
