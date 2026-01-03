import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons
        name="chevron-back"
        size={20}
        color="#fff"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    left: 0,
    top: 10,
    paddingVertical: 10,
    paddingRight: 15,
    paddingLeft: 0,
    // backgroundColor: '#007AFF',
    borderRadius: 5,
    zIndex: 99999,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
});

export default BackButton;