import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import StatusDot from './StatusDot';

export default function AppHeader() {
  const { colors, toggleTheme } = useTheme();
  return (
    <View style={[styles.header, { borderBottomColor: colors.line }]}>
      <View style={styles.brand}>
        <View style={[styles.mark, { borderColor: colors.cyan }]}><Text style={[styles.markText, { color: colors.cyan }]}>S</Text></View>
        <View><Text style={[styles.name, { color: colors.text }]}>SENSOR<Text style={{ color: colors.cyan }}> LAB</Text></Text><Text style={[styles.subtitle, { color: colors.muted }]}>DEVICE INTERFACE / 001</Text></View>
      </View>
      <View style={styles.actions}>
        <View style={styles.online}><StatusDot /><Text style={[styles.onlineText, { color: colors.muted }]}>ONLINE</Text></View>
        <Pressable onPress={toggleTheme} accessibilityRole="button" accessibilityLabel="Cambiar tema" style={[styles.themeButton, { borderColor: colors.line }]}><Text style={{ color: colors.cyan, fontSize: 16 }}>{colors.mode === 'light' ? '◐' : '☼'}</Text></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { minHeight: 62, paddingHorizontal: 17, paddingTop: 8, paddingBottom: 8, borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  mark: { width: 34, height: 34, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '45deg' }] },
  markText: { fontWeight: '900', fontSize: 18, transform: [{ rotate: '-45deg' }] },
  name: { fontSize: 14, fontWeight: '900', letterSpacing: 2.2 },
  subtitle: { fontSize: 8, letterSpacing: 1.3, marginTop: 2 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  online: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  onlineText: { fontSize: 9, letterSpacing: 1.1, fontWeight: '700' },
  themeButton: { height: 34, width: 34, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
});
