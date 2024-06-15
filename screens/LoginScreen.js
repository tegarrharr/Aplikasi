import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { authentication } from "../firebase";
import {
    signInWithEmailAndPassword,
} from "firebase/auth";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = authentication.onAuthStateChanged((user) => {
            if (user) {
                navigation.replace("Dashboard");
            }
        });

        return unsubscribe;
    }, []);


    const handleLogin = () => {
        signInWithEmailAndPassword(authentication, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log(user.email + " signed in!");
            })
            .catch((error) => alert(error.message));
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior='padding'
        >
            <View
                style={styles.inputContainer}
            >
                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                />

                <TextInput
                    placeholder='Password'
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View
                style={styles.buttonContainer}
            >

                <TouchableOpacity onPress={handleLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

            </View>

        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputContainer: {
        width: '80%',
    },

    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },

    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },

    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 8,
        borderRadius: 10,
        alignItems: 'center',
    },

    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
})