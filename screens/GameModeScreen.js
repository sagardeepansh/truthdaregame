import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { setGameType } from '../redux/slices/userSlice';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
            <SafeAreaView>
                <View style={styles.backiconbox}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}>
                        <Icon name="angle-left" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
           

            <View style={styles.modesContainer}>
                 <View style={styles.header}>
                <Text style={styles.title}>Select Game Mode</Text>
            </View>
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
        // padding: 20,
        // justifyContent: 'space-between',
    },
    backiconbox: {
        padding: 20,
    },
    header: {
        // alignItems: 'center',
        // marginTop: 40,
    },
    title: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
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