import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { MenuContext } from '../context/MenuContext';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'MenuManagement'>;

export default function MenuManagementScreen({ navigation }: Props) {
  const { currentMenu, removeDishFromMenu, isCourseSelected } = useContext(MenuContext);

  return (
    <View style={styles.root}>
      <Text style={styles.heading}>Edit Menu</Text>

      <FlatList
        data={currentMenu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>R{item.price}</Text>
            </View>
            <TouchableOpacity onPress={() => removeDishFromMenu(item.id)} style={styles.removeBtn}>
              <Ionicons name="close-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No dishes selected yet.</Text>}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <View style={styles.filterRow}>
        {['Starter', 'Main', 'Dessert'].map((course) => (
          <TouchableOpacity
            key={course}
            style={[
              styles.filterBtn,
              isCourseSelected(course) && styles.filterBtnSelected,
            ]}
            onPress={() => navigation.navigate('DishSelection', { course })}
          >
            <Text style={styles.filterText}>
              {isCourseSelected(course) ? 'Selected' : course}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {currentMenu.length > 0 && (
        <TouchableOpacity style={styles.doneBtn} onPress={() => navigation.navigate('GuestMenu')}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F4F4F4', paddingHorizontal: 16, paddingTop: 60 },
  heading: { fontSize: 24, fontWeight: '900', color: '#000', textAlign: 'center', marginBottom: 20 },
  emptyText: { textAlign: 'center', color: '#555', fontSize: 14, marginVertical: 10 },
  card: { flexDirection: 'row', backgroundColor: '#C4C4C4', borderRadius: 8, padding: 10, alignItems: 'center', marginBottom: 14 },
  image: { width: 50, height: 50, borderRadius: 6, marginRight: 10 },
  name: { fontWeight: '700', color: '#000' },
  price: { fontSize: 12, color: '#333' },
  removeBtn: { backgroundColor: '#E36BAE', borderRadius: 20, padding: 4 },
  filterRow: { marginTop: 16 },
  filterBtn: { backgroundColor: '#E36BAE', paddingVertical: 10, borderRadius: 6, alignItems: 'center', marginBottom: 10 },
  filterBtnSelected: { backgroundColor: '#A8A8A8' },
  filterText: { color: '#fff', fontWeight: '700' },
  doneBtn: { backgroundColor: '#000', paddingVertical: 14, borderRadius: 8, marginTop: 10, marginBottom: 30 },
  doneText: { color: '#fff', fontWeight: '900', textAlign: 'center', fontSize: 15 },
});
