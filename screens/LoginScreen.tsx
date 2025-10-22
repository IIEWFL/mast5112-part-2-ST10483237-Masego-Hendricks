import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

// This helps us move between screens.
type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  // These store what the chef types in the username and password text input.
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  // This checks if the chef entered the correct login details.
  const handleLogin = () => {
    if (user === 'ChefChristoffel' && pass === 'culinary321') {
      navigation.navigate('MenuManagement'); // go to the menu management screen
    } else {
      alert('Ooops! Invalid credentials, this page is meant for the chef only.'); //Error message for when the credentials are incorrect.
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.heading}>Chef Login</Text>
      {/* Username input box */}
      <TextInput placeholder="Username" value={user} onChangeText={setUser} style={styles.input} />

       {/* Password input box */}
      <TextInput
        placeholder="Password"
        value={pass}
        onChangeText={setPass}
        secureTextEntry
        style={styles.input}
      />

       {/* Button to log in */}
      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>

      {/* Button to return to home, just incase a guest clicks on "Manage Menu" by mistake */}
      <TouchableOpacity style={styles.returnBtn} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.returnText}>Return to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

// All the styles for how the login screen looks
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff', padding: 20, justifyContent: 'center' },
  heading: { fontSize: 24, fontWeight: '900', textAlign: 'center', marginBottom: 30, color: '#E36BAE' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
  },
  btn: { backgroundColor: '#E36BAE', paddingVertical: 12, borderRadius: 6 },
  btnText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  returnBtn: { marginTop: 20, alignItems: 'center' },
  returnText: { color: '#888', fontWeight: 'bold' },
});
