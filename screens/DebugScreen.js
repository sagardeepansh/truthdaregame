import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

export default function DebugScreen() {
  const [text, setText] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0} // optional offset
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <TextInput
            style={styles.input}
            placeholder="Type something..."
            value={text}
            onChangeText={setText}
          />

          {/* Stick-to-keyboard button */}
          <View style={styles.buttonContainer}>
            <Button title="Submit" onPress={() => console.log(text)} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'flex-end', // keep button at bottom
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    margin: 16,
    padding: 12,
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
});
