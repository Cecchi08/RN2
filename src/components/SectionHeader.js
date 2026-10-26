import { StyleSheet, View } from 'react-native';
import { Label, Title } from './Typography';

// Encabezado horizontal usado para nombrar una sección y su número de módulo.
export default function SectionHeader({ title, detail, titleStyle }) {
  return <View style={styles.row}><Title style={titleStyle}>{title}</Title>{detail ? <Label>{detail}</Label> : null}</View>;
}

const styles = StyleSheet.create({ row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } });
