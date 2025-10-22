import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { MenuContext } from '../context/MenuContext';

type Props = NativeStackScreenProps<RootStackParamList, 'DishSelection'>;

export default function DishSelectionScreen({ navigation, route }: Props) {
  // This gets the course that was selected (like "Starter" or "Main")
  const { addCustomDish } = useContext(MenuContext);
  const course = route.params?.course || 'Starter';

  // These store the dish info typed by the chef
  const [name, setName] = useState(''); //Dish Name
  const [description, setDescription] = useState(''); //Dish Description
  const [price, setPrice] = useState(''); //Price

  // This runs when the chef presses save
  const handleSave = () => {
    // Check that the name and price were entered
    if (!name || !price) {
      alert('Please enter a dish name and price');
      return;
    }
    // Add the dish to the correct course in the menu
    addCustomDish(course, name, description, parseFloat(price));
    setName('');
    setDescription('');
    setPrice('');
    navigation.navigate('MenuManagement');
  };

  // This helps keep the keyboard from covering the inputs on a mobile device
  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.heading}>Add {course}</Text>

      <TextInput
        placeholder="Dish name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Description"
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TextInput
        placeholder="Price (R)"
        keyboardType="numeric"
        style={styles.input}
        value={price}
        onChangeText={setPrice}
      />

       {/* Button to save the new dish */}
      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>

      {/* Button to go back without saving */}
      <TouchableOpacity
        style={styles.cancelBtn}
        onPress={() => navigation.navigate('MenuManagement')}
      >
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

// These are the styles that control how the screen looks
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F4F4F4', padding: 20, justifyContent: 'center' },
  heading: { fontSize: 22, fontWeight: '900', textAlign: 'center', marginBottom: 20 },
  input: { backgroundColor: '#fff', borderRadius: 8, padding: 10, marginBottom: 12, borderWidth: 1, borderColor: '#ccc' },
  textArea: { height: 80, textAlignVertical: 'top' },
  saveBtn: { backgroundColor: '#E36BAE', padding: 14, borderRadius: 8, marginTop: 10 },
  saveText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  cancelBtn: { marginTop: 10, padding: 10, alignItems: 'center' },
  cancelText: { color: '#333', fontWeight: 'bold' },
});
