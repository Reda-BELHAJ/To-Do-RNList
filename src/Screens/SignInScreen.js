import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { emailValidator, passwordValidator } from '../Core/Utils';
import TextInput from '../Components/TextInput';
import PaperButton from '../Components/PaperButton';
import ContainerAuth from '../Components/ContainerAuth';
import Header from '../Components/Header';
import { signIn } from '../Reducer/authReducer'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { theme } from '../Core/theme';

import Firebase from '../../config/firebase';

const auth = Firebase.auth();

export default function SignInScreen({ navigation }) {
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });

    const dispatch = useDispatch()

    const _onLoginPressed = async () => {
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);

        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            return; 
        }

        try {
            await auth.signInWithEmailAndPassword(email.value, password.value);

            const {uid, email: emailUser, displayName } = auth.currentUser
            dispatch(signIn({uid, email: emailUser, displayName }))

            const token = await AsyncStorage.getItem('token');
            if (!token){
                await AsyncStorage.setItem('token', uid);
            }

            navigation.replace('HomeTab');
        } catch (error) {
            setPassword({ ...password, error: error.message });
        }
    };

    return (
        <ContainerAuth>
            <Header>Welcome Back</Header>

            <TextInput
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={text => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address" 
            />

            <TextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={text => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />

            <PaperButton mode="contained" onPress={_onLoginPressed}>
                Login
            </PaperButton>

            <View style={styles.row}>
                <Text style={styles.label}>Don’t have an account? </Text>
                <TouchableOpacity onPress={() => navigation.replace('SignUpScreen')}>
                <Text style={styles.link}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </ContainerAuth>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    label: {
        color: theme.colors.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
})