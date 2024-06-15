import { useNavigation } from "@react-navigation/core";
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { authentication } from "../firebase";
import { signOut } from "firebase/auth";
import firebaseDatabase from '../firebase';
import { getDatabase, ref, onValue } from "firebase/database";


const HomeScreen = () => {
    const navigation = useNavigation();
    const [data, setData] = useState(null);

    useEffect(() => {
        const db = getDatabase();
        const dataRef = ref(db, 'data/');

        const handleDataChange = (snapshot) => {
            const fetchedData = snapshot.val();
            setData(fetchedData);
            // console.log(fetchedData); 
        };

        const listener = onValue(dataRef, handleDataChange);

        return () => {
            // off(dataRef, 'value', listener); 
            const db = getDatabase();
            const dataRef = ref(db, 'data/');
            onValue(dataRef, null);
        };
    }, []);

    const handleSignOut = () => {
        signOut(authentication)
            .then(() => {
                navigation.replace("Login Apps");
            })
            .catch((error) => alert(error.message));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.rowContainer}>
                <Text>Selamat Datang, Admin...</Text>
                <TouchableOpacity style={styles.buttonLogout} onPress={handleSignOut}>
                    <Text style={styles.buttonTextLogout}>Log Out</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.title}>DATA</Text>

            {/* Baris 1 */}
            <View style={styles.rowContainer}>
                <View style={styles.box}>
                    {data ? (
                        <Text>{data.warna}</Text>
                    ) : (
                        <Text>Loading...</Text>
                    )}
                </View>
                <Text style={styles.title}>Data Warna</Text>
            </View>

            {/* Baris 2 */}
            <View style={styles.rowContainer}>
                <View style={styles.box}>
                    {data ? (
                        <Text>{data.oksimeter}</Text>
                    ) : (
                        <Text>Loading...</Text>
                    )}
                </View>
                <Text style={styles.title}>Oksimeter</Text>
            </View>

            {/* Baris 3 */}
            <View style={styles.rowContainer}>
                <View style={styles.box}>
                    {data ? (
                        <Text>{data.tekanan}</Text>
                    ) : (
                        <Text>Loading...</Text>
                    )}
                </View>
                <Text style={styles.title}>Tekanan</Text>
            </View>

            {/* Button */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Hasil Analisa')}>
                <Text style={styles.buttonText}>Analisa</Text>
            </TouchableOpacity>

            {/* <View>
                <Text>{data ? JSON.stringify(data) : 'Loading...'}</Text>
            </View> */}
        </ScrollView>
    );
};

const screenWidth = Dimensions.get('window').width;
export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    box: {
        width: screenWidth * 0.9,
        height: 100,
        backgroundColor: '#dedede',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    title: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },

    buttonLogout: {
        backgroundColor: '#DC3545',
        padding: 10,
        borderRadius: 5,
    },

    buttonTextLogout: {
        color: 'white',
    },

    buttonText: {
        color: '#ffffff',
    },
});