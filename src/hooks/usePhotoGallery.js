import { useState } from 'react';
import * as FileSystem from 'expo-file-system/legacy';
import { Asset, usePermissions } from 'expo-media-library';

// Gestiona el permiso y el guardado de una captura con el nombre elegido.
export default function usePhotoGallery() {
  const [permission, requestPermission] = usePermissions({ writeOnly: true, granularPermissions: ['photo'] });
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');
  const [savedName, setSavedName] = useState('');

  // Copia con nombre validado al caché y crea el elemento en la galería del sistema.
  const savePhoto = async (photoUri, requestedName) => {
    const baseName = requestedName.trim().replace(/\.jpe?g$/i, '');
    if (!baseName) {
      setStatus('INGRESA UN NOMBRE PARA LA FOTO');
      return false;
    }
    if (baseName.length > 60 || /[\\/:*?"<>|\u0000-\u001f]/.test(baseName)) {
      setStatus('USA HASTA 60 CARACTERES Y EVITA / \\ : * ? " < > |');
      return false;
    }

    setSaving(true);
    setSavedName('');
    setStatus('SOLICITANDO PERMISO DE GALERÍA');
    try {
      const permissionResult = permission?.granted ? permission : await requestPermission();
      if (!permissionResult?.granted) {
        setStatus('SIN PERMISO PARA GUARDAR EN LA GALERÍA');
        return false;
      }
      if (!FileSystem.cacheDirectory) throw new Error('No hay caché disponible.');

      const fileName = `${baseName}.jpg`;
      const encodedName = `${encodeURIComponent(baseName)}.jpg`;
      const destination = `${FileSystem.cacheDirectory}${encodedName}`;
      const existingFile = await FileSystem.getInfoAsync(destination);
      if (existingFile.exists) await FileSystem.deleteAsync(destination, { idempotent: true });
      await FileSystem.copyAsync({ from: photoUri, to: destination });
      await Asset.create(destination);

      setSavedName(fileName);
      setStatus('FOTO GUARDADA EN LA GALERÍA');
      return true;
    } catch {
      setStatus('NO SE PUDO GUARDAR. REVISA EL PERMISO DE GALERÍA');
      return false;
    } finally {
      setSaving(false);
    }
  };

  // Mantiene la imagen en la vista sin copiarla a la galería.
  const keepHere = () => {
    setSavedName('');
    setStatus('FOTO CONSERVADA EN ESTA VISTA');
  };

  const clearStatus = () => {
    setStatus('');
    setSavedName('');
  };

  return { permission, saving, status, savedName, savePhoto, keepHere, clearStatus };
}
