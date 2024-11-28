import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();
  const [name, setName] = useState('');

  return (
    <View style={styles.con}>
      <Text style={styles.text}>UserName</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter UserName"
        placeholderTextColor="white"
        value={name}
        onChangeText={setName}
      />
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Home', { name: name })}
      >
        <Text style={styles.buttonText}>Home</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  con: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20, // Add spacing between text and input
  },
  input: {
    width: '80%',
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    fontSize: 18, // Adjust font size for better visibility
    color: 'white', // Ensure text is visible in dark background
    marginBottom: 30, // Add spacing between input and button
  },
  button: {
    width: 200,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
