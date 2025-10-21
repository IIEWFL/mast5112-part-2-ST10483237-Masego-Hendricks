import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'GuestFilter'>;

export default function GuestFilterScreen({ navigation }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const toggleSelection = (choice: string) => setSelected(prev => (prev === choice ? null : choice));
  const apply = () => navigation.navigate('GuestMenu', { filter: selected ?? undefined });

  return (
    <View style={styles.root}>
      <View style={styles.filterBox}>
        <Text style={styles.heading}>Filter by choice</Text>

        {['Starter', 'Main', 'Dessert'].map(choice => (
          <TouchableOpacity key={choice} style={styles.optionRow} onPress={() => toggleSelection(choice)}>
            <View style={[styles.checkbox, selected === choice && styles.checkboxSelected]}>
              {selected === choice && <Ionicons name="checkmark" size={16} color="#4ED6E5" />}
            </View>
            <Text style={styles.optionText}>{choice}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.applyBtn} onPress={apply}>
        <Text style={styles.applyText}>Apply Filter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F8F8F8', alignItems: 'center', justifyContent: 'center', padding: 20 },
  filterBox: { width: '90%', borderWidth: 2, borderColor: '#4ED6E5', borderRadius: 6, paddingVertical: 20, paddingHorizontal: 16, marginBottom: 40, backgroundColor: '#F8F8F8' },
  heading: { fontSize: 18, fontWeight: '900', marginBottom: 16, color: '#000' },
  optionRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  checkbox: { width: 24, height: 24, borderWidth: 2, borderColor: '#4ED6E5', borderRadius: 4, marginRight: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF' },
  checkboxSelected: { backgroundColor: '#E0F8FA' },
  optionText: { fontSize: 16, color: '#000' },
  applyBtn: { backgroundColor: '#2E2E2E', borderRadius: 25, paddingVertical: 12, paddingHorizontal: 40, alignItems: 'center', justifyContent: 'center' },
  applyText: { color: '#fff', fontWeight: '800', fontSize: 15 },
});
