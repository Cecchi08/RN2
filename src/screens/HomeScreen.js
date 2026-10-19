import { Pressable, StyleSheet, Text, View } from 'react-native';
import Panel from '../components/Panel';
import { BodyText, Label, Title } from '../components/Typography';
import { useTheme } from '../theme/ThemeContext';

const MODULES = [
  ['01', 'Cámara + lector', 'Captura fotos y lee códigos QR o de barras.', 'camera'],
  ['02', 'Ubicación GPS', 'Coordenadas, precisión y rumbo en vivo.', 'location'],
  ['03', 'Acelerómetro', 'Aceleración del dispositivo en tres ejes.', 'sensors'],
  ['04', 'Giroscopio', 'Velocidad angular en los ejes X, Y y Z.', 'sensors'],
  ['05', 'Biometría', 'Verifica identidad con huella o rostro.', 'biometric'],
];

export default function HomeScreen({ compact, onNavigate }) {
  const { colors } = useTheme();
  return <>
    <Panel style={{ padding: compact ? 16 : 21 }}>
      <View style={styles.heroTop}><Label>MÓDULO DE EXPLORACIÓN / 01</Label><Label style={{ color: colors.cyan }}>v1.0</Label></View>
      <Text style={[styles.heroTitle, { color: colors.text, fontSize: compact ? 27 : 33 }]}>Tu dispositivo.{ '\n' }<Text style={{ color: colors.cyan }}>En tiempo real.</Text></Text>
      <BodyText>Un centro de pruebas para explorar las herramientas integradas de tu móvil.</BodyText>
      <View style={styles.statusLine}><View style={styles.onlineDot} /><Label style={{ color: colors.text }}>SISTEMA EN LÍNEA</Label><View style={{ flex: 1 }} /><Label>ANDROID · iOS</Label></View>
      <View style={[styles.metrics, { borderColor: colors.line }]}>
        {[["05", 'MÓDULOS'], ['GPS', 'POSICIÓN'], ['IMU', 'MOVIMIENTO']].map(([value, name]) => <View key={name} style={styles.metric}><Text style={[styles.metricValue, { color: colors.cyan }]}>{value}</Text><Label>{name}</Label></View>)}
      </View>
    </Panel>

    <View style={styles.sectionTitle}><Title>MÓDULOS DISPONIBLES</Title><Label>SELECCIONA PARA INICIAR</Label></View>
    <View style={styles.moduleGrid}>
      {MODULES.map(([number, name, description, destination]) => <Panel key={number} style={[styles.moduleCard, { flexBasis: compact ? '100%' : '46%' }]}>
        <Pressable onPress={() => onNavigate(destination)} style={styles.moduleButton}>
          <View style={styles.moduleTop}><Label>MODULE / {number}</Label><Text style={[styles.chevron, { color: colors.cyan }]}>↗</Text></View>
          <Text style={[styles.moduleTitle, { color: colors.text }]}>{name}</Text>
          <Text style={[styles.moduleDescription, { color: colors.muted }]}>{description}</Text>
        </Pressable>
      </Panel>)}
    </View>
    <Panel style={{ padding: 12 }}><View style={styles.note}><Text style={{ color: colors.red, fontSize: 17 }}>●</Text><BodyText style={styles.noteText}>Los permisos se solicitan al iniciar cada herramienta. Tus datos de prueba permanecen en el dispositivo.</BodyText></View></Panel>
  </>;
}

const styles = StyleSheet.create({
  heroTop: { flexDirection: 'row', justifyContent: 'space-between' },
  heroTitle: { fontWeight: '800', lineHeight: 39, marginTop: 20, marginBottom: 8, letterSpacing: -0.6 },
  statusLine: { flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 17 },
  onlineDot: { width: 7, height: 7, borderRadius: 5, backgroundColor: '#5cf0a0' },
  metrics: { borderTopWidth: 1, marginTop: 20, paddingTop: 14, flexDirection: 'row' },
  metric: { flex: 1, gap: 5 },
  metricValue: { fontSize: 15, fontWeight: '800', letterSpacing: 1 },
  sectionTitle: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  moduleGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  moduleCard: { padding: 14, flexGrow: 1 },
  moduleButton: { minHeight: 118 },
  moduleTop: { flexDirection: 'row', justifyContent: 'space-between' },
  chevron: { fontSize: 18, lineHeight: 14 },
  moduleTitle: { fontSize: 14, fontWeight: '700', marginTop: 16 },
  moduleDescription: { fontSize: 11, lineHeight: 16, marginTop: 5, maxWidth: 260 },
  note: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  noteText: { flex: 1, fontSize: 10, lineHeight: 15 },
});
