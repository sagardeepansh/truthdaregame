import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ImageBackground,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    BackHandler,
    Keyboard,
    ScrollView,
    Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Swipeable } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, deleteUser } from '../redux/slices/userSlice';
import BackButton from './components/BackButton';
import { Image } from 'react-native';

export default function UserDetails({ navigate, goBack }) {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.user);
    const [name, setName] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const nameInputRef = React.useRef(null);




    const genders = ['male', 'female', 'trans'];
    const genderIcons = ['mars', 'venus', 'transgender-alt'];

    const addPlayer = () => {
        if (!name?.trim()) {
            Alert.alert('Validation Error', 'Name is required');
            return;
        }

        dispatch(
            addUser({
                id: Date.now().toString(),
                name,
                gender: genders[currentIndex],
                sex: currentIndex
            })
        );
        setName();
        nameInputRef.current?.blur();
    };

    const handleGenderChange = () => {
        const nextIndex = (currentIndex + 1) % genders.length;
        setCurrentIndex(nextIndex);
    };

    const handleDelete = (id) => {
        Alert.alert(
            'Delete Player',
            'Are you sure you want to delete this player?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', onPress: () => dispatch(deleteUser(id)) }
            ]
        );
    };

    const startGame = () => {
        if (users.length < 2) {
            Alert.alert('Validation Error', `Please add at least two player ${users.length}`);
            return;
        }
        navigate('gamemodescreen'); // Replace with your actual game screen name
    };

    const renderRightActions = (id) => (
        <View style={styles.rightAction}>
            <Pressable
                onPress={() => handleDelete(id)}
                style={styles.deleteButton}
            >
                <Icon name={'trash'} size={20} color="#fff" />
            </Pressable>
        </View>
    );

    const renderItem = ({ item }) => (
        <Swipeable
            overshootRight={false}
            renderRightActions={() => renderRightActions(item.id)}
        >
            <View style={styles.listItem}>
                <Text style={styles.listItemName}>{item.name}</Text>
                <Icon
                    name={genderIcons[item.sex]}
                    size={24}
                    color="#fff"
                />
            </View>
        </Swipeable>
    );

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: isKeyboardVisible ? 0 : 1,
            duration: 400,
            useNativeDriver: true,
        }).start();
    }, [isKeyboardVisible, fadeAnim]);

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

    // useEffect(() => {
    //     const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
    //         setKeyboardVisible(true);
    //     });
    //     const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
    //         setKeyboardVisible(false);
    //     });

    //     return () => {
    //         showSubscription.remove();
    //         hideSubscription.remove();
    //     };
    // }, []);

    return (
        <ImageBackground source={require('../assets/inner-page.png')} style={styles.background} resizeMode="cover" >
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0} // optional offset
                >
                    <View style={styles.container}>
                        <View>
                            <View style={[
                                styles.topheadline,
                                Platform.OS !== 'ios' ? { marginTop: 60 } : null
                            ]}>
                                <BackButton onPress={goBack} />
                                <Image
                                    source={require('../assets/logo.png')}
                                    style={styles.logo}
                                />
                                {/* <Text style={styles.headline}>Truth & Dare</Text> */}
                                <Text style={styles.subheadline}>Unlock new comfort </Text>

                            </View>
                            <ScrollView disableScrollViewPanResponder={true} contentContainerStyle={{ flexGrow: 1 }}>
                                <View style={styles.addPlayer}>
                                    <Text style={styles.title}>ADD PLAYER</Text>

                                </View>
                                <View style={styles.userNameBox}>
                                    <TextInput
                                        style={styles.input}
                                        ref={nameInputRef}
                                        placeholder="Enter name"
                                        value={name}
                                        placeholderTextColor="#999"
                                        onFocus={() => setKeyboardVisible(true)}
                                        onBlur={() => setKeyboardVisible(false)}
                                        onChangeText={setName}
                                        maxLength={20}
                                    // onSubmitEditing={addPlayer}
                                    />
                                    <Pressable
                                        onPress={handleGenderChange}
                                    >
                                        <Icon
                                            style={styles.genderIcons}
                                            name={genderIcons[currentIndex]}
                                            size={45}
                                            color="#fff"
                                        />
                                    </Pressable>
                                </View>

                                {users.length > 0 && (
                                    <>
                                        <View style={styles.listTitleBox}>
                                            <Text style={styles.listTitle}>
                                                Player{users.length !== 1 ? 's' : ''} Added
                                            </Text>
                                            <Text style={styles.listSubheadline}>
                                                Left swipe to delete
                                            </Text>
                                        </View>

                                        <View style={styles.listWrapper}>
                                            <FlatList
                                                nestedScrollEnabled={true}

                                                data={users}
                                                keyExtractor={(item) => item.id}
                                                renderItem={renderItem}
                                                showsVerticalScrollIndicator={false}
                                            />
                                        </View>
                                    </>
                                )}
                            </ScrollView>
                        </View>

                        {/* <TouchableOpacity
                        style={[
                            styles.btnStart,
                            users.length === 0 && { opacity: 0.7 }
                        ]}
                        onPress={startGame}
                        disabled={users.length === 0}
                    >
                        <Text style={styles.btnStartText}>Start Game</Text>
                    </TouchableOpacity> */}
                        <View style={[styles.themeBtnBox, isKeyboardVisible && { bottom: 0 }]}>

                            <Pressable
                                onPress={addPlayer}
                                style={[styles.themeBtnOutline, isKeyboardVisible && { backgroundColor: '#000' }]}
                            >
                                <Text style={styles.themeBtnOutlineText}>ADD PLAYER</Text>
                            </Pressable>
                            <Animated.View style={{ opacity: fadeAnim }}>
                                {!isKeyboardVisible && (
                                    <Pressable
                                        onPress={startGame}
                                        style={[styles.themeBtn, users.length === 0 && { opacity: 0.7 }]}
                                        disabled={users.length === 0}
                                    >
                                        <Text style={styles.themeBtnText}>START NOW</Text>
                                    </Pressable>
                                )}
                            </Animated.View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ImageBackground >
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#141516',
        paddingHorizontal: 20,
        overflow: 'hidden'
    },
    mainContainer: {
        flex: 1,
    },
    topheadline: {
        marginBottom: 60,
        marginTop: 25,
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
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        // paddingTop: 40,
        // paddingBottom: 20,
    },
    userNameBox: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        width: '100%',
    },
    backButton: {
        width: 50,
        textAlign: 'left',
        position: 'absolute',
        left: 0,
        top: 20,
        zIndex: 999,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'Roboto-SemiBold',
        marginBottom: 10,
        textAlign: 'start',
    },
    input: {
        width: '80%',
        paddingLeft: 15,
        fontSize: 18,
        fontWeight: '600',
        borderRadius: 11,
        color: '#fff',
        height: 50,
        backgroundColor: 'rgba(217, 217, 217, 0.18)',
    },
    genderIcons: {
        marginRight: 10,
    },
    button: {
        // paddingVertical: 10,
        // paddingHorizontal: 20,
        // borderRadius: 50,
        // height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#000',
    },
    btnAddUser: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
        height: 60,
        backgroundColor: '#000',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    btnAddUserText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    // btnStart: {
    //     paddingVertical: 10,
    //     paddingHorizontal: 20,
    //     borderRadius: 50,
    //     height: 60,
    //     backgroundColor: '#fccb06',
    //     marginTop: 20,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     width: '100%',
    // },
    // btnStartText: {
    //     color: '#000',
    //     fontSize: 18,
    //     fontWeight: 'bold',
    //     textAlign: 'center',
    // },
    listTitleBox: {
        alignItems: 'flex-end',
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'space-between',
    },
    listTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 30,
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    listSubheadline: {
        fontSize: 12,
        color: '#ffffffad',
        marginBottom: 10,
    },
    listWrapper: {
        flex: 1,
        width: '100%',
        maxHeight: 250,
    },
    listItem: {
        marginTop: 0,
        width: '100%',
        paddingVertical: 0,
        borderRadius: 10,
        height: 50,
        borderBottomColor: '#ffffff4d',
        borderBottomWidth: 1,
        fontFamily: 'Roboto-Regular',
        padding: 10,
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    listItemName: {
        fontSize: 18,
        color: '#fff',
    },
    rightAction: {
        // backgroundColor: '#ffffff29',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        marginTop: 10,
        borderRadius: 0,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    deleteButton: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        paddingBottom: 10,
        alignItems: 'flex-end',
    },
    themeBtnOutline: {
        borderWidth: 1,
        color: '#fff',
        padding: 25,
        borderColor: '#fff',
        // backgroundColor: '#000000a6',
        width: '100%',
        marginBottom: 20,
        borderRadius: 100
    },
    themeBtnOutlineText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Roboto-SemiBold',
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
        width: '100%',
        borderRadius: 100
    },
    themeBtnText: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Roboto-SemiBold',
    },
    logo: {
        maxWidth: 230,
        margin: 'auto',
        objectFit: 'contain'
    },
});