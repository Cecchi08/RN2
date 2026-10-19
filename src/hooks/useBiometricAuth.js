import { useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

export default function useBiometricAuth() {
  const [status, setStatus] = useState('SIN VERIFICAR');
  const [busy, setBusy] = useState(false);

  const authenticate = async () => {
    setBusy(true);
    setStatus('COMPROBANDO SENSOR');
    try {
      const available = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      if (!available || !enrolled) {
        setStatus(!available ? 'SENSOR NO DISPONIBLE' : 'SIN BIOMETRÍA REGISTRADA');
        return;
      }
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Verifica tu identidad',
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
