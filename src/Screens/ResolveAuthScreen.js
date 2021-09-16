import React, { useEffect } from "react";
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Firebase from "../../config/firebase";
import { signIn } from '../Reducer/authReducer'

const auth = Firebase.auth();

const ResolveAuthScreen = ({ navigation }) => {
    const dispatch = useDispatch()

    const tryLocalSignIn =  async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            await Firebase.database().ref('users/' + token ).once("value").then(function(snapshot) {
                const { email, password, name } = snapshot.val()
                auth.signInWithEmailAndPassword(email, password);

                dispatch(signIn({uid: token, email, displayName: name }))

                navigation.replace('HomeTab')
            })
        } else {
            navigation.replace('SignInScreen')
        }
    }
    
    useEffect(() => {
        tryLocalSignIn()
    }, [])

    return null
}

export default ResolveAuthScreen