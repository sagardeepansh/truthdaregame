import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    FlatList,
    Animated,
    Easing,
    Image,
    SafeAreaView,
    ImageBackground,
    Pressable
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BackButton from './components/BackButton';

const GameScreen = ({ navigate, goBack }) => {
    const { users } = useSelector((state) => state.user);
    const gameType = useSelector((state) => state.user.gameType);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [gameHistory, setGameHistory] = useState([]);
    const [currentTask, setCurrentTask] = useState('');

    const [availableTruths, setAvailableTruths] = useState([
        { text: "What's your most embarrassing moment?" },
        "Have you ever cheated on a test?",
        "What's your biggest fear?",
        "Would you rather lose all your money or all your friends?",
        "What's something you've done that you hope nobody finds out about?",
        "Have you ever lied to get out of trouble?",
        "What's the most childish thing you still do?"
    ]);
    const [availableDares, setAvailableDares] = useState([
        "Do your best dance for 30 seconds",
        "Let the group choose a new hairstyle for you",
        "Sing a song of the group's choosing",
        "Call a friend and say 'I love you' in a funny voice",
        "Let someone draw on your face with a marker",
        "Eat a spoonful of a condiment you dislike",
        "Do an impression of someone in the room"
    ]);
    const [gameState, setGameState] = useState('spin'); // 'spin', 'choose', 'task'
    const [taskType, setTaskType] = useState(''); // 'truth' or 'dare'
    const [spinValue] = useState(new Animated.Value(0));

    useEffect(() => {
        fetch(`https://truthanddare-backend.vercel.app/api/questions?category=${gameType}&limit=50`) // replace with your API endpoint
            .then((response) => response.json())
            .then((json) => {
                setAvailableDares(json?.dare || []);
                setAvailableTruths(json?.truth || []);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    useEffect(() => {
        if (users.length === 0) {
            Alert.alert("No players!", "Please add players first");
            navigate('userdetails');
        }
    }, []);
    const spinWheel = () => {
        setGameState('spinning');

        spinValue.setValue(0);
        const angle = Math.floor(5 + Math.random() * 5) * 360; // 1800° to 3600°
        Animated.timing(spinValue, {
            toValue: angle,
            duration: 2500,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true
        }).start(() => setGameState('choose'));
    };

    const getRandomTruth = () => {
        if (availableTruths.length === 0) {
            Alert.alert("No more truths left!");
            return;
        }

        const randomIndex = Math.floor(Math.random() * availableTruths.length);
        const truth = availableTruths[randomIndex];

        // Remove used truth
        const updatedTruths = [...availableTruths];
        updatedTruths.splice(randomIndex, 1);
        setAvailableTruths(updatedTruths);

        setCurrentTask(truth?.text);
        setTaskType('truth');
        setGameState('task');
    };


    const getRandomDare = () => {
        if (availableDares.length === 0) {
            Alert.alert("No more dares left!");
            return;
        }

        const randomIndex = Math.floor(Math.random() * availableDares.length);
        const dare = availableDares[randomIndex];

        // Remove used dare
        const updatedDares = [...availableDares];
        updatedDares.splice(randomIndex, 1);
        setAvailableDares(updatedDares);

        setCurrentTask(dare?.text);
        setTaskType('dare');
        setGameState('task');
    };
    const confirmBack = () => {
        Alert.alert(
            'Exit Game',
            'Are you sure you want to exit the game?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Go back', onPress: () => goBack() }
            ]
        );

    }

    const handleNextTurn = () => {
        // Ensure there are players
        if (users.length === 0) return;

        // Select a random player (excluding the current one if desired)
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * users.length);
        } while (
            users.length > 1 &&  // Skip check if only 1 player
            nextIndex === currentPlayerIndex  // Avoid same player twice in a row
        );

        setCurrentPlayerIndex(nextIndex);
        setGameState('spin');
        setTaskType('');

        // Add to history if there was a challenge completed
        if (currentTask) {
            setGameHistory(prev => [
                {
                    player: users[currentPlayerIndex].name,
                    task: currentTask,
                    type: taskType,
                    id: Date.now().toString()
                },
                ...prev
            ]);
        }
    };

    const spin = spinValue.interpolate({
        inputRange: [0, 3600],
        outputRange: ['0deg', '3600deg']
    });

    const currentPlayer = users[currentPlayerIndex];

    return (
        <ImageBackground source={require('../assets/inner-page.png')} style={styles.background} resizeMode="cover" >
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.topheadline}>
                        <BackButton onPress={confirmBack} />
                        {/* <Text style={styles.headline}>Truth & Dare</Text> */}
                        <Image
                            source={require('../assets/logo.png')}
                            style={styles.logo}
                        />
                        <Text style={styles.subheadline}>Unlock new comfort </Text>
                    </View>
                    {/* Current Player Display */}
                    {gameState === 'spin' &&
                        <View style={styles.playerContainer}>
                            <Text style={styles.SpinText}>Tap SPIN</Text>
                            <Text style={styles.SpinTextPara}>let destiny decide!</Text>
                            <Pressable
                                // style={styles.themeBtn}
                                onPress={spinWheel}
                            >
                                <Image
                                    source={require('../assets/bottle.png')}
                                    style={styles.image}
                                    resizeMode="contain" // or "cover", "stretch", etc.
                                />
                            </Pressable>
                        </View>
                    }
                    {gameState !== 'spin' && gameState !== 'spinning' &&
                        <View style={styles.playerContainer}>
                            <Text style={styles.playerName}>{currentPlayer?.name}'s turn</Text>
                        </View>
                    }

                    {/* Game State Management */}
                    {/* {gameState === 'spin' && (
                        <View style={styles.spinContainer}>
                            <TouchableOpacity
                                style={styles.spinButton}
                                onPress={spinWheel}
                            >
                                <Text style={styles.spinButtonText}>SPIN</Text>
                            </TouchableOpacity>
                        </View>
                    )} */}

                    {gameState === 'spinning' && (
                        <View style={styles.spinWheelContainer}>
                            <Animated.View
                                style={[
                                    // styles.spinWheel,
                                    { transform: [{ rotate: spin }] }
                                ]}
                            >
                                <Image
                                    source={require('../assets/bottle.png')}
                                    style={styles.image}
                                    resizeMode="contain" // or "cover", "stretch", etc.
                                />
                            </Animated.View>
                        </View>
                    )}

                    {gameState === 'choose' && (
                        <View style={styles.selectionContainer}>
                            <View style={styles.themeBtnBoxTD}>
                                <TouchableOpacity
                                    style={[styles.themeBtn]}
                                    onPress={getRandomTruth}
                                >
                                    <Text style={styles.themeBtnText}>TRUTH</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.themeBtn]}
                                    onPress={getRandomDare}
                                >
                                    <Text style={styles.themeBtnText}>DARE</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    {gameState === 'task' && (
                        <View style={styles.taskContainer}>
                            <Text style={styles.taskTypeText}>
                                {taskType === 'truth' ? 'Truth' : 'Dare'}
                            </Text>
                            <Text style={styles.taskText}>{currentTask}</Text>
                        </View>
                    )}

                    {/* Game History */}
                    {/* {gameHistory.length > 0 && (
                    <View style={styles.historyContainer}>
                        <Text style={styles.historyTitle}>Game History</Text>
                        <FlatList
                            data={gameHistory}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View style={[
                                    styles.historyItem,
                                    item.type === 'truth' ? styles.truthHistory : styles.dareHistory
                                ]}>
                                    <Text style={styles.historyPlayer}>{item.player}:</Text>
                                    <Text style={styles.historyTask}>{item.task}</Text>
                                </View>
                            )}
                            style={styles.historyList}
                        />
                    </View>
                )} */}
                    {gameState === 'spin' && (
                        <View style={styles.themeBtnBox} >
                            <Pressable
                                style={styles.themeBtn}
                                onPress={spinWheel}
                            >
                                <Text style={styles.themeBtnText}>SPIN</Text>
                            </Pressable>
                        </View>
                    )}
                    {gameState === 'task' && (
                        <View style={styles.themeBtnBox} >
                            <Pressable
                                style={styles.themeBtn}
                                onPress={handleNextTurn}
                            >
                                <Text style={styles.themeBtnText}>NEXT TURN</Text>
                            </Pressable>
                        </View>
                    )}
                </View>
            </SafeAreaView>
        </ImageBackground >
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
    content: {
        flex: 1,
    },
    SpinText: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    SpinTextPara: {
        color: '#fff',
        fontSize: 24,
        fontFamily: 'Roboto-Light',
        marginBottom: 15,
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
    playerContainer: {
        alignItems: 'center',
        marginVertical: 0,
    },
    turnText: {
        color: '#fff',
        fontSize: 24,
        marginBottom: 5,
    },
    playerName: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    spinContainer: {
        alignItems: 'center',
        marginVertical: 40,
    },
    image: {
        marginTop: 70,
        width: 200,
        height: 200,
    },
    themeBtnBoxTD: {
        width: '100%',
    },
    themeBtnBox: {
        position: 'absolute',
        bottom: 45,
        width: '100%',
        borderRadius: 100
    },
    themeBtn: {
        backgroundColor: '#fff',
        padding: 22,
        marginVertical: 10,
        width: '100%',
        borderRadius: 100
    },
    themeBtnText: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Roboto-SemiBold',
    },
    spinWheelContainer: {
        alignItems: 'center',
        marginVertical: 80,
    },
    spinWheel: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#fccb06',
        justifyContent: 'center',
        alignItems: 'center',
    },
    spinWheelPointer: {
        position: 'absolute',
        top: -15,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 15,
        borderRightWidth: 15,
        borderBottomWidth: 30,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#fff',
    },
    selectionContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    promptText: {
        color: '#fff',
        fontSize: 22,
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    challengeButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    taskContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        padding: 30,
        borderRadius: 15,
        marginVertical: 20,
        minHeight: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    taskTypeText: {
        color: '#fff',
        fontSize: 19,
        fontWeight: '800',
        // fontFamily: 'Roboto-SemiBold',
        textAlign: 'center',
        marginBottom: 10,
    },
    taskText: {
        color: '#fff',
        fontSize: 24,
        textAlign: 'center',
        fontWeight: '600',
        fontFamily: 'Roboto-Light',
        marginBottom: 20,
    },
    actionButton: {
        backgroundColor: '#fccb06',
        padding: 15,
        borderRadius: 50,
        alignItems: 'center',
        width: '80%',
    },
    actionButtonText: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
    },
    historyContainer: {
        flex: 1,
        marginTop: 20,
    },
    historyTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    historyList: {
        flex: 1,
    },
    historyItem: {
        padding: 10,
        borderRadius: 8,
        marginBottom: 8,
    },
    truthHistory: {
        backgroundColor: 'rgba(66, 133, 244, 0.3)', // Semi-transparent blue
    },
    dareHistory: {
        backgroundColor: 'rgba(234, 67, 53, 0.3)', // Semi-transparent red
    },
    historyPlayer: {
        color: '#fccb06',
        fontWeight: 'bold',
        marginBottom: 3,
    },
    historyTask: {
        color: '#fff',
    },
    logo: {
        maxWidth: 230,
        margin: 'auto',
        objectFit: 'contain'
    },
});

export default GameScreen;