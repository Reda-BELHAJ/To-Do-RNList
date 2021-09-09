import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native'
import PaperButton from '../Components/PaperButton';
import Firebase from '../../config/firebase';
import { selectUser } from '../Reducer/authReducer'
import { signOut } from '../Reducer/authReducer'
import AsyncStorage from '@react-native-async-storage/async-storage';

const auth = Firebase.auth();

export default function SettingsScreen({ navigation }) {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    
    const handleSignOut = async () => {
        AsyncStorage.removeItem('token');
        
        auth.signOut().then(() => {
            dispatch(signOut)
            navigation.replace('AuthScreen')
        }).catch((error) => {
            console.log(error)
        });
    };

    return (
        <View style={styles.container}>
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