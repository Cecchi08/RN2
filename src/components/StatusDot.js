import { StyleSheet, View } from 'react-native';

export default function StatusDot({ color = '#5cf0a0', size = 7 }) {
  return <View style={[styles.dot, { backgroundColor: color, width: size, height: size, borderRadius: size / 2 }]} />;
}

const styles = StyleSheet.create({ dot: {} });
