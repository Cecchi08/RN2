import { StyleSheet, Text } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export function Label({ children, style }) {
  const { colors } = useTheme();
  return <Text style={[styles.label, { color: colors.muted }, style]}>{children}</Text>;
}

export function Title({ children, style }) {
  const { colors } = useTheme();
  return <Text style={[styles.title, { color: colors.text }, style]}>{children}</Text>;
}

export function BodyText({ children, style }) {
  const { colors } = useTheme();
  return <Text style={[styles.body, { color: colors.muted }, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  label: { fontSize: 9, letterSpacing: 1.2, fontWeight: '700' },
  title: { fontSize: 15, letterSpacing: 1, fontWeight: '800' },
  body: { fontSize: 12, lineHeight: 19 },
});
