import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Swipeable } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, deleteUser } from '../redux/slices/userSlice';

export default function UserDetails({ navigate, ...props }) {
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

    return (
        <LinearGradient
            colors={['#b41c1c', '#6b1f20']}
            style={styles.mainContainer}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Add Player</Text>

                <View style={styles.userNameBox}>
                    <TextInput
                        style={styles.input}
                        ref={nameInputRef}
                        placeholder="Enter name"
                        value={name}
                        placeholderTextColor="#999"
                        onChangeText={setName}
                        maxLength={20}
                    // onSubmitEditing={addPlayer}
                    />
                    <Pressable
                        onPress={handleGenderChange}
                        style={styles.button}
                    >
                        <Icon
                            style={styles.genderIcons}
                            name={genderIcons[currentIndex]}
                            size={24}
                            color="#fff"
                        />
                    </Pressable>
                </View>

                <TouchableOpacity
                    style={styles.btnAddUser}
                    onPress={addPlayer}
                >
                    <Text style={styles.btnAddUserText}>Add Player</Text>
                </TouchableOpacity>

                {users.length > 0 && (
                    <>
                        <Text style={styles.listTitle}>
                            Player{users.length !== 1 ? 's' : ''} Added
                        </Text>
                        <View style={styles.listWrapper}>
                            <FlatList
                                data={users}
                                keyExtractor={(item) => item.id}
                                renderItem={renderItem}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                    </>
                )}

                <TouchableOpacity
                    style={[
                        styles.btnStart,
                        users.length === 0 && { opacity: 0.7 }
                    ]}
                    onPress={startGame}
                    disabled={users.length === 0}
                >
                    <Text style={styles.btnStartText}>Start Game</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 20,
    },
    userNameBox: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        width: '100%',
    },
    genderIcons: {
        width: 25,
        textAlign: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        width: '80%',
        paddingLeft: 20,
        fontSize: 18,
        fontWeight: '600',
        borderRadius: 50,
        height: 60,
        backgroundColor: '#fff',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
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
    btnStart: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
        height: 60,
        backgroundColor: '#fccb06',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    btnStartText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    listTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 30,
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    listWrapper: {
        flex: 1,
        width: '100%',
        maxHeight: 250,
    },
    listItem: {
        marginTop: 0,
        paddingVertical: 0,
        borderRadius: 10,
        height: 50,
        borderBottomColor: '#ffffff4d',
        borderBottomWidth: 1,
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
        backgroundColor: 'red',
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
        alignItems: 'flex-end',
    },
});