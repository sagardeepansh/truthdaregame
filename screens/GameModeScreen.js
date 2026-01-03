import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ImageBackground, Platform, KeyboardAvoidingView, Switch, Image, BackHandler, Alert, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { setGameType, setAiMode, setSelectedInterest } from '../redux/slices/userSlice';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BackButton from './components/BackButton';
import { Ionicons } from "@expo/vector-icons";


const GameModeScreen = ({ navigate, goBack }) => {
    const dispatch = useDispatch();
    const aiMode = useSelector((state) => state.user.aiMode);
    const selectedInterest = useSelector((state) => state.user.selectedInterest);
    const [isAI, setIsAI] = useState(aiMode);

    const [selectedMode, setSelectedMode] = useState(null);

    // const handleAiMode = (type) => {
    //      dispatch(setAiMode(isAI)); 
    // }

    const interestOptions = [
        'Corporate',
        'Games',
        'Memes',
        'Indian Memes',
        'College Life',
        'School Life',
        'Friendship',
        'Funny',
        'Party',
        'Social Media',
        'Internet Culture',
        'Relatable',
        'Love & Dating',
        'Best Friends',
        'Food',
        'Street Food',
        'Desi Life',
        'Indian Parents',
        'Ice Breakers',
        'Random Fun',
    ];

    const startGame = () => {
        navigate('gamescreen');
    }
    const handleSelectGame = (type) => {
        dispatch(setGameType(type));
        // navigate('gamescreen');
        setSelectedMode(type);
        if (type !== 'normal') {
            dispatch(setSelectedInterest([])); // reset if not normal
        }
    };




    const toggleInterest = (interest) => {
        let updatedInterests;

        if (selectedInterest.includes(interest)) {
            updatedInterests = selectedInterest.filter((i) => i !== interest);
        } else {
            updatedInterests = [...selectedInterest, interest];
        }

        dispatch(setSelectedInterest(updatedInterests));
    };


    useEffect(() => {
        dispatch(setAiMode(isAI));
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
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
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
                                <View style={styles.containermood}>
                                    <View style={styles.toggleRow}>
                                        <Text style={styles.title}>Select Mode</Text>
                                        <View style={styles.toggleRow}>
                                            <Ionicons
                                                name="information-circle-outline"
                                                size={22}
                                                color="#ffffff9f"
                                                style={styles.infoIcon}
                                                onPress={() => Alert.alert("AI Mode", "Auto-generate questions using AI")}
                                            />
                                            <Switch
                                                value={isAI}
                                                onValueChange={setIsAI}
                                                thumbColor={isAI ? "#AC1C1C" : "#f4f3f4b6"}
                                                trackColor={{ false: "#767577", true: "#ffffffff" }}
                                            />
                                        </View>
                                    </View>
                                </View>
                                {/* Normal Mode */}
                                <TouchableOpacity
                                    style={[styles.modeButton, selectedMode === 'normal' && styles.ModeSelected, styles.normalMode]}
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

                                {selectedMode === 'normal' && (
                                    <View style={styles.interestContainer}>
                                        <Text style={styles.interestTitle}>
                                            What type of questions do you like?
                                        </Text>

                                        <View style={styles.interestList}>
                                            {interestOptions.map((item) => {
                                                const isSelected = selectedInterest.includes(item);

                                                return (
                                                    <TouchableOpacity
                                                        key={item}
                                                        onPress={() => toggleInterest(item)}
                                                        style={[
                                                            styles.interestChip,
                                                            isSelected && styles.interestChipSelected,
                                                        ]}
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.interestText,
                                                                isSelected && styles.interestTextSelected,
                                                            ]}
                                                        >
                                                            {item}
                                                        </Text>
                                                    </TouchableOpacity>
                                                );
                                            })}
                                        </View>
                                    </View>
                                )}


                                {/* Adult Mode */}
                                <TouchableOpacity
                                    style={[styles.modeButton, selectedMode === 'adult' && styles.ModeSelected, styles.adultMode]}
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
                </ScrollView>
                <View style={[styles.themeBtnBox]}>
                    <Pressable
                        onPress={startGame}
                        style={[styles.themeBtn]}
                    >
                        <Text style={styles.themeBtnText}>START NOW</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    themeBtnBox: {
        position: 'absolute',
        bottom: 45,
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
    },
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
    containermood: {

    },
    toggleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
    },
    infoIcon: {
        marginRight: 10,
    },
    label: {
        fontSize: 18,
        color: '#fff',
    },
    modeButton: {
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#ac1c1cff',
        marginBottom: 20,
        borderTopRightRadius: 60,
        backgroundColor: '#00000036',
        opacity: 0.6
    },
    ModeSelected: {
        borderWidth: 2,
        // borderColor: '#b9881eff',
        opacity: 1,
        // backgroundColor: '#492b179d',
    },
    normalMode: {
        // backgroundColor: '#00000036',
    },
    adultMode: {
        // backgroundColor: '#00000036',
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
    interestContainer: {
        marginBottom: 15,
    },
    interestTitle: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
        marginBottom: 10,
    },
    interestList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    interestChip: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        margin: 6,
    },
    interestChipSelected: {
        backgroundColor: '#ac1c1cff',
        borderColor: '#ac1c1cff',
    },
    interestText: {
        color: '#f8f8f8ff',
        fontWeight: '600',
    },
    interestTextSelected: {
        color: '#fff',
    },

});

export default GameModeScreen;