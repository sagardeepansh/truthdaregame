import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DebugScreen({ navigation }) {
  const testPress = () => {
    Alert.alert('Test', 'Button pressed!');
    console.log('Button pressed'); // For debugging
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        contentContainerStyle={styles.container} 
        keyboardShouldPersistTaps="handled"
      >
        <Pressable
          style={styles.button}
          onPress={testPress}
          activeOpacity={0.7}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Text style={styles.buttonText}>Press Me (TouchableOpacity)</Text>
        </Pressable >
        <TouchableOpacity
          style={styles.button}
          onPress={testPress}
          activeOpacity={0.7}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Text style={styles.buttonText}>Press Me (Second Button)</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  button: {
    padding: 15,
    backgroundColor: 'blue',
    borderRadius: 8,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
    minHeight: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
