import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export default function ActionButton({ title, onPress, secondary = false, disabled = false, style }) {
  const { colors } = useTheme();
  return (
    <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress}
      style={({ pressed }) => [styles.button, { borderColor: secondary ? colors.line : colors.cyan, backgroundColor: secondary ? 'transparent' : colors.cyanSoft, opacity: disabled ? 0.45 : pressed ? 0.68 : 1 }, style]}>
      <Text style={[styles.text, { color: secondary ? colors.text : colors.cyan }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { minHeight: 43, borderWidth: 1, paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center', flex: 1 },
  text: { fontSize: 10, letterSpacing: 1.1, fontWeight: '800', textAlign: 'center' },
});
