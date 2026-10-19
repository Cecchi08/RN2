import { StyleSheet, Text, View } from 'react-native';
import ActionButton from '../components/ActionButton';
import Panel from '../components/Panel';
import SectionHeader from '../components/SectionHeader';
import StatusDot from '../components/StatusDot';
import { BodyText, Label } from '../components/Typography';
import useBiometricAuth from '../hooks/useBiometricAuth';
import { useTheme } from '../theme/ThemeContext';

export default function BiometricScreen() {
  const { colors } = useTheme();
  const { status, busy, authenticate } = useBiometricAuth();
  return <>
    <Panel>
      <SectionHeader title="AUTENTICACIÓN" detail="MODULE / 05" />
      <View style={[styles.graphic, { borderColor: colors.line }]}>
        <View style={[styles.scanIcon, { borderColor: colors.cyan }]}><Text style={[styles.glyph, { color: colors.cyan }]}>⌑</Text></View>
        <Text style={[styles.caption, { color: colors.muted }]}>HUELLA · ROSTRO · SISTEMA</Text>
      </View>
      <View style={[styles.status, { borderColor: colors.line }]}><StatusDot color={status === 'IDENTIDAD VERIFICADA' ? '#5cf0a0' : colors.cyan} /><Text style={[styles.statusText, { color: colors.text }]}>{status}</Text></View>
      <ActionButton title={busy ? 'VERIFICANDO…' : 'INICIAR VERIFICACIÓN'} onPress={authenticate} disabled={busy} />
    </Panel>
    <BodyText style={styles.hint}>La verificación usa el sensor del dispositivo. Sensor Lab no guarda datos biométricos.</BodyText>
  </>;
}

const styles = StyleSheet.create({
  graphic: { minHeight: 210, borderWidth: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  scanIcon: { width: 100, height: 100, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  glyph: { fontSize: 55, fontWeight: '300' },
  caption: { fontSize: 8, letterSpacing: 1.4, fontWeight: '700' },
  status: { height: 44, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9, marginTop: 12, marginBottom: 9 },
  statusText: { fontSize: 10, letterSpacing: 1, fontWeight: '700' },
  hint: { textAlign: 'center', paddingHorizontal: 15 },
});
