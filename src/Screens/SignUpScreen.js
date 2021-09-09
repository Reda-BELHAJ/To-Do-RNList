import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { emailValidator, passwordValidator, nameValidator } from '../Core/Utils';
import TextInput from '../Components/TextInput';
import PaperButton from '../Components/PaperButton';
import ContainerAuth from '../Components/ContainerAuth';
import Header from '../Components/Header';
import { signIn } from '../Reducer/authReducer'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { theme } from '../Core/theme';

import Firebase from '../../config/firebase';

const auth = Firebase.auth();

export default function SignUpScreen({ navigation }) {
    const [name, setName] = useState({ value: '', error: '' });
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });

    const dispatch = useDispatch()

    function writeUserData(user) {
        Firebase.database().ref('users/' + user.uid).set(user).catch(error => {
            console.log(error.message)
        });
    }

    const _onSignUpPressed = async () => {
        const nameError = nameValidator(name.value);
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);

        if (emailError || passwordError || nameError) {
            setName({ ...name, error: nameError });
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            return;
        }

        try {
            await auth.createUserWithEmailAndPassword(email.value, password.value);
            const {uid, email: emailUser, displayName } = auth.currentUser

            var user = {
                name: name.value,
                email: email.value,
                password: password.value
            }

            writeUserData(user)

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

            <Header>Create Account</Header>

            <TextInput
                label="Name"
                returnKeyType="next"
                value={name.value}
                onChangeText={text => setName({ value: text, error: '' })}
                error={!!name.error}
                errorText={name.error}
            />

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

            <PaperButton mode="outlined" onPress={_onSignUpPressed} >
                Sign Up
            </PaperButton>

            <View style={styles.row}>
                <Text style={styles.label}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.replace('SignInScreen')}>
                <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
            </View>
        </ContainerAuth>
    )
}

const styles = StyleSheet.create({
    label: {
        color: theme.colors.secondary,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
})
