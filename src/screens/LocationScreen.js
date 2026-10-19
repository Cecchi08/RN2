import { StyleSheet, Text, View } from 'react-native';
import ActionButton from '../components/ActionButton';
import Panel from '../components/Panel';
import SectionHeader from '../components/SectionHeader';
import { BodyText, Label } from '../components/Typography';
import StatusDot from '../components/StatusDot';
import useLocationData from '../hooks/useLocationData';
import { formatNumber } from '../utils/format';
import { useTheme } from '../theme/ThemeContext';

export default function LocationScreen() {
  const { colors } = useTheme();
  const { location, heading, status, readLocation } = useLocationData();

  return <>
    <Panel>
      <SectionHeader title="POSICIÓN GPS" detail="MODULE / 02" />
      <View style={styles.radar}>
        {[208, 146, 80].map((size) => <View key={size} style={[styles.ring, { width: size, height: size, borderColor: colors.line }]} />)}
        <View style={[styles.crossH, { backgroundColor: colors.line }]} /><View style={[styles.crossV, { backgroundColor: colors.line }]} />
        <View style={[styles.center, { backgroundColor: colors.cyan }]} /><Text style={[styles.north, { color: colors.muted }]}>N</Text>
      </View>
      <View style={styles.statusLine}><StatusDot color={location ? '#5cf0a0' : colors.red} /><Label style={{ color: location ? colors.cyan : colors.muted }}>{status}</Label></View>
      <ActionButton title={location ? 'ACTUALIZAR UBICACIÓN' : 'OBTENER UBICACIÓN'} onPress={readLocation} />
    </Panel>
    {location ? <Panel>
      <SectionHeader title="COORDENADAS" detail="GPS / WGS84" />
      <View style={styles.coordinateRow}>
        <View style={[styles.coordinateCell, { backgroundColor: colors.panel2 }]}><Label>LATITUD</Label><Text style={[styles.coordinateValue, { color: colors.cyan }]}>{formatNumber(location.coords.latitude, 6)}°</Text></View>
        <View style={[styles.coordinateCell, { backgroundColor: colors.panel2 }]}><Label>LONGITUD</Label><Text style={[styles.coordinateValue, { color: colors.cyan }]}>{formatNumber(location.coords.longitude, 6)}°</Text></View>
      </View>
      <DataRow label="PRECISIÓN" value={`${formatNumber(location.coords.accuracy, 1)} m`} />
      <DataRow label="ALTITUD" value={`${formatNumber(location.coords.altitude, 1)} m`} />
      <DataRow label="RUMBO" value={heading === null ? '—' : `${Math.round(heading)}°`} />
    </Panel> : <BodyText style={styles.hint}>Activa el GPS en tu dispositivo para adquirir coordenadas.</BodyText>}
  </>;
}

function DataRow({ label, value }) {
  const { colors } = useTheme();
  return <View style={[styles.dataRow, { borderTopColor: colors.line }]}><Text style={[styles.dataLabel, { color: colors.muted }]}>{label}</Text><Text style={[styles.dataValue, { color: colors.text }]}>{value}</Text></View>;
}

const styles = StyleSheet.create({
  radar: { width: 220, height: 220, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  ring: { position: 'absolute', borderWidth: 1, borderRadius: 120 },
  crossH: { position: 'absolute', width: 208, height: 1 },
  crossV: { position: 'absolute', width: 1, height: 208 },
  center: { width: 9, height: 9, borderRadius: 6 },
  north: { position: 'absolute', top: -1, fontSize: 9, fontWeight: '800' },
  statusLine: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, marginTop: 10, marginBottom: 12 },
  coordinateRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  coordinateCell: { flex: 1, padding: 11, gap: 7 },
  coordinateValue: { fontSize: 16, fontWeight: '700' },
  dataRow: { height: 36, borderTopWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  dataLabel: { fontSize: 9, letterSpacing: 1, fontWeight: '700' },
  dataValue: { fontSize: 12, fontWeight: '600' },
  hint: { textAlign: 'center', padding: 12 },
});
