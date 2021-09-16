import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import PaperButton from '../Components/PaperButton';
import TextInput from '../Components/TextInput'
import { TextInput as Input } from 'react-native-paper';
import Firebase from '../../config/firebase';
import { selectUser } from '../Reducer/authReducer'
import { signOut } from '../Reducer/authReducer'
import AsyncStorage from '@react-native-async-storage/async-storage';

const auth = Firebase.auth();

export default function SettingsScreen({ navigation }) {
    const [ secure, setSecure ] = useState(true)
    const [ info, setInfo ] = useState('')
    const user = useSelector(selectUser)
    const dispatch = useDispatch()

    const getCred = async (token) => {
        await Firebase.database().ref('users/' + token ).once("value").then(function(snapshot) {
            setInfo(snapshot.val())
        })
    } 
    
    const handleSignOut = async () => {
        AsyncStorage.removeItem('token');
        
        auth.signOut().then(() => {
            dispatch(signOut)
            navigation.replace('AuthScreen')
        }).catch((error) => {
            console.log(error)
        });
    };

    useEffect(() => {
        getCred(user.uid)
    }, [])

    return (
        <View style={styles.container}>
            <TextInput
                disabled
                label="UID"
                returnKeyType="next"
                value={user.uid}
            />
            <TextInput
                disabled
                label="Email"
                returnKeyType="next"
                value={info.email}
            />
            <TextInput
                disabled
                label="UserName"
                returnKeyType="next"
                value={info.name}
            />
            <TextInput
                label="Password"
                disabled
                value={info.password}
                secureTextEntry={secure}
                right={<Input.Icon name="eye" onPress={() => {setSecure(!secure)}} />}
            />

            <PaperButton mode="outlined" onPress={handleSignOut} >
                Disconnect
            </PaperButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 15
    },
})