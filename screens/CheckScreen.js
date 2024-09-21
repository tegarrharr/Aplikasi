import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Modal, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, update, get } from "firebase/database";
import '../firebase';
import axios from 'axios';

const CheckScreen = () => {
    const navigation = useNavigation();
    const [showResultsButton, setShowResultsButton] = useState(false);
    const [loading, setLoading] = useState(false); // State for loading modal

    useEffect(() => {
        const checkData = async () => {
            const db = getDatabase();
            const paths = [
                'data/checkup/R',
                'data/checkup/G',
                'data/checkup/B',
                'data/checkup/bpm',
                'data/checkup/fev1',
                'data/checkup/fvc',
                // 'data/checkup/rpm',
                'data/checkup/spo2'
            ];

            try {
                // Fetch data from Firebase
                const results = await Promise.all(paths.map(path => get(ref(db, path))));

                // Check if all values are non-empty strings
                const allNonEmpty = results.every(snapshot => {
                    const value = snapshot.val();
                    return value !== null && typeof value === 'string' && value.trim() !== '';
                });

                // Enable button if all data entries are non-empty
                setShowResultsButton(allNonEmpty);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        // Call checkData initially
        checkData();

        // Set interval to call checkData every 2 seconds
        const intervalId = setInterval(checkData, 2000);

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    const updateWarnaKuku = async (option) => {
        const db = getDatabase();
        const reference = ref(db, 'data/');
    
        try {
            // Show loading modal
            setLoading(true);
    
            // Update state_warnakuku
            await update(reference, { state_warnakuku: 1 });
            console.log('Start for', option);
    
            // Add a 3-second delay before showing the success message
            setTimeout(async () => {
                setLoading(false); // Hide loading modal
    
                const checkupRRef = ref(db, 'data/checkup/R');
                const checkupGRef = ref(db, 'data/checkup/G');
                const checkupBRef = ref(db, 'data/checkup/B');
    
                const checkupRSnapshot = await get(checkupRRef);
                const checkupGSnapshot = await get(checkupGRef);
                const checkupBSnapshot = await get(checkupBRef);
    
                const checkupR = checkupRSnapshot.exists() ? checkupRSnapshot.val() : "No data";
                const checkupG = checkupGSnapshot.exists() ? checkupGSnapshot.val() : "No data";
                const checkupB = checkupBSnapshot.exists() ? checkupBSnapshot.val() : "No data";
    
                const message = `State start for ${option}\nR: ${checkupR}\nG: ${checkupG}\nB: ${checkupB}`;
                Alert.alert('Success', `State start for ${option}\nR: ${checkupR}\nG: ${checkupG}\nB: ${checkupB}`);
                console.log(message);
    
            }, 3000); // 3000ms = 3 seconds
    
        } catch (error) {
            console.error('Error start state: ', error);
            setLoading(false); // Hide loading modal in case of error
            Alert.alert('Error', `Failed to update state for ${option}`);
        }
    };

    const updateDenyutNadi = async (option) => {
        const db = getDatabase();
        const reference = ref(db, 'data/');

        try {
            setLoading(true);

            // Update state_denyutnadi
            await update(reference, { state_denyutnadi: 1 });
            console.log('Start for', option);

            // Add a 3-second delay before showing the success message
            setTimeout(async () => {
                setLoading(false); // Hide loading modal
                const checkupRRef = ref(db, 'data/checkup/bpm');
                const checkupGRef = ref(db, 'data/checkup/spo2');
    
                const checkupRSnapshot = await get(checkupRRef);
                const checkupGSnapshot = await get(checkupGRef);
    
                const checkupR = checkupRSnapshot.exists() ? checkupRSnapshot.val() : "No data";
                const checkupG = checkupGSnapshot.exists() ? checkupGSnapshot.val() : "No data";
    
                const message = `State start for ${option}\nBPM: ${checkupR}\nSPO2: ${checkupG}`;
                Alert.alert('Success', `State start for ${option}\nBPM: ${checkupR}\nSPO2: ${checkupG}`);
                console.log(message);
            }, 3000); // 3000ms = 3 seconds
        } catch (error) {
            console.error('Error start state: ', error);
            setLoading(false);
            Alert.alert('Error', `Failed to update state for ${option}`);
        }
    };

    const updateRVC = async (option) => {
        const db = getDatabase();
        const reference = ref(db, 'data/');

        try {
            setLoading(true);

            // Update state rvc
            await update(reference, { state_rvc: 1 });
            console.log('Start for', option);
            
            // Add a 3-second delay before showing the success message
            setTimeout(async () => {
                setLoading(false); // Hide loading modal
                const checkupRRef = ref(db, 'data/checkup/fvc');
                const checkupGRef = ref(db, 'data/checkup/fev1');
    
                const checkupRSnapshot = await get(checkupRRef);
                const checkupGSnapshot = await get(checkupGRef);
    
                const checkupR = checkupRSnapshot.exists() ? checkupRSnapshot.val() : "No data";
                const checkupG = checkupGSnapshot.exists() ? checkupGSnapshot.val() : "No data";
    
                const message = `State start for ${option}\nFVC: ${checkupR}\nFEV1: ${checkupG}`;
                Alert.alert('Success', `State start for ${option}\nFVC: ${checkupR}\nFEV1: ${checkupG}`);
                console.log(message);
            }, 3000); // 3000ms = 3 seconds
        } catch (error) {
            console.error('Error start state: ', error);
            setLoading(false);
            Alert.alert('Error', `Failed to update state for ${option}`);
        }
    };

    const showResults = async () => {
        try {
            setLoading(true);

            // Send POST request without parameters
            const response = await axios.post('http://192.168.18.103:3000/predict');

            setLoading(false);

            if (response.status === 200) {
                navigation.navigate('Result Screen');
            } else {
                Alert.alert('Prediction Error', 'Prediksi gagal. Status respons: ' + response.status);
            }
        } catch (error) {
            setLoading(false);
            console.error('Error sending prediction request:', error);
            Alert.alert('Prediction Error', 'Terjadi kesalahan saat mengirim permintaan prediksi.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.menuIcon} />
                <Text style={styles.headerText}>YOUR MENU</Text>
            </View>
            <Text style={styles.subtitle}>Pilih menu untuk melakukan pemeriksaan</Text>
            <TouchableOpacity style={styles.option} onPress={() => updateWarnaKuku('Warna Kuku')}>
                <Image source={require('../assets/fingernail.png')} style={styles.icon} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Warna Kuku</Text>
                    <Text style={styles.description}>
                        Masukkan jarimu pada lubang, lalu tempelkan kukumu pada sensor warna
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => updateDenyutNadi('Saturasi Oksigen Denyut Nadi')}>
                <Image source={require('../assets/heart-attack.png')} style={styles.icon} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Saturasi Oksigen & Denyut Nadi</Text>
                    <Text style={styles.description}>
                        Masukkan jarimu pada lubang, lalu tempelkan jarimu pada sensor oximeter
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => updateRVC('Respirasi Vital Capacity')}>
                <Image source={require('../assets/respiratory.png')} style={styles.icon} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Respirasi & Vital Capacity</Text>
                    <Text style={styles.description}>
                        Gunakan selang di samping alat, tempelkan pada mulut dan tutup hidungmu menggunakan penjepit
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.resultButton, { opacity: showResultsButton ? 1 : 0.5 }]}
                onPress={showResults}
                disabled={!showResultsButton}
            >
                <Text style={styles.resultButtonText}>Hasil Checkup</Text>
            </TouchableOpacity>

            {/* Loading Modal */}
            <Modal
                transparent={true}
                animationType={'none'}
                visible={loading}
                onRequestClose={() => { }}>
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                        <ActivityIndicator animating={loading} size="large" color="#0000ff" />
                        <Text>Loading...</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e0f4f1',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4CAF50',
        padding: 8,
        borderRadius: 8,
        marginBottom: 16,
    },
    menuIcon: {
        width: 24,
        height: 24,
        backgroundColor: '#000',
        borderRadius: 12,
        marginRight: 8,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    subtitle: {
        fontSize: 16,
        color: '#00796b',
        marginBottom: 24,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    icon: {
        width: 50,
        height: 50,
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00796b',
    },
    description: {
        fontSize: 14,
        color: '#00796b',
    },
    resultButton: {
        backgroundColor: '#00796b',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    resultButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    activityIndicatorWrapper: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CheckScreen;