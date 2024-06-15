import { useNavigation } from "@react-navigation/core";
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Dimensions, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { authentication } from "../firebase";
import firebaseDatabase from '../firebase';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../firebase';


const AnalResult = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                const imageRef = ref(storage, 'result/image.jpg');
                const url = await getDownloadURL(imageRef);
                setImageUrl(url);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching image URL: ", error);
                setLoading(false);
            }
        };

        fetchImageUrl();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <View style={styles.container}>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <Image source={{ uri: imageUrl }} style={styles.image} />
                )}
            </View>

        </ScrollView>
    );
};

const screenWidth = Dimensions.get('window').width;
export default AnalResult

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: 600,
        height: 600,
        resizeMode: 'contain',
    },
});