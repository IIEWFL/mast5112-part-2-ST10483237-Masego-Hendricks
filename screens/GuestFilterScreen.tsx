import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'GuestFilter'>;

export default function GuestFilterScreen({ navigation }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  // Toggle selection (only one at a time)
  const toggleSelection = (choice: string) =>
    setSelected(prev => (prev === choice ? null : choice));

  // Apply filter - send to GuestMenu
  const apply = () => {
    navigation.navigate('GuestMenu', { filter: selected ?? undefined });
  };

  // Clear filter and reset
  const clear = () => {
    setSelected(null);
    navigation.navigate('GuestMenu', { filter: undefined });
  };

  return (
    <View style={styles.root}>
      <View style={styles.filterBox}>
        <Text style={styles.heading}>Filter by course</Text>

        {['Starters', 'Mains', 'Desserts'].map(choice => (
          <TouchableOpacity
            key={choice}
            style={styles.optionRow}
            onPress={() => toggleSelection(choice)}
          >
            <View
              style={[
                styles.checkbox,
                selected === choice && styles.checkboxSelected,
              ]}
            >
              {selected === choice && (
                <Ionicons name="checkmark" size={16} color="#4ED6E5" />
              )}
            </View>
            <Text style={styles.optionText}>{choice}</Text>
          </TouchableOpacity>
        ))}

        {/* Show which filter is selected */}
        {selected && (
          <Text style={styles.selectedText}>
            Currently filtering: {selected}
          </Text>
        )}
      </View>

      {/* Buttons below */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.applyBtn} onPress={apply}>
          <Text style={styles.applyText}>Apply Filter</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.clearBtn} onPress={clear}>
          <Text style={styles.clearText}>Return to full menu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  filterBox: {
    width: '90%',
    borderWidth: 2,
    borderColor: '#4ED6E5',
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 30,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 16,
    color: '#000',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#4ED6E5',
    borderRadius: 4,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkboxSelected: {
    backgroundColor: '#E0F8FA',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
  selectedText: {
    textAlign: 'center',
    marginTop: 10,
    color: '#4ED6E5',
    fontWeight: '700',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    gap: 10,
  },
  applyBtn: {
    flex: 1,
    backgroundColor: '#4ED6E5',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  },
  clearBtn: {
    flex: 1,
    backgroundColor: '#A8A8A8',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  },
});
