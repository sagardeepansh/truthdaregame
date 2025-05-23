import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ImageBackground, Pressable, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


export default function SplashScreen({ navigate, ...props }) {
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         navigate('userdetails'); // Use replace to prevent going back to Splash
    //     }, 5000); // 5000ms = 5 seconds

    //     return () => clearTimeout(timer); // Clean up the timer on unmount
    // }, []);

    return (
        <ImageBackground source={require('../assets/splash-bg.png')} style={styles.background} resizeMode="cover" >
            <View style={styles.container}>
                <View>
                    {/* <Text style={styles.headline}>Truth & Dare</Text> */}
                    <Image
                        source={require('../assets/logo.png')}
                        style={styles.logo}
                    />
                    <Text style={styles.subheadline}>Unlock new comfort</Text>
                </View>
                <View style={styles.themeBtnBox}>
                    <Pressable
                        onPress={() => navigate('userdetails')}
                        style={styles.themeBtn}
                    >
                        <Text style={styles.themeBtnText}>TRY NOW</Text>
                    </Pressable>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#141516',
        paddingHorizontal: 20,
        overflow: 'hidden'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo:{
        maxWidth:250,
        objectFit:'contain'
    },
    headline: {
        fontSize: 55,
        color: '#fff',
        fontWeight: 700,
        fontFamily: 'Jersey10-Regular'
    },
    subheadline: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 700,
        textAlign: 'center',
        fontFamily: 'Roboto-Regular',
    },
    themeBtnBox: {
        position: 'absolute',
        bottom: 80,
        width: '100%',
        borderRadius: 100
    },
    themeBtn: {
        backgroundColor: '#fff',
        padding: 22,
        width: '100%',
        borderRadius: 100
    },
    themeBtnText: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Roboto-SemiBold',
    }
});