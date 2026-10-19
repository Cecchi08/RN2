import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export default function BottomNavigation({ tabs, selected, onSelect, compact }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.bar, { backgroundColor: colors.panel, borderTopColor: colors.line }]}>
      {tabs.map((tab) => {
        const active = selected === tab.id;
        return <Pressable key={tab.id} accessibilityRole="button" accessibilityState={{ selected: active }} onPress={() => onSelect(tab.id)} style={styles.item}>
          <Text style={[styles.icon, { color: active ? colors.cyan : colors.muted }]}>{tab.icon}</Text>
          <Text style={[styles.label, { color: active ? colors.cyan : colors.muted, fontSize: compact ? 8 : 9 }]}>{tab.label}</Text>
          {active ? <View style={[styles.indicator, { backgroundColor: colors.cyan }]} /> : null}
        </Pressable>;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { minHeight: 62, paddingBottom: 4, borderTopWidth: 1, flexDirection: 'row', justifyContent: 'space-around' },
  item: { minWidth: 53, flex: 1, alignItems: 'center', justifyContent: 'center', gap: 2, position: 'relative' },
  icon: { fontSize: 18, height: 23 },
  label: { fontWeight: '800', letterSpacing: 0.7 },
  indicator: { position: 'absolute', top: 0, width: 20, height: 2 },
});
