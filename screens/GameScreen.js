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
    Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';

const GameScreen = ({ navigation }) => {
    const { users } = useSelector((state) => state.user);
    const gameType = useSelector((state) => state.user.gameType);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [gameHistory, setGameHistory] = useState([]);
    const [currentTask, setCurrentTask] = useState('');
    const [gameState, setGameState] = useState('spin'); // 'spin', 'choose', 'task'
    const [taskType, setTaskType] = useState(''); // 'truth' or 'dare'
    const [spinValue] = useState(new Animated.Value(0));

    // Sample questions/tasks
    const questions = [
        "What's your most embarrassing moment?",
        "Have you ever cheated on a test?",
        "What's your biggest fear?",
        "Would you rather lose all your money or all your friends?",
        "What's something you've done that you hope nobody finds out about?",
        "Have you ever lied to get out of trouble?",
        "What's the most childish thing you still do?"
    ];

    const dares = [
        "Do your best dance for 30 seconds",
        "Let the group choose a new hairstyle for you",
        "Sing a song of the group's choosing",
        "Call a friend and say 'I love you' in a funny voice",
        "Let someone draw on your face with a marker",
        "Eat a spoonful of a condiment you dislike",
        "Do an impression of someone in the room"
    ];

    useEffect(() => {
        if (users.length === 0) {
            Alert.alert("No players!", "Please add players first");
            navigation.goBack();
        }
    }, []);

    const spinWheel = () => {
        setGameState('spinning');

        spinValue.setValue(0);
        Animated.timing(
            spinValue,
            {
                toValue: 1,
                duration: 2000,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true
            }
        ).start(() => {
            setGameState('choose');
        });
    };

    const getRandomTruth = () => {
        const randomIndex = Math.floor(Math.random() * questions.length);
        const truth = questions[randomIndex];
        setCurrentTask(truth);
        setTaskType('truth');
        setGameState('task');
        return truth;
    };

    const getRandomDare = () => {
        const randomIndex = Math.floor(Math.random() * dares.length);
        const dare = dares[randomIndex];
        setCurrentTask(dare);
        setTaskType('dare');
        setGameState('task');
        return dare;
    };

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
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    const currentPlayer = users[currentPlayerIndex];

    return (
        <LinearGradient colors={['#b41c1c', '#6b1f20']} style={styles.container}>
            <View style={styles.content}>
                {/* Current Player Display */}
                {gameState === 'spin' &&
                    <View style={styles.playerContainer}>
                        <Text style={styles.turnText}>Tap to</Text>
                        <Text style={styles.playerName}>Spin the bottle</Text>
                        <Image
                            source={require('../assets/bottle.png')}
                            style={styles.image}
                            resizeMode="contain" // or "cover", "stretch", etc.
                        />
                    </View>
                }
                {gameState !== 'spin' && gameState !== 'spinning' &&
                    <View style={styles.playerContainer}>
                        <Text style={styles.turnText}>It's</Text>
                        <Text style={styles.playerName}>{currentPlayer?.name}'s turn</Text>
                    </View>
                }

                {/* Game State Management */}
                {gameState === 'spin' &&  (
                    <View style={styles.spinContainer}>
                        <TouchableOpacity
                            style={styles.spinButton}
                            onPress={spinWheel}
                        >
                            <Text style={styles.spinButtonText}>SPIN</Text>
                        </TouchableOpacity>
                    </View>
                )}

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
                        <Text style={styles.promptText}>Choose a challenge</Text>
                        <View style={styles.challengeButtons}>
                            <TouchableOpacity
                                style={[styles.challengeButton, styles.truthButton]}
                                onPress={getRandomTruth}
                            >
                                <Text style={styles.challengeButtonText}>Truth</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.challengeButton, styles.dareButton]}
                                onPress={getRandomDare}
                            >
                                <Text style={styles.challengeButtonText}>Dare</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {gameState === 'task' && (
                    <View style={styles.taskContainer}>
                        <Text style={styles.taskTypeText}>
                            {taskType === 'truth' ? 'TRUTH' : 'DARE'}
                        </Text>
                        <Text style={styles.taskText}>{currentTask}</Text>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={handleNextTurn}
                        >
                            <Text style={styles.actionButtonText}>
                                Next Player
                            </Text>
                        </TouchableOpacity>
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
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    playerContainer: {
        alignItems: 'center',
        marginVertical: 15,
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
        width: 200,
        height: 200,
    },
    spinButton: {
        backgroundColor: '#fccb06',
        padding: 0,
        borderRadius: 50,
        width: 150,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    spinButtonText: {
        color: '#000',
        fontSize: 24,
        fontWeight: 'bold',
    },
    spinWheelContainer: {
        alignItems: 'center',
        marginVertical: 40,
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
    challengeButtons: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: '100%',
    },
    challengeButton: {
        padding: 15,
        marginBottom: 30,
        borderRadius: 50,
        width: '200',
        alignItems: 'center',
    },
    truthButton: {
        backgroundColor: '#4285F4', // Blue for truth
    },
    dareButton: {
        backgroundColor: '#EA4335', // Red for dare
    },
    challengeButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    taskContainer: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: 20,
        borderRadius: 15,
        marginVertical: 20,
        minHeight: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    taskTypeText: {
        color: '#fccb06',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    taskText: {
        color: '#fff',
        fontSize: 22,
        textAlign: 'center',
        fontWeight: '600',
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
});

export default GameScreen;