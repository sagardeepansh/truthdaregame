// import { StyleSheet, View, Text } from 'react-native';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useState } from 'react';

export default function UserDetails({ navigation }) {
    const [name, setName] = useState('');
    const [users, setUsers] = useState([]);
    const genders = ['male', 'female', 'trans'];
    const genderIcons = ['mars', 'venus', 'transgender-alt'];
    const [currentIndex, setCurrentIndex] = useState(0);

    const addUser = () => {
        if (!name.trim()) {
            Alert.alert('Validation Error', 'Name is required');
            return;
        }

        const newUser = { id: Date.now().toString(), name, sex: genders[currentIndex] };
        setUsers([...users, newUser]);
        setName('');
    };


    const handlePress = () => {
        const nextIndex = (currentIndex + 1) % genders.length;
        setCurrentIndex(nextIndex);
    };

    return (
        <LinearGradient
            colors={['#009cf7', '#016df5']} // Set your gradient colors here
            style={styles.mainContainer}
        >
            <View style={styles.container} >
                <Text style={styles.title}>Add User</Text>
                <View style={styles.userNameBox}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter name"
                        value={name}
                        onChangeText={setName}
                    />
                    <Pressable onPress={handlePress} style={styles.button}>
                        <Icon style={styles.genderIcons} name={genderIcons[currentIndex]} size={24} color="#fff" /> 
                    </Pressable>
                </View>
                <TouchableOpacity style={styles.btnAddUser} onPress={addUser}>
                    <Text style={styles.btnAddUserText}>Add User</Text>
                </TouchableOpacity>
                <Text style={styles.listTitle}>User List:</Text>
                {users.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No users added yet</Text>
                    </View>
                ) : (
                    <FlatList
                        data={users}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.listContainer}
                        renderItem={({ item }) => (
                            <Text style={styles.listItem}>{item.name} ({item.sex})</Text>
                        )}
                    />
                )}
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',  // Vertically center
        alignItems: 'center',  // Horizontally center
        paddingHorizontal: 20,  // To ensure no content is too close to the edges
    },
    container: {
        width: '100%',
    },
    userNameBox: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    genderIcons:{
        width:25,
        maxWidth:'100%',
    },
    title: { 
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'Roboto_400Regular',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        padding: 10,
        marginBottom: 0,
        height: 50,
        verticalAlign: 'middle',
        borderWidth: 0,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 50,
        justifyContent: 'center', // Vertically center
        alignItems: 'center',
        backgroundColor: '#0b1b3a',
        marginBottom: 0,
    },
    btnAddUser: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 50,
        backgroundColor: '#0b1b3a',
        marginBottom: 0,
        marginTop: 20, // Fixed from string to number
        justifyContent: 'center', // Vertically center
        alignItems: 'center',     // Horizontally center
    },

    btnAddUserText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    listTitle: {
        fontSize: 18,
        marginBottom: 10,
        color: '#fff',
    },
    emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#666',
    },
    listContainer: {
        paddingBottom: 100,
        width: '100%',
    },
    listItem: {
        fontSize: 16,
        paddingVertical: 4,
        color: '#fff',
    },
});
