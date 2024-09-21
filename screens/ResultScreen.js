import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button } from 'react-native';
import { getDatabase, ref, get, set } from "firebase/database";
import '../firebase';
import { useNavigation } from '@react-navigation/native';

const ResultScreen = () => {
    const [data, setData] = useState({
        R: 120,
        G: 130,
        B: 140,
        bpm: 80,
        spo2: 95,
        rpm: 20,
        fvc: 3200,
        healthStatus: 'Loading...',
        prediksi_fvc: 'N/A',
    });

    const navigation = useNavigation();

    const checkRGBStatus = (R, G, B) => {
        const isPink = (R >= 23 && R <= 61) && (G >= 14 && G <= 56) && (B >= 8 && B <= 40);
        const isBlue = (B > R && B > G);
        const isYellow = (R > B && G > B);

        if (isPink) return 'Normal';
        if (isBlue) return 'Tidak Normal';
        if (isYellow) return 'Tidak Normal';
        return 'Unknown';
    };

    const checkNormal = (value, type) => {
        switch(type) {
            case 'bpm':
                return (value >= 60 && value <= 100) ? 'Normal' : 'Tidak Normal';
            case 'spo2':
                return (value >= 95 && value <= 100) ? 'Normal' : 'Tidak Normal';
            case 'prediksi_fvc':
                return (value >= 75) ? 'Normal' : 'Tidak Normal';
            default:
                return 'Unknown';
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = getDatabase();
                const checkupSnapshot = await get(ref(db, '/data/checkup'));
                const healthStatusSnapshot = await get(ref(db, '/data/hasil_checkup'));

                if (checkupSnapshot.exists() && healthStatusSnapshot.exists()) {
                    const checkupValues = checkupSnapshot.val();
                    const healthStatusValue = healthStatusSnapshot.val();

                    setData({
                        R: checkupValues.R,
                        G: checkupValues.G,
                        B: checkupValues.B,
                        bpm: checkupValues.bpm,
                        spo2: checkupValues.spo2,
                        fvc: checkupValues.fvc,
                        fev1: checkupValues.fev1,
                        healthStatus: healthStatusValue.status,
                        prediksi_fvc: healthStatusValue.prediksi_fvc,
                    });
                } else {
                    console.log('No data available');
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    const handleReset = async () => {
        try {
            const db = getDatabase();
            const healthStatusRef = ref(db, '/data/checkup/');

            // Clear the data by setting an empty object
            await set(healthStatusRef, {
                R: '',
                G: '',
                B: '',
                bpm: '',
                spo2: '',
                fvc: '',
                fev1: ''
            });

            // Navigate to the Dashboard screen
            navigation.navigate('Dashboard');
        } catch (error) {
            console.error('Error resetting data: ', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/list.png')} style={styles.headerIcon} />
                <Text style={styles.headerText}>YOUR CONDITION</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.rgbContainer}>
                    <Text style={styles.sectionTitle}>Nilai RGB Kuku</Text>
                    <Image source={require('../assets/fingernail.png')} style={styles.icon} />
                    <Text style={styles.rgbText}>R = {data.R}, G = {data.G}, B = {data.B}</Text>
                    <Text style={styles.rgbStatus}>{checkRGBStatus(data.R, data.G, data.B)}</Text>
                    <View style={styles.separator} />
                </View>
                <View style={styles.metricsContainer}>
                    <View style={styles.metric}>
                        <Text style={styles.metricSubLabel}>Frekuensi Denyut Nadi</Text>
                        <Text style={styles.metricValue}>{data.bpm} Bpm</Text>                        
                        <Text style={styles.rgbStatus}>{checkNormal(data.bpm, 'bpm')}</Text>
                        <View style={styles.separator} />
                        <Image source={require('../assets/heart-attack.png')} style={styles.icon} />
                        <Text style={styles.metricSubLabel}>Saturasi Oksigen</Text>
                        <Text style={styles.metricSubValue}>{data.spo2}%</Text>
                        <Text style={styles.rgbStatus}>{checkNormal(data.spo2, 'spo2')}</Text>
                        <View style={styles.separator} />
                    </View>
                    <View style={styles.metric}>
                        {/* <Text style={styles.metricValue}>{data.rpm} RpM</Text> */}
                        <Text style={styles.metricValue}>FVC : {data.fvc}</Text>
                        <Text style={styles.metricValue}>FEV1 :  {data.fev1}</Text>
                        <Image source={require('../assets/respiratory.png')} style={styles.icon} />
                        {/* <Text style={styles.rgbStatus}>{checkNormal(data.rpm, 'rpm')}</Text> */}
                        <Text style={styles.metricSubLabel}>Rasio       FEV1/FVC</Text>
                        <Text style={styles.metricSubValue}>{data.prediksi_fvc}%</Text>
                        <Text style={styles.rgbStatus}>{checkNormal(data.prediksi_fvc, 'prediksi_fvc')}</Text>
                        <View style={styles.separator} />
                    </View>
                </View>
                <Text style={styles.congratsText}>Status :</Text>
                <Text style={styles.healthStatus}>{data.healthStatus}</Text>
                <Text style={styles.footerText}>Jagalah kesehatan paru-paru sebelum terlambat!</Text>
                <View style={styles.buttonContainer}>
                    <Button title="KEMBALI/RESET DATA" onPress={handleReset} color="red" />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#e0f7fa',
    },
    header: {
        backgroundColor: '#d1e4e9',
        padding: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    headerIcon: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    rgbContainer: {
        alignItems: 'center',
        marginBottom: 30,
        padding: 20,
        backgroundColor: '#c1e8e3',
        borderRadius: 10,
        width: '90%',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    icon: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    rgbText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    rgbStatus: {
        fontSize: 16,
        color: '#4caf50',
        marginTop: 10,
    },
    metricsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
        marginBottom: 30,
    },
    metric: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#c1e8e3',
        borderRadius: 10,
        width: '45%',
    },
    metricValue: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    metricLabel: {
        fontSize: 16,
        marginBottom: 5,
        textAlign: 'center',
    },
    separator: {
        height: 2,
        backgroundColor: '#4caf50',
        width: '80%',
        marginVertical: 10,
    },
    metricSubLabel: {
        fontSize: 14,
        color: '#000000',
        marginBottom: 5,
        textAlign: 'center',
    },
    metricSubValue: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    congratsText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    healthStatus: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4caf50',
        marginBottom: 20,
        textAlign: 'center',
    },
    footerText: {
        fontSize: 14,
        color: '#9e9e9e',
        textAlign: 'center',
    },
    buttonContainer: {
        marginTop: 20,
        marginBottom: 20,
        width: '80%',
        borderRadius: 5,
        overflow: 'hidden',
    },
});

export default ResultScreen;