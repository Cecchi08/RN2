import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import AppHeader from './src/components/AppHeader';
import BottomNavigation from './src/components/BottomNavigation';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';
import { TABS } from './src/navigation/tabs';
import BiometricScreen from './src/screens/BiometricScreen';
import CameraScreen from './src/screens/CameraScreen';
import HomeScreen from './src/screens/HomeScreen';
import LocationScreen from './src/screens/LocationScreen';
import SensorsScreen from './src/screens/SensorsScreen';

const screens = { overview: HomeScreen, camera: CameraScreen, location: LocationScreen, sensors: SensorsScreen, biometric: BiometricScreen };

function AppContent() {
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const [tab, setTab] = useState('overview');
  const Screen = screens[tab];

  return (
    <View style={[styles.root, { backgroundColor: colors.bg }]}>
      <StatusBar style={colors.mode === 'light' ? 'dark' : 'light'} />
      <AppHeader />
      <View style={[styles.subHeader, { borderBottomColor: colors.line }]}>
        <Text style={[styles.subHeaderText, { color: colors.muted }]}>FIELD TOOLS <Text style={{ color: colors.cyan }}> / </Text> NATIVE ACCESS</Text>
        <Text style={[styles.subHeaderText, { color: colors.muted }]}>01 — 05</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Screen compact={width < 390} onNavigate={setTab} />
        <Text style={[styles.footer, { color: colors.muted }]}>SENSOR LAB  /  MOBILE CAPABILITIES EXPLORER</Text>
      </ScrollView>
      <BottomNavigation tabs={TABS} selected={tab} onSelect={setTab} compact={width < 390} />
    </View>
  );
}

export default function App() {
  return <ThemeProvider><AppContent /></ThemeProvider>;
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  subHeader: { paddingHorizontal: 17, height: 29, borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  subHeaderText: { fontSize: 8, letterSpacing: 1.4, fontWeight: '700' },
  scrollContent: { padding: 15, paddingBottom: 22, gap: 13 },
  footer: { textAlign: 'center', fontSize: 8, letterSpacing: 1, paddingVertical: 4 },
});
