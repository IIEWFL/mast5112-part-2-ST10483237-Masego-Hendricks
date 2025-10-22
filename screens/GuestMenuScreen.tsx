import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { MenuContext } from '../context/MenuContext';
import { Ionicons } from '@expo/vector-icons';

// This helps us use navigation between screens
type Props = NativeStackScreenProps<RootStackParamList, 'GuestMenu'>;

export default function GuestMenuScreen({ navigation }: Props) {
  // Get the current menu that the chef made
  const { currentMenu } = useContext(MenuContext);

  // Group the menu items into Starters, Mains, and Desserts
  const grouped = ['Starter', 'Main', 'Dessert']
    .map(course => ({
      title: course,
      data: currentMenu.filter(dish => dish.course === course),
    }))
    .filter(group => group.data.length > 0); // only show courses that have items

  return (
    <View style={styles.root}>
      <Text style={styles.heading}>Guest Menu</Text>

      {/* If there are no dishes yet, show a message */}
      {grouped.length === 0 ? (
        <Text style={styles.empty}>No menu available yet.</Text>
      ) : (
        // Show all dishes grouped by their course
        <FlatList
          data={grouped}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <View style={styles.section}>
              <Text style={styles.courseTitle}>{item.title}</Text>
              {item.data.map(dish => (
                <View key={dish.id} style={styles.card}>
                  {/* Dish picture */}
                  {dish.image && <Image source={dish.image} style={styles.image} />}
                  <View style={{ flex: 1 }}>
                     {/* Dish name and description */}
                    <Text style={styles.name}>{dish.name}</Text>
                    {dish.description ? <Text style={styles.desc}>{dish.description}</Text> : null}

                    
                    {isNaN(dish.price) ? null : (
                      <Text style={styles.price}>R{dish.price.toFixed(2)}</Text>
                    )}
                    {/* Show 5 gold stars for each dish */}
                    <View style={styles.ratingRow}>
                      {[...Array(5)].map((_, i) => (
                        <Ionicons key={i} name="star" size={14} color="#FFD700" />
                      ))}
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      {/* Home button at the bottom of the screen */}
      <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.navigate('Home')}>
        <Ionicons name="home-outline" size={22} color="#fff" style={{ marginRight: 6 }} />
        <Text style={styles.homeText}>Return Home</Text>
      </TouchableOpacity>
    </View>
  );
}
// Styles for this screen
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#E6F9FC', paddingTop: 60, paddingHorizontal: 16 },
  heading: {
    fontSize: 22,
    fontWeight: '900',
    color: '#000',
    textAlign: 'center',
    backgroundColor: '#4ED6E5',
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  empty: { textAlign: 'center', color: '#555', marginTop: 20 },
  section: { marginBottom: 20 },
  courseTitle: { fontSize: 18, fontWeight: '800', color: '#4ED6E5', marginBottom: 8 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#C4C4C4',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  image: { width: 60, height: 60, borderRadius: 8, marginRight: 10 },
  name: { fontWeight: '800', color: '#000' },
  desc: { fontSize: 12, color: '#333', marginVertical: 3 },
  price: { fontSize: 13, fontWeight: '700', color: '#000' },
  ratingRow: { flexDirection: 'row', marginTop: 4, gap: 2 },

  
  homeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4ED6E5',
    paddingVertical: 12,
    borderRadius: 10,
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
  },
  homeText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});
