import { useNavigation } from "@react-navigation/core";
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, TextInput } from "react-native";
import React, { useState } from "react";
import { Picker } from '@react-native-picker/picker';
import { getDatabase, ref, update } from "firebase/database";
import '../firebase';
const FormScreen = () => {
    const navigation = useNavigation();
    const [fullName, setFullName] = useState('');
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');

    const handleSave = () => {
        if (fullName && height && age && gender) {
            const db = getDatabase();
            const formDataRef = ref(db, '/data');

            const formData = {
                fullName: fullName,
                height: height,
                age: age,
                gender: gender,
            };

            update(formDataRef, formData)
                .then(() => {
                    alert('Data updated successfully!');
                    setFullName('');
                    setHeight('');
                    setAge('');
                    setGender('');
                    navigation.navigate('Check Screen');
                })
                .catch(error => {
                    console.error('Failed to update data:', error);
                    alert('Failed to update data: ' + error.message);
                });
        } else {
            alert('Please fill out all fields!');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Silahkan isi data diri anda!</Text>
                
                <TextInput
                    style={styles.input}
                    placeholder="Nama Lengkap"
                    value={fullName}
                    onChangeText={setFullName}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Tinggi Badan"
                    value={height}
                    onChangeText={setHeight}
                    keyboardType="numeric"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Umur"
                    value={age}
                    onChangeText={setAge}
                    keyboardType="numeric"
                />

                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={gender}
                        style={styles.picker}
                        onValueChange={(itemValue) => setGender(itemValue)}
                    >
                        <Picker.Item label="Jenis Kelamin" value="" />
                        <Picker.Item label="Laki-laki" value="male" />
                        <Picker.Item label="Perempuan" value="female" />
                    </Picker>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>SAVE</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const screenWidth = Dimensions.get('window').width;

export default FormScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E1F5FE',
    },
    formContainer: {
        width: screenWidth * 0.9,
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        color: '#37474F',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        backgroundColor: '#CFD8DC',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginBottom: 20,
        color: '#37474F',
    },
    pickerContainer: {
        width: '100%',
        backgroundColor: '#CFD8DC',
        borderRadius: 5,
        marginBottom: 20,
    },
    picker: {
        width: '100%',
        color: '#37474F',
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});