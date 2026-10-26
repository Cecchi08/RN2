import { useRef, useState } from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import ActionButton from '../components/ActionButton';
import Panel from '../components/Panel';
import SectionHeader from '../components/SectionHeader';
import { BodyText, Label } from '../components/Typography';
import usePhotoGallery from '../hooks/usePhotoGallery';
import { useTheme } from '../theme/ThemeContext';

// Controla vista previa, lector y captura; el hook de galería se ocupa de permisos y guardado.
export default function CameraScreen() {
  const { colors } = useTheme();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoName, setPhotoName] = useState('');
  const [facing, setFacing] = useState('back');
  const [torch, setTorch] = useState(false);
  const cameraRef = useRef(null);
  const scannedRef = useRef(false);
  const gallery = usePhotoGallery();

  // Evita mostrar el callback repetidamente cuando el mismo código permanece en cuadro.
  const handleBarcode = ({ data, type }) => {
    if (scannedRef.current) return;
    scannedRef.current = true;
    setScanResult({ data, type });
    setScanning(false);
  };

  const takePhoto = async () => {
    try {
      const result = await cameraRef.current?.takePictureAsync({ quality: 0.75 });
      if (result?.uri) {
        setPhoto(result.uri);
        setPhotoName(`SensorLab_${new Date().toISOString().slice(0, 19).replace(/[-:T]/g, '')}`);
        gallery.clearStatus();
      }
    } catch {
      setPhoto(null);
    }
  };

  return <>
    <Panel>
      <SectionHeader title="CÁMARA Y LECTOR" detail="MODULE / 01" />
      <BodyText style={{ marginBottom: 14 }}>Toma una fotografía o activa la lectura de códigos QR y de barras.</BodyText>
      {!permission ? <ActivityIndicator color={colors.cyan} /> : !permission.granted ? (
        <View style={[styles.permissionBox, { borderColor: colors.line }]}><Label>CÁMARA BLOQUEADA</Label><ActionButton title="AUTORIZAR CÁMARA" onPress={requestPermission} /></View>
      ) : <>
        <View style={styles.cameraFrame}>
          <CameraView ref={cameraRef} style={StyleSheet.absoluteFill} facing={facing} enableTorch={torch}
            barcodeScannerSettings={{ barcodeTypes: ['qr', 'ean13', 'ean8', 'code128', 'code39', 'upc_a', 'upc_e', 'pdf417'] }}
            onBarcodeScanned={scanning ? handleBarcode : undefined} />
          <View pointerEvents="none" style={styles.scanFrame}>
            <View style={[styles.scanCorner, styles.tl, { borderColor: colors.cyan }]} /><View style={[styles.scanCorner, styles.tr, { borderColor: colors.cyan }]} />
            <View style={[styles.scanCorner, styles.bl, { borderColor: colors.cyan }]} /><View style={[styles.scanCorner, styles.br, { borderColor: colors.cyan }]} />
          </View>
          <View style={styles.cameraTag}><Text style={styles.cameraTagText}>{scanning ? 'LECTOR ACTIVO' : 'VISTA EN VIVO'}</Text></View>
        </View>
        <View style={styles.buttonRow}>
          <ActionButton title={scanning ? 'DETENER LECTOR' : 'LEER CÓDIGO'} onPress={() => { scannedRef.current = false; setScanResult(null); setScanning((value) => !value); }} />
          <ActionButton title="CAPTURAR" onPress={takePhoto} secondary />
        </View>
        <View style={styles.buttonRow}>
          <ActionButton title={facing === 'back' ? 'CÁMARA FRONTAL' : 'CÁMARA TRASERA'} onPress={() => setFacing((value) => value === 'back' ? 'front' : 'back')} secondary />
          <ActionButton title={torch ? 'LINTERNA ON' : 'LINTERNA OFF'} onPress={() => setTorch((value) => !value)} secondary />
        </View>
      </>}
    </Panel>
    {scanResult ? <Panel><SectionHeader title="CÓDIGO DETECTADO" detail={scanResult.type.toUpperCase()} /><Text selectable style={[styles.resultText, { color: colors.text }]}>{scanResult.data}</Text></Panel> : null}
    {photo ? <Panel>
      <SectionHeader title="ÚLTIMA CAPTURA" detail="VISTA PREVIA" />
      <Image source={{ uri: photo }} style={styles.photoPreview} resizeMode="cover" />
      <Label style={styles.inputLabel}>NOMBRE DEL ARCHIVO</Label>
      <TextInput
        accessibilityLabel="Nombre de la imagen"
        value={photoName}
        onChangeText={(value) => { setPhotoName(value); gallery.clearStatus(); }}
        placeholder="Escribe un nombre"
        placeholderTextColor={colors.muted}
        autoCapitalize="none"
        maxLength={65}
        style={[styles.nameInput, { color: colors.text, borderColor: colors.line, backgroundColor: colors.panel2 }]}
      />
      <View style={styles.buttonRow}>
        <ActionButton title={gallery.saving ? 'GUARDANDO…' : 'GUARDAR EN GALERÍA'} onPress={() => gallery.savePhoto(photo, photoName)} disabled={gallery.saving} />
        <ActionButton title="CONSERVAR AQUÍ" onPress={gallery.keepHere} secondary disabled={gallery.saving} />
      </View>
      {gallery.status ? <Text accessibilityLiveRegion="polite" style={[styles.galleryStatus, { color: gallery.savedName ? '#5cf0a0' : colors.muted }]}>{gallery.status}{gallery.savedName ? ` · ${gallery.savedName}` : ''}</Text> : null}
    </Panel> : null}
  </>;
}

const styles = StyleSheet.create({
  permissionBox: { minHeight: 138, borderWidth: 1, alignItems: 'center', justifyContent: 'center', gap: 14, padding: 16 },
  cameraFrame: { height: 300, backgroundColor: '#02070b', overflow: 'hidden', position: 'relative' },
  scanFrame: { position: 'absolute', left: '20%', right: '20%', top: '22%', bottom: '22%' },
  scanCorner: { position: 'absolute', width: 23, height: 23, borderWidth: 2 },
  tl: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
  tr: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
  bl: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
  br: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },
  cameraTag: { position: 'absolute', top: 11, left: 11, backgroundColor: '#061018cc', paddingHorizontal: 9, paddingVertical: 6 },
  cameraTagText: { color: '#36d9f5', fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  buttonRow: { flexDirection: 'row', gap: 9, marginTop: 9 },
  resultText: { fontSize: 14, lineHeight: 21 },
  photoPreview: { width: '100%', height: 200 },
  inputLabel: { marginTop: 14, marginBottom: 7 },
  nameInput: { minHeight: 44, borderWidth: 1, paddingHorizontal: 11, fontSize: 13 },
  galleryStatus: { fontSize: 10, lineHeight: 16, marginTop: 10, letterSpacing: 0.5 },
});
