import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { MenuContext } from '../context/MenuContext';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'MenuManagement'>;

export default function MenuManagementScreen({ navigation }: Props) {
  // Get the list of dishes, remove function and course selection from the MenuContext
  const { currentMenu, removeDishFromMenu, isCourseSelected } = useContext(MenuContext);

  return (
    <View style={styles.root}>
      <Text style={styles.heading}>Edit Menu</Text>

      {/* FlatList shows all the dishes that were added */}
      <FlatList
        data={currentMenu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.image && <Image source={item.image} style={styles.image} />}

            {/* Dish details on the right side */}
           <View style={{ flex: 1 }}>
            <Text style={styles.name}>{item.name}</Text>
            {item.description ? (
            <Text style={styles.desc}>{item.description}</Text>
            ) : null}
            <Text style={styles.price}>R{item.price}</Text>
            </View>


            {/* Button to remove a dish from the list */}
            <TouchableOpacity onPress={() => removeDishFromMenu(item.id)} style={styles.removeBtn}>
              <Ionicons name="close-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
        // Message shown when there are no dishes yet
        ListEmptyComponent={<Text style={styles.emptyText}>No dishes added yet.</Text>}
      />

      {/* Buttons for choosing course to add a dish to */}
      <View style={styles.filterRow}>
        {['Starters', 'Mains', 'Dessert'].map((course) => (
          <TouchableOpacity
            key={course}
            style={[styles.filterBtn, isCourseSelected(course) && styles.filterBtnSelected]}
            onPress={() => navigation.navigate('DishSelection', { course })}
          >
             {/* Button text changes to “Selected” when that course is already added */}
            <Text style={styles.filterText}>
              {isCourseSelected(course) ? 'Selected' : course}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

       {/* This only shows the Done button if there are dishes in the menu */}
      {currentMenu.length > 0 && (
        <TouchableOpacity
          style={styles.doneBtn}
          onPress={() => navigation.navigate('GuestMenu')}
        >
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// These are all the styles for this screen
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F4F4F4', paddingHorizontal: 16, paddingTop: 60 },
  heading: { fontSize: 24, fontWeight: '900', textAlign: 'center', marginBottom: 20 },
  emptyText: { textAlign: 'center', color: '#555', marginVertical: 10 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#C4C4C4',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginBottom: 14,
  },
  image: { width: 50, height: 50, borderRadius: 6, marginRight: 10 },
  name: { fontWeight: '700', color: '#000' },
  price: { fontSize: 12, color: '#333' },
  removeBtn: { backgroundColor: '#E36BAE', borderRadius: 20, padding: 4 },
  filterRow: { marginTop: 16 },
  filterBtn: {
    backgroundColor: '#E36BAE',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  desc: {
  fontSize: 12,
  color: '#333',
  marginVertical: 2,
},

  filterBtnSelected: { backgroundColor: '#A8A8A8' },
  filterText: { color: '#fff', fontWeight: '700' },
  doneBtn: { backgroundColor: '#000', paddingVertical: 14, borderRadius: 8, marginTop: 10, marginBottom: 30 },
  doneText: { color: '#fff', fontWeight: '900', textAlign: 'center', fontSize: 15 },
});
