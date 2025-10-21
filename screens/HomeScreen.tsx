import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        
        <Image
          source={require('../assets/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />

        
        <Text style={styles.slogan}>
          EXCEPTIONAL CULINARY{'\n'}experiences tailored to YOUR PREFERENCE
        </Text>

        
        <TouchableOpacity
          style={[styles.btn]}
          onPress={() => navigation.navigate('GuestMenu')}
        >
          <Ionicons name="restaurant-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.btnText}>VIEW MENU</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn]}
          onPress={() => navigation.navigate('Login')}
        >
          <Ionicons name="shield-checkmark-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.btnText}>Manage Menu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 220,
    height: 140,
    marginBottom: 20,
  },
  slogan: {
    textAlign: 'center',
    color: '#B89B3E', 
    fontSize: 14,
    marginBottom: 40,
    lineHeight: 20,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 30,
    marginBottom: 14,
    width: 220,
    backgroundColor: '#2E2E2E', 
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 4, 
  },
  btnText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  },
});
