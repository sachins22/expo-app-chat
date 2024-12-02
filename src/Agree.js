import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Dimensions,
  Button,
} from 'react-native';

const { width } = Dimensions.get('window');

const data = [
  '1', '2', '3', '+',
  '4', '5', '6', '-',
  '7', '8', '9', '*',
  'AC', '0', '=', '/',
];

export default function Agree() {
    const navigation = useNavigation();
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const calculateResult = () => {
    let operator = '';
    let x = '';
    let y = '';
    let i;

    // Parse input to separate operands and operator
    for (i = 0; i < input.length; i++) {
      if (['+', '-', '*', '/'].includes(input[i])) {
        operator = input[i];
        x = input.slice(0, i);
        y = input.slice(i + 1);
        break;
      }
    }

    // Convert operands to numbers
    const num1 = parseFloat(x);
    const num2 = parseFloat(y);

    // Perform calculations using if-else conditions
    let res = '';
    if (operator === '+') {
      res = num1 + num2;
    } else if (operator === '-') {
      res = num1 - num2;
    } else if (operator === '*') {
      res = num1 * num2;
    } else if (operator === '/') {
      res = num2 !== 0 ? num1 / num2 : 'Error';
    } else {
      res = 'Invalid';
    }

    setResult(res.toString());
  };

  const handlePress = (item) => {
    if (item === 'AC') {
      setInput('');
      setResult('');
    } else if (item === '=') {
      calculateResult();
    } else {
      setInput((prev) => prev + item);
    }
  };

  return (
    <View style={styles.container}>
      {/* Display Screen */}
      <View style={styles.screen}>
        <Text style={styles.inputText}>{input}</Text>
        <Text style={styles.resultText}>{result}</Text>
      </View>

      {/* Buttons */}
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Pressable
            style={styles.button}
            onPress={() => handlePress(item)}
          >
            <Text style={styles.buttonText}>{item}</Text>
          </Pressable>
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={4}
      />
      <Button title='next' onPress={()=>navigation.navigate('Login')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  screen: {
    height: 150,
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  inputText: {
    fontSize: 36,
    color: '#000',
  },
  resultText: {
    fontSize: 28,
    color: '#888',
  },
  button: {
    width: width / 5,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
  buttonText: {
    fontSize: 24,
    color: '#000',
  },
});
