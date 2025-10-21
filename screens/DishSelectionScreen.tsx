import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { MenuContext } from '../context/MenuContext';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'DishSelection'>;

export default function DishSelectionScreen({ navigation, route }: Props) {
  const { catalog, addDishToMenu, removeDishFromMenu, currentMenu } = useContext(MenuContext);
  const course = (route.params?.course as string) || 'Starter';
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    // initialize selection for this course from currentMenu
    setSelected(currentMenu.filter(d => d.course === course).map(d => d.id));
  }, [course, currentMenu]);

  const dishes = catalog.filter(d => d.course === course);

  const toggleSelect = (id: string) => {
    if (selected.includes(id)) {
      setSelected(prev => prev.filter(x => x !== id));
      removeDishFromMenu(id);
    } else {
      setSelected(prev => [...prev, id]);
      addDishToMenu(id);
    }
  };

  const renderDish = ({ item }: any) => {
    const isSelected = selected.includes(item.id);
    return (
      <TouchableOpacity onPress={() => toggleSelect(item.id)} style={[styles.card, isSelected && styles.cardSelected]}>
        <Image source={item.image} style={styles.image} />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.desc}>{item.description}</Text>
          <Text style={styles.price}>R{item.price}</Text>
        </View>
        {isSelected && <Ionicons name="checkmark-circle" size={22} color="#E36BAE" />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.root}>
      <Text style={styles.heading}>Select {course}s</Text>

      <FlatList data={dishes} keyExtractor={i => i.id} renderItem={renderDish} contentContainerStyle={{ paddingBottom: 120 }} />

      <View style={styles.btnRow}>
        <TouchableOpacity style={[styles.btn, styles.nextBtn]} onPress={() => navigation.navigate('MenuManagement')}>
          <Text style={styles.btnText}>Next</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, styles.saveBtn]} onPress={() => navigation.navigate('MenuManagement')}>
          <Text style={styles.btnText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F4F4F4', paddingTop: 60, paddingHorizontal: 16 },
  heading: { fontSize: 22, fontWeight: '900', textAlign: 'center', color: '#000', marginBottom: 10 },
  card: { flexDirection: 'row', backgroundColor: '#C4C4C4', borderRadius: 10, padding: 10, alignItems: 'center', marginBottom: 10 },
  cardSelected: { borderColor: '#E36BAE', borderWidth: 2 },
  image: { width: 60, height: 60, borderRadius: 8, marginRight: 10 },
  name: { fontWeight: '800', color: '#000' },
  desc: { fontSize: 12, color: '#555' },
  price: { fontSize: 13, fontWeight: '700', color: '#000', marginTop: 4 },
  btnRow: { flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: 20, left: 16, right: 16 },
  btn: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  nextBtn: { backgroundColor: '#C4C4C4', marginRight: 8 },
  saveBtn: { backgroundColor: '#E36BAE', marginLeft: 8 },
  btnText: { color: '#fff', fontWeight: '900', fontSize: 14 },
});
