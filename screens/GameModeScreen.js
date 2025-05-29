import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ImageBackground, Platform, KeyboardAvoidingView, Image, BackHandler } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { setGameType } from '../redux/slices/userSlice';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BackButton from './components/BackButton';

const GameModeScreen = ({ navigate, goBack }) => {
    const dispatch = useDispatch();

    const handleSelectGame = (type) => {
        dispatch(setGameType(type));
        navigate('gamescreen');
    };
    useEffect(() => {
        const backAction = () => {
            goBack();
            return true; // prevent default behavior
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
        return () => backHandler.remove(); // cleanup on unmount
    }, []);

    return (
        <ImageBackground source={require('../assets/inner-page.png')} style={styles.background} resizeMode="cover" >
            {/* <SafeAreaView>
                <View style={styles.backiconbox}>
                    <TouchableOpacity
                        onPress={() => navigate('userdetails')}>
                        <Icon name="angle-left" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView> */}
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <View>
                        <View style={[
                            styles.topheadline,
                            Platform.OS !== 'ios' ? { marginTop: 60 } : null
                        ]}>
                            <BackButton onPress={goBack} />
                            {/* <Text style={styles.headline}>Truth & Dare</Text> */}
                            <Image
                                source={require('../assets/logo.png')}
                                style={styles.logo}
                            />
                            <Text style={styles.subheadline}>Unlock new comfort </Text>
                        </View>

                        <View style={styles.modesContainer}>
                            <View >
                                <Text style={styles.title}>SELECT MODE</Text>
                            </View>
                            {/* Normal Mode */}
                            <TouchableOpacity
                                style={[styles.modeButton, styles.normalMode]}
                                onPress={() => handleSelectGame('normal')}
                            >
                                <Image
                                    source={require('../assets/high-five.png')}
                                    style={styles.modeIcon}
                                />
                                <Text style={styles.modeText}>Playing with Friends</Text>
                                <Text style={styles.modeDescription}>
                                    Fun and family-friendly truths and dares for everyone to enjoy!
                                </Text>
                            </TouchableOpacity>

                            {/* Adult Mode */}
                            <TouchableOpacity
                                style={[styles.modeButton, styles.adultMode]}
                                onPress={() => handleSelectGame('adult')}
                            >
                                <Image
                                    source={require('../assets/couple-icon.png')}
                                    style={styles.modeIcon}
                                />
                                <Text style={styles.modeText}>Couple Zone (+18)</Text>
                                <Text style={styles.modeDescription}>
                                    Spicy and bold truths and dares for adults only. Enter if you dare!
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#141516',
        paddingHorizontal: 20,
        overflow: 'hidden'
    },
    container: {
        flex: 1,
    },
    backiconbox: {
        padding: 20,
    },
    topheadline: {
        marginBottom: 60,
        marginTop: 20,
    },
    headline: {
        fontSize: 55,
        color: '#fff',
        fontWeight: 700,
        textAlign: 'center',
        fontFamily: 'Jersey10-Regular'
    },
    subheadline: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 700,
        textAlign: 'center',
        fontFamily: 'Roboto-Regular',
    },
    logo: {
        maxWidth: 230,
        margin: 'auto',
        objectFit: 'contain'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'Roboto-SemiBold',
        marginBottom: 10,
        textAlign: 'start',
    },
    modesContainer: {
        // flex: 1,
        justifyContent: 'center',
    },
    modeButton: {
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#AC1C1C',
        marginBottom: 20,
        borderTopRightRadius: 60,
    },
    normalMode: {
        backgroundColor: '#00000036',
    },
    adultMode: {
        backgroundColor: '#00000036',
    },
    modeIcon: {
        width: 60,
        height: 60,
        marginBottom: 10,
    },
    modeText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    modeDescription: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 15,
        textAlign: 'center',
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