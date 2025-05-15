import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { setGameType } from '../redux/slices/userSlice';

const GameModeScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const handleSelectGame = (type) => {
        dispatch(setGameType(type));
        navigation.navigate('gamescreen');
    };

    return (
        <LinearGradient
            colors={['#b41c1c', '#6b1f20']}
            style={styles.container}
        >
            <View style={styles.header}>
                {/* <Image 
                        source={require('../assets/game-logo.png')}
                        style={styles.logo}
                    /> */}
                <Text style={styles.title}>Select Game Mode</Text>
            </View>

            <View style={styles.modesContainer}>
                {/* Normal Mode */}
                <TouchableOpacity
                    style={[styles.modeButton, styles.normalMode]}
                    onPress={() => handleSelectGame('normal')}
                >
                    {/* <Image 
                            source={require('../assets/normal-mode-icon.png')}
                            style={styles.modeIcon}
                        /> */}
                    <Text style={styles.modeText}>Normal Mode</Text>
                    <Text style={styles.modeDescription}>
                        Family-friendly questions and dares
                    </Text>
                </TouchableOpacity>

                {/* Adult Mode */}
                <TouchableOpacity
                    style={[styles.modeButton, styles.adultMode]}
                    onPress={() => handleSelectGame('adult')}
                >
                    {/* <Image 
                            source={require('../assets/adult-mode-icon.png')}
                            style={styles.modeIcon}
                        /> */}
                    <Text style={styles.modeText}>Adult Mode</Text>
                    <Text style={styles.modeDescription}>
                        18+ only. Naughty questions and dares
                    </Text>
                    <View style={styles.ageRestriction}>
                        <Text style={styles.ageRestrictionText}>18+</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
    header: {
        alignItems: 'center',
        marginTop: 40,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
    },
    title: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    modesContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    modeButton: {
        borderRadius: 20,
        padding: 25,
        marginVertical: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    normalMode: {
        backgroundColor: '#4CAF50', // Green
    },
    adultMode: {
        backgroundColor: '#F44336', // Red
        position: 'relative',
    },
    modeIcon: {
        width: 60,
        height: 60,
        marginBottom: 15,
    },
    modeText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    modeDescription: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 16,
        textAlign: 'center',
    },
    ageRestriction: {
        position: 'absolute',
        top: -10,
        right: -10,
        backgroundColor: '#000',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
    },
    ageRestrictionText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    backButton: {
        alignSelf: 'center',
        padding: 15,
        marginBottom: 30,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default GameModeScreen;