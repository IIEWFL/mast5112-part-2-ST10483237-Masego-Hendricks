import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { MenuContext } from '../context/MenuContext';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'GuestMenu'>;

export default function GuestMenuScreen({ navigation }: Props) {
  const { currentMenu } = useContext(MenuContext);

  return (
    <View style={styles.root}>
      <Text style={styles.heading}>MENU</Text>

      <TouchableOpacity style={styles.filterBtn} onPress={() => navigation.navigate('GuestFilter')}>
        <Text style={styles.filterText}>Filter by course</Text>
      </TouchableOpacity>

      {currentMenu.length > 0 ? (
        <FlatList
          data={currentMenu}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {item.image ? <Image source={item.image} style={styles.image} /> : <View style={styles.imagePlaceholder}><Ionicons name="image-outline" size={28} color="#fff" /></View>}
              <View style={styles.cardRight}>
                <Text style={styles.dishName}>{item.name}</Text>
                <Text style={styles.desc}>{item.description}</Text>
                <View style={styles.ratingRow}>{[...Array(5)].map((_, i) => <Ionicons key={i} name="star" size={14} color="#E36BAE" />)}</View>
                <Text style={styles.priceText}>R{item.price}</Text>
              </View>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 110 }}
        />
      ) : (
        <Text style={styles.noMealsText}>No meals available yet. Please check back soon!</Text>
      )}

      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.homeCircle}>
        <Ionicons name="home-outline" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F9F9F9', paddingHorizontal: 16, paddingTop: 60 },
  heading: { fontSize: 28, fontWeight: '900', color: '#000', textAlign: 'center', marginBottom: 16 },
  filterBtn: { alignSelf: 'center', backgroundColor: '#4ED6E5', paddingHorizontal: 22, paddingVertical: 8, borderRadius: 20, marginBottom: 18 },
  filterText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  card: { flexDirection: 'row', backgroundColor: '#C4C4C4', borderRadius: 12, padding: 10, alignItems: 'center', marginBottom: 16 },
  image: { width: 70, height: 70, borderRadius: 8, marginRight: 12, backgroundColor: '#ddd' },
  imagePlaceholder: { width: 70, height: 70, borderRadius: 8, backgroundColor: '#9E9E9E', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  cardRight: { flex: 1 },
  dishName: { fontSize: 15, fontWeight: '800', color: '#000', marginBottom: 2 },
  desc: { color: '#444', fontSize: 12, marginBottom: 4 },
  ratingRow: { flexDirection: 'row', marginBottom: 2 },
  priceText: { color: '#000', fontWeight: '700', fontSize: 13, marginTop: 2 },
  noMealsText: { textAlign: 'center', color: '#777', fontSize: 14, marginTop: 20 },
  homeCircle: { position: 'absolute', bottom: 24, right: 24, width: 50, height: 50, borderRadius: 25, backgroundColor: '#2E2E2E', alignItems: 'center', justifyContent: 'center', elevation: 5 },
});
