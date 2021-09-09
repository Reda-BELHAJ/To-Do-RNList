import React, { Children } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'

export default function ContainerAuth({ children }) {
    return (
        <SafeAreaView style={styles.container} behavior="padding">
            { children }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flex: 1,
        padding: 20,
        width: '100%',
        maxWidth: 340,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
