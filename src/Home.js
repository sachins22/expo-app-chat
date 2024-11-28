import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import io from 'socket.io-client';

export default function Home() {
  const route = useRoute();
  const { name } = route.params || {};
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]); // Store chat messages
  const [users, setUsers] = useState([]); // Store connected users

  useEffect(() => {
    const newSocket = io('https://expo-chat-node.onrender.com'); // Replace with your backend URL
    setSocket(newSocket);

    // Register the user
    newSocket.emit('register', name);

    // Listen for messages
    newSocket.on('message', (data) => {
      setChat((prevChat) => [...prevChat, `${data.username}: ${data.message}`]);
    });

    // Listen for updates to the user list
    newSocket.on('updateUserList', (userList) => {
      setUsers(userList);
    });

    return () => newSocket.disconnect();
  }, [name]);

  const sendMessage = () => {
    if (socket && message.trim() !== '') {
      socket.emit('message', { username: name, message });
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Socket.io Chat</Text>

      <Text style={styles.userListTitle}>Connected Users:</Text>
      <FlatList
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.userItem}>{item}</Text>
        )}
        style={styles.userList}
      />

      <ScrollView style={styles.chatBox}>
        {chat.map((msg, index) => (
          <Text key={index} style={styles.chatMessage}>
            {msg}
          </Text>
        ))}
      </ScrollView>

      <TextInput
        style={styles.input}
        placeholder="Type your message"
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  userListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userList: {
    maxHeight: 100,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  userItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  chatBox: {
    flex: 1,
    width: '100%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  chatMessage: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '100%',
    marginBottom: 10,
    borderRadius: 5,
  },
});
