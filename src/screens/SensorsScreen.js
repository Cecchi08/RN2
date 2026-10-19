import { StyleSheet, Text, View } from 'react-native';
import Panel from '../components/Panel';
import SectionHeader from '../components/SectionHeader';
import StatusDot from '../components/StatusDot';
import { BodyText, Label } from '../components/Typography';
import useDeviceSensors from '../hooks/useDeviceSensors';
import { formatNumber } from '../utils/format';
import { useTheme } from '../theme/ThemeContext';

export default function SensorsScreen() {
  const { colors } = useTheme();
  const { accelerometer, gyroscope } = useDeviceSensors();
  return <>
    <Panel>
      <SectionHeader title="MOVIMIENTO" detail="MODULE / 03–04" />
      <BodyText style={{ marginBottom: 8 }}>Lectura en vivo actualizada cada 250 ms.</BodyText>
      <SensorGroup title="ACELERÓMETRO" values={accelerometer} unit="g" />
      <SensorGroup title="GIROSCOPIO" values={gyroscope} unit="rad/s" />
    </Panel>
    <Panel style={{ padding: 12 }}><View style={styles.note}><Text style={{ color: colors.cyan, fontSize: 16 }}>⌁</Text><BodyText style={styles.noteText}>Mueve o gira el teléfono para observar cómo cambian las lecturas.</BodyText></View></Panel>
  </>;
}

function SensorGroup({ title, values, unit }) {
  const { colors } = useTheme();
  return <View style={[styles.group, { borderColor: colors.line }]}>
    <View style={styles.groupHeader}><Label>{title}</Label><View style={styles.live}><StatusDot size={5} /><Text style={[styles.liveText, { color: colors.cyan }]}>LIVE</Text></View></View>
    <View style={styles.axes}>{['x', 'y', 'z'].map((axis) => <View key={axis} style={[styles.axis, { backgroundColor: colors.panel2 }]}>
      <Text style={[styles.axisLabel, { color: colors.muted }]}>{axis.toUpperCase()}</Text><Text style={[styles.axisValue, { color: colors.text }]}>{formatNumber(values[axis])}</Text><Text style={[styles.axisUnit, { color: colors.muted }]}>{unit}</Text>
    </View>)}</View>
  </View>;
}

const styles = StyleSheet.create({
  group: { borderWidth: 1, padding: 11, marginTop: 10 },
  groupHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  live: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  liveText: { fontSize: 8, fontWeight: '800', letterSpacing: 1 },
  axes: { flexDirection: 'row', gap: 7 },
  axis: { flex: 1, minHeight: 76, padding: 8, justifyContent: 'space-between' },
  axisLabel: { fontSize: 9, fontWeight: '800' },
  axisValue: { fontSize: 16, fontWeight: '700' },
  axisUnit: { fontSize: 8 },
  note: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  noteText: { flex: 1, fontSize: 10, lineHeight: 15 },
});
