import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = () => {
    if (user === 'chef' && pass === '1234') navigation.navigate('MenuManagement');
    else alert('Invalid credentials');
  };

  return (
    <View style={styles.root}>
      <Text style={styles.heading}>Chef Login</Text>
      <TextInput placeholder="Username" value={user} onChangeText={setUser} style={styles.input} />
      <TextInput placeholder="Password" value={pass} onChangeText={setPass} secureTextEntry style={styles.input} />
      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff', padding: 20, justifyContent: 'center' },
  heading: { fontSize: 24, fontWeight: '900', textAlign: 'center', marginBottom: 30, color: '#E36BAE' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 6, marginBottom: 12 },
  btn: { backgroundColor: '#E36BAE', paddingVertical: 12, borderRadius: 6 },
  btnText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
});
