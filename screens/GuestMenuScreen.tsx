import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { MenuContext } from '../context/MenuContext';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'GuestMenu'>;

export default function GuestMenuScreen({ navigation, route }: Props) {
  const { currentMenu } = useContext(MenuContext);


  // Filter value passed from GuestFilter screen (expected values: "Starter", "Main", "Dessert" or undefined)
  // We normalize the incoming filter to a consistent trimmed lowercase string for comparison
  const incomingFilterRaw = route.params?.filter;
  const incomingFilter = typeof incomingFilterRaw === 'string' ? incomingFilterRaw.trim() : '';

  // Build a normalized version of currentMenu where we also normalize course values
  const normalizedMenu = currentMenu.map((dish) => {
    const rawCourse = (dish.course ?? '').toString();
    const normCourse = rawCourse.trim(); // keep original capitalization but trimmed
    const normCourseLower = normCourse.toLowerCase(); // lowercase for comparison
    return {
      ...dish,
      __normCourse: normCourse, // e.g. "Starter" or "starter " original trimmed
      __normCourseLower: normCourseLower, // e.g. "starter"
    };
  });

  // If incomingFilter provided, compare in lowercase trimmed form to avoid case/space problems
  const filteredMenu =
    incomingFilter && incomingFilter !== ''
      ? normalizedMenu.filter((d) => d.__normCourseLower === incomingFilter.toString().toLowerCase().trim())
      : normalizedMenu;

  // If filteredMenu is empty but there are items in currentMenu, still show them (defensive)
  // Group dynamically by whatever course strings actually exist in filteredMenu (use the original trimmed course label for the title)
const groupedCourses = Array.from(
  new Set(filteredMenu.map(d => d.course))
);

const grouped = groupedCourses.map(course => ({
  title: course,
  data: filteredMenu.filter(
    d => d.course.toLowerCase().trim() === course.toLowerCase().trim()
  ),
}));


  // Fallback: if grouping produced nothing but filteredMenu has items, we'll show a flat list of filteredMenu
  const shouldUseFlatFallback = grouped.length === 0 && filteredMenu.length > 0;

  // UI label for filter button: show selected filter or default
  const filterLabel = incomingFilter ? `Filter: ${incomingFilter.charAt(0).toUpperCase() + incomingFilter.slice(1)}` : 'Filter by Course';

  return (
    <View style={styles.root}>
      <Text style={styles.heading}>Guest Menu</Text>

      {/* Filter button on top — navigates to filter screen */}
      <TouchableOpacity style={styles.filterBtn} onPress={() => navigation.navigate('GuestFilter')}>
        <Ionicons name="filter-outline" size={18} color="#fff" style={{ marginRight: 6 }} />
        <Text style={styles.filterText}>{filterLabel}</Text>
      </TouchableOpacity>

      {/* Show count of currently displayed items */}
      <Text style={styles.totalText}>Available Dishes: {filteredMenu.length}</Text>

      {/* If nothing at all */}
      {filteredMenu.length === 0 ? (
        <Text style={styles.empty}>No dishes available yet.</Text>
      ) : shouldUseFlatFallback ? (
        // Fallback flat list — shows items directly if grouping failed for some reason
        <FlatList
          data={filteredMenu}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {item.image && <Image source={item.image} style={styles.image} />}
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                {item.description ? <Text style={styles.desc}>{item.description}</Text> : null}
                {!isNaN(item.price) && <Text style={styles.price}>R{item.price.toFixed(2)}</Text>}
                <View style={styles.ratingRow}>
                  {[...Array(5)].map((_, i) => (
                    <Ionicons key={i} name="star" size={14} color="#FFD700" />
                  ))}
                </View>
                <Text style={styles.smallCourse}>Course: {item.__normCourse || item.course}</Text>
              </View>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 120 }}
        />
      ) : (
        // Normal grouped view
        <FlatList
          data={grouped}
          keyExtractor={(g) => g.title}
          renderItem={({ item: group }) => (
            <View style={styles.section}>
              <Text style={styles.courseTitle}>{group.title}</Text>
              {group.data.map((dish) => (
                <View key={dish.id} style={styles.card}>
                  {dish.image && <Image source={dish.image} style={styles.image} />}
                  <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{dish.name}</Text>
                    {dish.description ? <Text style={styles.desc}>{dish.description}</Text> : null}
                    {!isNaN(dish.price) && <Text style={styles.price}>R{dish.price.toFixed(2)}</Text>}
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
          contentContainerStyle={{ paddingBottom: 120 }}
        />
      )}

      {/* Home button */}
      <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.navigate('Home')}>
        <Ionicons name="home-outline" size={22} color="#fff" style={{ marginRight: 6 }} />
        <Text style={styles.homeText}>Return Home</Text>
      </TouchableOpacity>
    </View>
  );
}

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
    marginBottom: 10,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4ED6E5',
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  filterText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  totalText: { textAlign: 'center', color: '#000', fontWeight: '700', fontSize: 14, marginBottom: 10 },
  empty: { textAlign: 'center', color: '#555', marginTop: 20 },
  section: { marginBottom: 20 },
  courseTitle: { fontSize: 18, fontWeight: '800', color: '#4ED6E5', marginBottom: 8 },
  card: { flexDirection: 'row', backgroundColor: '#C4C4C4', borderRadius: 10, padding: 10, alignItems: 'center', marginBottom: 10 },
  image: { width: 60, height: 60, borderRadius: 8, marginRight: 10 },
  name: { fontWeight: '800', color: '#000' },
  desc: { fontSize: 12, color: '#333', marginVertical: 3 },
  price: { fontSize: 13, fontWeight: '700', color: '#000' },
  ratingRow: { flexDirection: 'row', marginTop: 4, gap: 2 },
  smallCourse: { marginTop: 6, fontSize: 11, color: '#333', fontStyle: 'italic' },
  homeBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#4ED6E5', paddingVertical: 12, borderRadius: 10, position: 'absolute', bottom: 25, left: 20, right: 20 },
  homeText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});
