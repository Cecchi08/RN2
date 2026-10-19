import { StyleSheet, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export default function Panel({ children, style }) {
  const { colors } = useTheme();
  return <View style={[styles.panel, { backgroundColor: colors.panel, borderColor: colors.line }, style]}>{children}</View>;
}

const styles = StyleSheet.create({ panel: { borderWidth: 1, padding: 16, overflow: 'hidden' } });
