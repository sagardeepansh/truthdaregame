import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


export default function SplashScreen({ navigation }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('userdetails'); // Use replace to prevent going back to Splash
        }, 5000); // 5000ms = 5 seconds

        return () => clearTimeout(timer); // Clean up the timer on unmount
    }, []);

    return (
        <LinearGradient
            colors={['#009cf7', '#016df5']} // Set your gradient colors here
            style={styles.container}>
            <View >
                <Text style={styles.headline}>Truth & Dare</Text>
                <Text style={styles.subheadline}>Unlock new comfort</Text>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headline: {
        fontSize: 50,
        color: '#fff',
        fontWeight: 700,
        fontFamily: 'FreckleFace_400Regular'
    },
    subheadline: {
        fontSize: 16,
        color: '#fff005',
        fontWeight: 700,
        textAlign: 'center',
        fontFamily: 'Roboto_400Regular',
    },
});